import { INote } from "@/interfaces/interface"
import { ApiError } from "@/lib/ApiError"
import { ApiResponse } from "@/lib/ApiResponse"
import connectDB from "@/lib/db"
import NoteModel from "@/models/note.model"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        await connectDB()

        const notes = await NoteModel.find({}).populate('links', 'title')

        const nodes = notes.map((note: INote) => ({
            id: note._id.toString(),
            name: note.title,
            tags: note.tags
        }))

        const links: any = []
        notes.forEach((note: INote) => {
            note.links.forEach((linkedNote: any) => {
                links.push({
                    from: note._id.toString(),
                    to: linkedNote._id.toString()
                })
            })
        })

        return NextResponse.json(new ApiResponse(200, {nodes, links}, "Links fetched successfully"))
    } catch (error) {
        console.error('Error fetching graph data', error)
        return NextResponse.json(new ApiError(500, "Failed to fetch graph data"))
    }
}