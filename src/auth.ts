import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import connectDB from "./lib/db";
import UserModel from "./models/user.model";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Github({
            clientId: process.env.AUTH_GITHUB_ID!,
            clientSecret: process.env.AUTH_GITHUB_SECRET!
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                try {
                    const { email, password } = credentials;
                    if (!email || !password) throw new Error(`Please provide both email and password`);
    
                    await connectDB()
    
                    const user = await UserModel.findOne({email})
                    if(!user) throw new Error(`Invalid Credentials`);
    
                    const isPasswordCorrect = await user.comparePassword(password.toString())
                    if(!isPasswordCorrect) throw new Error(`Invalid password`);
    
                    return user;
                } catch (error: any) {
                    throw new Error(error)
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.username = user.username?.toString();
            }
            return token;
        },
        async session({ session, token }) {
            if(token) {
                session.user._id = token._id?.toString();
                session.user.username = token.username?.toString();
            }
            return session;
        },
        
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.AUTH_SECRET!,
    pages: {
        signIn: '/login'
    }
})