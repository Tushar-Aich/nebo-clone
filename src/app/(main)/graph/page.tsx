import GraphClient from "@/components/graph-client"

export default function GraphPage() {
  return (
    <div className="h-screen bg-background">
      <div className="h-full flex flex-col">
        <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-foreground">Knowledge Graph</h1>
                <p className="text-sm text-muted-foreground">Explore connections between your notes</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <GraphClient />
        </div>
      </div>
    </div>
  )
}
