import { NextResponse } from "next/server";
import auth from "./auth";

export default async function middle(request){
    const user = await auth.getUser()
    if(!user){
        request.cookies.delete("session")
        const response = NextResponse.redirect(new URL("/login", request.url))
        return response
    }
    console.log("Middleware ran")
    return NextResponse.next()
}

export const config ={
    matcher: ['/']
}