import { Document } from "mongoose";

export interface IUser extends Document {
    email: string;
    username: string;
    password: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}