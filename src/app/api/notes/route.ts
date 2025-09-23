import { ApiError } from "@/lib/ApiError";
import { ApiResponse } from "@/lib/ApiResponse";
import connectDB from "@/lib/db";
import NoteModel from "@/models/note.model";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await connectDB()

        const {searchParams} = new URL(request.url)
        const search = searchParams.get('search')

        let query = {}
        if(search) {
            query = {
                $or: [{title: {$regex: search, $options: 'i'}}, {tags: {$in: [new RegExp(search, 'i')]}}]
            }
        }

        const notes = await NoteModel.find(query).sort({updatedAt: -1}).populate('links', 'title')

        return NextResponse.json(new ApiResponse(200, notes,"Notes fetched successfully"))
    } catch (error) {
        console.error("Error creating note", error)
        return NextResponse.json(new ApiError(500, "Error creating note"))
    }
}