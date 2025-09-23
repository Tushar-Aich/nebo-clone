import connectDB from "@/lib/db"
import NoteModel from "@/models/note.model"
import { redirect } from "next/navigation"


export default async function NotesPage() {
  // Create a new note and redirect to its edit page
  await connectDB()

  const newNote = new NoteModel({
    title: "Untitled Note",
    content: {},
    tags: [],
    links: [],
  })

  await newNote.save()

  redirect(`/notes/${newNote._id}`)
}
