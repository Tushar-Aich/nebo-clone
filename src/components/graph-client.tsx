"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, RefreshCw, ZoomIn, ZoomOut, Maximize2 } from "lucide-react"

// Dynamically import ForceGraph2D to avoid SSR issues
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  ),
})

interface GraphNode {
  id: string
  name: string
  tags: string[]
  val?: number // Node size
  color?: string
}

interface GraphLink {
  source: string
  target: string
}

interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
}

export default function GraphClient() {
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null)
  const [dimensions, setDimensions] = useState({ width: 1200, height: 600 })
  const router = useRouter()
  const fgRef = useRef<any>(null)

  // Update dimensions on window resize
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Helper: extract a string id from various shapes
  const toStrId = (v: any): string | undefined => {
    if (v == null) return undefined
    if (typeof v === "string" || typeof v === "number") return String(v)
    if (typeof v === "object") {
      if ("id" in v && v.id != null) return String(v.id)
      if ("_id" in v && (v as any)._id != null) return String((v as any)._id)
      // Some APIs wrap ObjectId under $oid
      if ("$oid" in v && (v as any)["$oid"]) return String((v as any)["$oid"])
    }
    return undefined
  }

  // Helper: get source/target from various link shapes
  const getLinkEndpoints = (l: any): { source?: string; target?: string } => {
    if (!l) return {}
    const source =
      toStrId(l.source) ??
      toStrId(l.sourceId) ??
      toStrId(l.from) ??
      toStrId(l.a) ??
      toStrId(l.start) ??
      toStrId(l.src) ??
      toStrId(l.origin)
    const target =
      toStrId(l.target) ??
      toStrId(l.targetId) ??
      toStrId(l.to) ??
      toStrId(l.b) ??
      toStrId(l.end) ??
      toStrId(l.dst) ??
      toStrId(l.dest)
    return { source, target }
  }

  // Fetch graph data
  const fetchGraphData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/graph")
      if (!response.ok) {
        throw new Error("Failed to fetch graph data")
      }

      const data = await response.json()
      const rawNodes: any[] = Array.isArray(data?.data?.nodes) ? data.data.nodes : []
      const rawLinks: any[] = Array.isArray(data?.data?.links) ? data.data.links : []

      // Normalize nodes: ensure id, name, tags
      const nodeMap = new Map<string, GraphNode>()
      // Also collect edges from node-level links like node.links / neighbors / connections
      const derivedEdges = new Set<string>() // key: `${minId}::${maxId}` to dedupe undirected edges

      for (const n of rawNodes) {
        const id = toStrId(n?.id) ?? toStrId(n?._id)
        if (!id) continue

        const name = String(n?.name ?? n?.title ?? "Untitled")
        const tags = Array.isArray(n?.tags) ? n.tags.filter((t: any) => typeof t === "string") : []
        nodeMap.set(id, { id, name, tags })

        // Derive links from node-level arrays if present
        const neighborLists = [n?.links, n?.neighbors, n?.connections].filter(Array.isArray)
        for (const list of neighborLists as any[][]) {
          for (const item of list) {
            const neighborId = toStrId(item) ?? toStrId(item?._id) ?? toStrId(item?.id)
            if (!neighborId) continue
            const a = id
            const b = neighborId
            // canonical undirected key
            const key = a < b ? `${a}::${b}` : `${b}::${a}`
            derivedEdges.add(key)
          }
        }
      }

      const normalizedNodes = Array.from(nodeMap.values())
      const idSet = new Set(normalizedNodes.map((n) => n.id))

      // Normalize links from API
      const apiLinks: GraphLink[] = rawLinks
        .map((l) => {
          const { source, target } = getLinkEndpoints(l)
          return { source: source as string, target: target as string }
        })
        .filter((l) => !!l.source && !!l.target)

      // Merge with derived edges
      for (const link of apiLinks) {
        const a = link.source
        const b = link.target
        const key = a < b ? `${a}::${b}` : `${b}::${a}`
        derivedEdges.add(key)
      }

      // Build final links, only keeping those that point to existing nodes
      const normalizedLinks: GraphLink[] = Array.from(derivedEdges)
        .map((key) => {
          const [a, b] = key.split("::")
          return { source: a, target: b }
        })
        .filter((l) => idSet.has(l.source) && idSet.has(l.target))

      // Add visual props to nodes
      const processedNodes = normalizedNodes.map((node) => ({
        ...node,
        val: Math.max(3, node.tags.length * 2),
        color: getNodeColor(node.tags.length),
      }))

      setGraphData({
        nodes: processedNodes,
        links: normalizedLinks,
      })

      // Optional: quick visibility check
      // console.info(`Graph loaded: ${processedNodes.length} nodes, ${normalizedLinks.length} links`)
    } catch (err) {
      setError("Failed to load graph data. Please try again.")
      console.error("Error fetching graph data:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchGraphData()
  }, [fetchGraphData])

  useEffect(() => {
    if(fgRef.current) {
      fgRef.current.d3Force("link").distance(120)
      fgRef.current.d3ReheatSimulation()
    }
  })

  // Get node color based on tag count
  const getNodeColor = (tagCount: number): string => {
    if (tagCount === 0) return "#64748b" // slate-500
    if (tagCount <= 2) return "#3b82f6" // blue-500
    if (tagCount <= 4) return "#10b981" // emerald-500
    return "#f59e0b" // amber-500
  }

  // Handle node click
  const handleNodeClick = useCallback(
    (node: any) => {
      setSelectedNode(node)
      router.push(`/notes/${node.id}`)
    },
    [router],
  )

  // Handle node hover
  const handleNodeHover = useCallback((node: any) => {
    setSelectedNode(node)
  }, [])

  // Graph controls
  const zoomIn = () => fgRef.current?.zoom(fgRef.current.zoom() * 1.5, 400)
  const zoomOut = () => fgRef.current?.zoom(fgRef.current.zoom() / 1.5, 400)
  const centerGraph = () => fgRef.current?.zoomToFit(400)

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={fetchGraphData} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Loading knowledge graph...</p>
        </div>
      </div>
    )
  }

  if (graphData.nodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-muted-foreground mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="h-full w-full">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No notes to visualize</h3>
              <p className="text-muted-foreground mb-4">
                Create some notes and link them together to see your knowledge graph.
              </p>
              <Button onClick={() => router.push("/notes")}>Create Your First Note</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="relative h-screen">
      {/* Graph Container */}
      <div id="graph-container" className="h-full w-full">
        <ForceGraph2D
          ref={fgRef}
          graphData={graphData}
          width={dimensions.width}
          height={dimensions.height}
          nodeLabel={(node: any) => `
            <div style="
              background: rgba(0, 0, 0, 0.8);
              color: white;
              padding: 8px 12px;
              border-radius: 6px;
              font-size: 12px;
              max-width: 200px;
              word-wrap: break-word;
            ">
              <strong>${node.name}</strong>
              ${node.tags.length > 0 ? `<br><small>Tags: ${node.tags.join(", ")}</small>` : ""}
            </div>
          `}
          nodeColor={(node: any) => node.color}
          nodeVal={(node: any) => node.val}
          linkColor={() => "#64748b"}
          linkWidth={2}
          linkDirectionalArrowLength={10}
          linkDirectionalArrowRelPos={1}
          linkDirectionalParticles={2}
          linkDirectionalParticleWidth={5}
          linkDirectionalParticleSpeed={0.003}
          onNodeClick={handleNodeClick}
          onNodeHover={handleNodeHover}
          onBackgroundClick={() => setSelectedNode(null)}
          cooldownTicks={100}
          d3AlphaDecay={0.02}
          d3VelocityDecay={0.3}
        />
      </div>

      {/* Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button size="sm" variant="outline" onClick={zoomIn}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={zoomOut}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={centerGraph}>
          <Maximize2 className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={fetchGraphData}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Node Info Panel */}
      {selectedNode && (
        <div className="absolute bottom-4 left-4 max-w-sm">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground mb-2">{selectedNode.name}</h3>
              {selectedNode.tags.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Tags:</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedNode.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              <Button size="sm" className="w-full mt-3" onClick={() => router.push(`/notes/${selectedNode.id}`)}>
                Open Note
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Graph Stats */}
      <div className="absolute top-4 left-4">
        <Card>
          <CardContent className="p-3">
            <div className="text-sm space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-500"></div>
                <span className="text-muted-foreground">No tags</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-muted-foreground">1-2 tags</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-muted-foreground">3-4 tags</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-muted-foreground">5+ tags</span>
              </div>
              <div className="pt-2 border-t border-border text-xs text-muted-foreground">
                {graphData.nodes.length} notes • {graphData.links.length} connections
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
