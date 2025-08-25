import { ApiError } from "@/lib/ApiError";
import { ApiResponse } from "@/lib/ApiResponse";
import connectDB from "@/lib/db";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

await connectDB()

export async function POST(req: NextRequest) {
    const {username, name, email, password} = await req.json()
    if(!username || !name || !email || !password) return NextResponse.json(new ApiError(400, "Please provide all the credentials"));
    const existingUser = await UserModel.findOne({email});
    if (existingUser) return NextResponse.json(new ApiError(400, "Email already exists"));

    const newUser = await UserModel.create({
        name,
        email,
        username,
        password
    })

    const createdUser = await UserModel.findById(newUser._id).select('-password')
    return NextResponse.json(new ApiResponse(200, createdUser, "User created successfully"));
}