import { ApiError } from "@/lib/ApiError";
import { ApiResponse } from "@/lib/ApiResponse";
import connectDB from "@/lib/db";
import NoteModel from "@/models/note.model";
import mongoose from "mongoose";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest, {params}: {params: {id: string}}) {
    try {
        await connectDB()

        if(!mongoose.Types.ObjectId.isValid(params.id)) return NextResponse.json(new ApiError(400, "Invalid note id"));

        const note = await NoteModel.findById(params.id).populate('links', 'title')

        if(!note) return NextResponse.json(new ApiError(404, "Note not found"));

        return NextResponse.json(new ApiResponse(200, note, "Note fetched successfully"))
    } catch (error) {
        console.error("Error fetching note", error)
        return NextResponse.json(new ApiError(500, "Error fetching note"))
    }
}

export async function PUT(request: NextRequest, {params}: {params: {id: string}}) {
    try {
        await connectDB()

        if(!mongoose.Types.ObjectId.isValid(params.id)) return NextResponse.json(new ApiError(400, "Invalid note id"));

        const {title, content, tags, links} = await request.json()

        const note = await NoteModel.findByIdAndUpdate(params.id,
            {title, content, tags, links},
            {new: true, runValidators: true}
        ).populate('links', 'title')

        if(!note) return NextResponse.json(new ApiError(404, "Note not found"));

        return NextResponse.json(new ApiResponse(200, note, "Note updated successfully"))
    } catch (error) {
        console.error("Error updating note", error)
        return NextResponse.json(new ApiError(500, "Error updating note"))
    }
}

export async function DELETE(request: NextRequest, {params}: {params: {id: string}}) {
    try {
        await connectDB()

        if(!mongoose.Types.ObjectId.isValid(params.id)) return NextResponse.json(new ApiError(400, "Invalid note id"));

        const note = await NoteModel.findByIdAndDelete(params.id)

        if(!note) return NextResponse.json(new ApiError(404, "Note not found"));

        return NextResponse.json(new ApiResponse(200, note, "Note deleted successfully"))
    } catch (error) {
        console.error("Error deleting note", error)
        return NextResponse.json(new ApiError(500, "Error deleting note"))
    }
}