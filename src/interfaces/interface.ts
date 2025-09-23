import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    email: string;
    username: string;
    password: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface INote extends Document {
    _id: mongoose.Types.ObjectId
    title: string
    content: object
    tags: string[]
    links: mongoose.Types.ObjectId[]
    createdAt: Date
    updatedAt: Date
}