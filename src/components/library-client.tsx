"use client"

import { useState, useEffect, useMemo, MouseEvent } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Plus, Calendar, Tag, Trash, Loader2 } from "lucide-react"
import { useDebounce } from "@/hooks/use-debounce"
import { formatDistanceToNow } from "date-fns"
import { toast } from "sonner"

interface Note {
  _id: string
  title: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export default function LibraryClient() {
  const [notes, setNotes] = useState<Note[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Debounce search term with 500ms delay
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  // Fetch notes based on search term
  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const url = debouncedSearchTerm ? `/api/notes?search=${encodeURIComponent(debouncedSearchTerm)}` : "/api/notes"

        const response = await fetch(url)

        if (!response.ok) {
          throw new Error("Failed to fetch notes")
        }

        const data = await response.json()
        console.log(data.data)
        setNotes(data.data)
      } catch (err) {
        setError("Failed to load notes. Please try again.")
        console.error("Error fetching notes:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotes()
  }, [debouncedSearchTerm])

  const handleNoteClick = (noteId: string) => {
    router.push(`/notes/${noteId}`)
  }

  const handleCreateNote = () => {
    router.push("/notes")
  }

  // Group notes by date for better organization
  const groupedNotes = useMemo(() => {
    const groups: { [key: string]: Note[] } = {}

    notes.forEach((note) => {
      const date = new Date(note.updatedAt)
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)

      let groupKey: string

      if (date.toDateString() === today.toDateString()) {
        groupKey = "Today"
      } else if (date.toDateString() === yesterday.toDateString()) {
        groupKey = "Yesterday"
      } else {
        groupKey = date.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      }

      if (!groups[groupKey]) {
        groups[groupKey] = []
      }
      groups[groupKey].push(note)
    })

    return groups
  }, [notes])

  const handleDelete = async (noteId:string, event:MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
      })
      if(!response.ok) throw new Error("Error deleting note!");

      const data = await response.json()

      setNotes(notes.filter((note) => {
        return note._id !== data.data._id
      }))

      toast("Note deleted", {
        description: "Your note has been deleted successfully.",
      })
    } catch (error) {
      toast("Error", {
        description: "Failed to delete note. Please try again.",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground">{error}</p>
              <Button onClick={() => window.location.reload()} variant="outline" className="mt-4">
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search and Create Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search notes by title or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={handleCreateNote} className="shrink-0">
          <Plus className="h-4 w-4 mr-2" />
          New Note
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <div className="h-5 bg-muted rounded w-12"></div>
                  <div className="h-5 bg-muted rounded w-16"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Notes Display */}
      {!isLoading && (
        <>
          {notes.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <div className="mx-auto h-12 w-12 text-muted-foreground mb-4">
                    <Search className="h-full w-full" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {searchTerm ? "No notes found" : "No notes yet"}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm
                      ? `No notes match "${searchTerm}". Try a different search term.`
                      : "Create your first note to get started."}
                  </p>
                  <Button onClick={handleCreateNote}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Note
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedNotes).map(([dateGroup, groupNotes]) => (
                <div key={dateGroup}>
                  <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {dateGroup}
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {groupNotes.map((note) => (
                      <Card
                        key={note._id}
                        className="cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                        onClick={() => handleNoteClick(note._id)}
                      >
                        <CardHeader className="pb-3">
                          <div className="relative">
                            {isDeleting ? (
                              <Button className="absolute right-2 bg-transparent border-2 border-muted-foreground hover:border-red-600 hover:bg-red-500 cursor-pointer group" variant="default" onClick={(event) => handleDelete(note._id, event)} disabled>
                                <Loader2 className="text-muted-foreground group-hover:text-white animate-spin" />
                              </Button>
                            ) : (
                              <Button className="absolute right-2 bg-transparent border-2 border-muted-foreground hover:border-red-600 hover:bg-red-500 cursor-pointer group" variant="default" onClick={(event) => handleDelete(note._id, event)}>
                                <Trash className="text-muted-foreground group-hover:text-white" />
                              </Button>
                            )}
                          </div>
                          <CardTitle className="text-base line-clamp-2">{note.title}</CardTitle>
                          <CardDescription className="flex items-center gap-1 text-xs">
                            <Calendar className="h-3 w-3" />
                            {formatDistanceToNow(new Date(note.updatedAt), {
                              addSuffix: true,
                            })}
                          </CardDescription>
                        </CardHeader>
                        {note.tags.length > 0 && (
                          <CardContent className="pt-0">
                            <div className="flex items-center gap-1 mb-2">
                              <Tag className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">Tags:</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {note.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs px-2 py-0">
                                  {tag}
                                </Badge>
                              ))}
                              {note.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs px-2 py-0">
                                  +{note.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Search Results Summary */}
      {!isLoading && searchTerm && notes.length > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          Found {notes.length} note{notes.length !== 1 ? "s" : ""} matching "{searchTerm}"
        </div>
      )}
    </div>
  )
}
