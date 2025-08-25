import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const { pathname } = req.nextUrl

    if(!isLoggedIn && !['/login', '/register', '/'].includes(pathname)) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    if(isLoggedIn && ['/login', '/register', '/'].includes(pathname)) {
        return NextResponse.redirect(new URL("/home", req.url))
    }

    return NextResponse.next()
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}