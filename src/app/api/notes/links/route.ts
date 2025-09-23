import { ApiError } from "@/lib/ApiError";
import { ApiResponse } from "@/lib/ApiResponse";
import connectDB from "@/lib/db";
import NoteModel from "@/models/note.model";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectDB()

        const {noteTitle, currentNoteId} = await request.json()

        let targetNote = await NoteModel.findOne({
            title: {$regex: new RegExp(`^${noteTitle}$`, 'i')}
        })
        if(!targetNote) {
            targetNote = new NoteModel({
                title: noteTitle,
                content: {},
                tags: [],
                links: []
            })
            await targetNote.save()
        }

        const currentNote = await NoteModel.findById(currentNoteId)
        if(!currentNote) return NextResponse.json(new ApiError(404, "Note not found"));

        if(!currentNote.links.includes(targetNote._id)) {
            targetNote.links.push(currentNote._id)
            await targetNote.save()
        }

        return NextResponse.json(new ApiResponse(200, {
            linkedNote: {
                _id: targetNote._id,
                title: targetNote.title
            },
            created: !targetNote.createdAt || targetNote.createdAt.getTime() === targetNote.updatedAt.getTime()
        }, "Notes linked successfully"))
    } catch (error) {
        console.error("Error linking note", error)
        return NextResponse.json(new ApiError(500, "Error linking note"))
    }
}