import { notFound } from "next/navigation"
import connectDB from "@/lib/db"
import NoteModel from "@/models/note.model"
import NoteEditor from "@/components/note-editor"

interface NotePageProps {
  params: {
    id: string
  }
}

export default async function NotePage({ params }: NotePageProps) {
  await connectDB()

  try {
    const noteDoc = await NoteModel.findById(params.id)
      .populate("links", "title")
      .lean()

    if (!noteDoc) {
      notFound()
    }

    const initialLinks =
      Array.isArray(noteDoc.links)
        ? (noteDoc.links as any[]).map((l) => ({
            _id: l._id?.toString(),
            title: l.title ?? "",
          }))
        : []

    return (
      <div className="h-screen flex flex-col">
        <NoteEditor
          noteId={params.id}
          initialTitle={noteDoc.title ?? ""}
          initialContent={noteDoc.content ?? ""}
          initialTags={Array.isArray(noteDoc.tags) ? noteDoc.tags : []}
          initialLinks={initialLinks}
        />
      </div>
    )
  } catch (error) {
    notFound()
  }
}
