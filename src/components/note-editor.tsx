"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Tldraw, type Editor, AssetRecordType, Box} from "tldraw"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Save, Download, Tag, Link, X, ExternalLink, ArrowLeft, Bot, PanelRight } from "lucide-react"
import { jsPDF } from "jspdf"
import "tldraw/tldraw.css"
import { Card } from "./ui/card"
import { useRouter } from "next/navigation"
import convertLatexToSVG from "@/lib/htmlToPNG"
import { removeSvgDimensions, SvgShapeUtils } from "@/lib/SvgShape"

interface NoteEditorProps {
  noteId: string
  initialTitle: string
  initialContent: any
  initialTags: string[]
  initialLinks: any[]
}

interface LinkedNote {
  _id: string
  title: string
}

export default function NoteEditor({
  noteId,
  initialTitle,
  initialContent,
  initialTags,
  initialLinks,
}: NoteEditorProps) {
  const [title, setTitle] = useState(initialTitle)
  const [tags, setTags] = useState<string[]>(initialTags)
  const [linkedNotes, setLinkedNotes] = useState<LinkedNote[]>(initialLinks)
  const [newTag, setNewTag] = useState("")
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false)
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false)
  const [linkTitle, setLinkTitle] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [wikiLinkInput, setWikiLinkInput] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [availableNotes, setAvailableNotes] = useState<LinkedNote[]>([])
  const [isProcessingWikiLink, setIsProcessingWikiLink] = useState(false)
  const [katexContent, setKatexContent] = useState("")
  const customShape = [SvgShapeUtils]
  const editorRef = useRef<Editor | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchAvailableNotes = async () => {
      try {
        const response = await fetch("/api/notes")

        if (response.ok) {
          const data = await response.json()
          const notes = data.data
          setAvailableNotes(notes.filter((note: any) => {
            if(note._id !== noteId) return note;
          }))
        }
      } catch (error) {
        console.error("Failed to fetch available notes:", error)
      }
    }
    
    fetchAvailableNotes()
  }, [noteId])

  const handleSave = useCallback(async () => {
    if (!editorRef.current) return

    setIsSaving(true)
    try {
      const snapshot = editorRef.current.store.getSnapshot()

      const response = await fetch(`/api/notes/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content: snapshot,
          tags,
          links: linkedNotes.map((link) => link._id),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save note")
      }

      toast("Note saved", {
        description: "Your note has been saved successfully.",
      })
    } catch (error) {
      toast("Error", {
        description: "Failed to save note. Please try again."
      })
    } finally {
      setIsSaving(false)
    }
  }, [noteId, title, tags, linkedNotes, toast])

  const handleExport = useCallback(async () => {
    if (!editorRef.current) return
    setIsExporting(true)
    try {

      const shapes = editorRef.current!.getCurrentPageShapes()
      if(!shapes) toast("Nothing to export!");

      const bounds = editorRef.current!.getCurrentPageBounds()
      if(!bounds) toast("Nothing to export!");

      const A4_WIDTH = 210 //mm
      const A4_HEIGHT = 297 //mm
      const PADDING = 10 //mm

      const unitsPerScale = 72 / 25.4 // 1 inch = 25.4 mm, 1 inch = 72 points
      const tileWidth = (A4_WIDTH - 2 * PADDING) * unitsPerScale
      const tileHeight = (A4_HEIGHT - 2 * PADDING) * unitsPerScale

      const cols = Math.ceil(bounds?.width! / tileWidth)
      const rows = Math.ceil(bounds?.height! / tileHeight)

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" })

      const blobToBae64 = async (blob: Blob) => {
        return new Promise<string>(resolve => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(blob)
        })
      }

      for(let row = 0; row < rows; row++) {
        for(let col = 0; col < cols; col++) {
          const x = bounds?.minX! + col * tileWidth
          const y = bounds?.minY! + row * tileHeight
          const w = Math.min(tileWidth, bounds?.maxX! - x)
          const h = Math.min(tileHeight, bounds?.maxY! - y)

          const { blob } = await editorRef.current!.toImage([...shapes.map(s => s.id)], {
            format: "png",
            scale: 2,
            quality: 1,
            background: true,
            bounds: new Box(x, y, w, h),
          })

          const imgData = await blobToBae64(blob)
          if(!(row === 0 && col === 0)) pdf.addPage();
          pdf.addImage(imgData, 'PNG', PADDING, PADDING, w / unitsPerScale, h / unitsPerScale)
        }
      }

      pdf.save(`${title || "untitled"}.pdf`)
      toast("Note exported", {
        description: "Your note has been exported as a PDF.",
      })

    } catch (error) {
      toast("Error exporting note", {
        description: "An error occurred while exporting the note. Please try again.",
      })
    } finally {
      setIsExporting(false)
    }
  }, [title, toast])

  const handleAddTag = useCallback(() => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }, [newTag, tags])

  const handleRemoveTag = useCallback(
    (tagToRemove: string) => {
      setTags(tags.filter((tag) => tag !== tagToRemove))
    },
    [tags],
  )

  const handleCreateLink = useCallback(async () => {
    if (!linkTitle.trim()) return

    try {
      // Create a new note with the link title
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: linkTitle.trim(),
          content: {},
          tags: [],
          links: [],
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create linked note")
      }

      const note = await response.json()
      const newNote = note.data

      // Add the new note to current note's links
      const updatedLinks = [...linkedNotes, { _id: newNote._id, title: newNote.title }]
      setLinkedNotes(updatedLinks)

      toast("Link created", {
        description: `Created and linked to "${linkTitle}"`,
      })

      setLinkTitle("")
      setIsLinkDialogOpen(false)
    } catch (error) {
      toast("Error", {
        description: "Failed to create link. Please try again.",
      })
    }
  }, [linkTitle, linkedNotes, toast])

  const handleProcessWikiLink = useCallback(async () => {
    if (!wikiLinkInput.trim()) return

    setIsProcessingWikiLink(true)
    try {
      const linkText = wikiLinkInput.trim()

      // Check if note already exists
      const existingNote = availableNotes.find((note) => note.title.toLowerCase() === linkText.toLowerCase())

      if (existingNote) {
        // Link to existing note
        if (!linkedNotes.find((link) => link._id === existingNote._id)) {
          const updatedLinks = [...linkedNotes, existingNote]
          setLinkedNotes(updatedLinks)

          toast("Note linked", {
            description: `Linked to existing note "${existingNote.title}"`,
          })
        } else {
          toast("Already linked", {
            description: `Note "${existingNote.title}" is already linked`,
          })
        }
      } else {
        // Create new note and link it
        const response = await fetch("/api/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: linkText,
            content: {},
            tags: [],
            links: [],
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to create new note")
        }

        const note = await response.json()
        const newNote = note.data
        const updatedLinks = [...linkedNotes, { _id: newNote._id, title: newNote.title }]
        setLinkedNotes(updatedLinks)

        // Update available notes list
        setAvailableNotes([...availableNotes, { _id: newNote._id, title: newNote.title }])

        toast("Note created and linked", {
          description: `Created new note "${linkText}" and linked it`,
        })
      }

      setWikiLinkInput("")
    } catch (error) {
      toast("Error", {
        description: "Failed to process wiki link. Please try again."
      })
    } finally {
      setIsProcessingWikiLink(false)
    }
  }, [wikiLinkInput, availableNotes, linkedNotes, toast])

  const handleRemoveLink = useCallback(
    (linkToRemove: LinkedNote) => {
      setLinkedNotes(linkedNotes.filter((link) => link._id !== linkToRemove._id))
      toast("Link removed", {
        description: `Removed link to "${linkToRemove.title}"`,
      })
    },
    [linkedNotes, toast],
  )

  const handleOpenLinkedNote = useCallback((noteId: string) => {
    window.open(`/notes/${noteId}`, "_blank")
  }, [])

  const insertLatex = () => {
    if(!katexContent) return;
    const {svgString} = convertLatexToSVG(katexContent);
    console.log(svgString)
    if (editorRef.current) {
      editorRef.current.createShape({
        type: 'svg',
        x: 100,
        y: 200,
        props: {
          src: removeSvgDimensions(svgString),
        }
      })
    }
    setKatexContent("")
    toast("LaTeX inserted", {
      description: "Your LaTeX content has been inserted as an image.",
    })
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="h-15 border-b border-border backdrop-blur-sm flex items-center justify-between px-4 z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="p-2" onClick={() => router.push('/graph')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="font-bold text-lg">Scriblio</div>
            <div className="h-4 w-px bg-border" />
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-none bg-transparent text-base font-medium focus-visible:ring-0 focus-visible:ring-offset-0 min-w-[200px] shadow-sm font-serif"
              placeholder="Untitled Note"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={handleSave} disabled={isSaving} size="sm">
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save"}
          </Button>

          <Button onClick={handleExport} disabled={isExporting} variant="outline" size="sm" >
            <Download className="h-4 w-4 mr-2" />
            {isExporting ? "Exporting..." : "Export"}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2"
          >
            <PanelRight className="h-4 w-4" />
          </Button>  
        </div>      
      </header>
      <div className="flex flex-1 overflow-hidden">
        <main className={`flex-1 relative transition-all duration-300 ${sidebarOpen ? "mr-80" : "mr-0"} z-0`}>
          <Tldraw
          shapeUtils={customShape}
            snapshot={initialContent}
            onMount={(editor) => {
              editorRef.current = editor
            }}
          />
        </main>
        
        {/* SideBar */}
        <aside
          className={`fixed right-0 top-15 h-[calc(100vh-60px)] w-80 border-l border-sidebar-border transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "translate-x-full"} z-20`}
        >
          <div className="p-4 space-y-6">
            <Card className="p-4 space-y-4 shadow-lg">
              <h3 className="font-semibold">Note Details</h3>

              {/* Tags */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                    className="flex-1"
                  />
                  <Button size="sm" onClick={handleAddTag}>
                    Add
                  </Button>
                </div>
              </div>

              {/* Link */}
              <div className="space-y-2">
                <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="default" size="sm">
                      <Link className="h-4 w-4 mr-2" />
                      Link
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Link Notes</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label htmlFor="wiki-link">Wiki-style Link [[note-title]]</Label>
                        <div className="flex gap-2">
                          <Input
                            id="wiki-link"
                            value={wikiLinkInput}
                            onChange={(e) => setWikiLinkInput(e.target.value)}
                            placeholder="Enter note title..."
                            onKeyPress={(e) => e.key === "Enter" && handleProcessWikiLink()}
                          />
                          <Button onClick={handleProcessWikiLink} disabled={isProcessingWikiLink} size="sm">
                            {isProcessingWikiLink ? "..." : "Link"}
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          If the note exists, it will be linked. If not, a new note will be created.
                        </p>
                      </div>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">Or</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="link-title">Create New Note</Label>
                        <div className="flex gap-2">
                          <Input
                            id="link-title"
                            value={linkTitle}
                            onChange={(e) => setLinkTitle(e.target.value)}
                            placeholder="Enter new note title..."
                            onKeyPress={(e) => e.key === "Enter" && handleCreateLink()}
                          />
                          <Button onClick={handleCreateLink} size="sm">
                            Create
                          </Button>
                        </div>
                      </div>

                      {linkedNotes.length > 0 && (
                        <div className="space-y-3">
                          <Label>Current Links ({linkedNotes.length})</Label>
                          <div className="max-h-32 overflow-y-auto space-y-1">
                            {linkedNotes.map((link) => (
                              <div key={link._id} className="flex items-center justify-between p-2 bg-muted rounded-sm">
                                <span className="text-sm truncate flex-1">{link.title}</span>
                                <div className="flex gap-1">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleOpenLinkedNote(link._id)}
                                    className="h-6 w-6 p-0"
                                  >
                                    <ExternalLink className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleRemoveLink(link)}
                                    className="h-6 w-6 p-0"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>

            {/* AI Features (future) */}
            <Card className="p-4 space-y-3 shadow-lg">
              <h3 className="font-semibold flex items-center gap-2">
                <Bot className="h-4 w-4" />
                AI Assist
              </h3>
              <div className="space-y-2">
                <Button variant="default" size="sm" className="w-full justify-start" disabled>
                  Summarize Notes
                </Button>
                <Button variant="default" size="sm" className="w-full justify-start" disabled>
                  Convert to Clean Text
                </Button>
                <Button variant="default" size="sm" className="w-full justify-start" disabled>
                  Generate Ideas
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">AI features coming soon</p>
            </Card>
            
            {/* LaTeX Conversion */}
            <Card className="p-4 space-y-3">
              <h1 className="font-bold mb-2">
                <textarea name="latex" id="latex"
                  value={katexContent}
                  onChange={(e) => setKatexContent(e.target.value)}
                  placeholder="Enter LaTeX here..."
                  className="w-full h-24 p-2 border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="my-3 border rounded-md p-2 overflow-auto min-h-[60px]">
                  <Button
                    onClick={insertLatex}
                    className="mt-auto py-2 rounded-md"
                  >
                    Insert Into Board
                  </Button>
                </div>
              </h1>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  )
}
