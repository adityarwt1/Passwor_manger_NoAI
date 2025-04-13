
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";


export async function middleware(request: NextRequest){
    /// mathing ur syntax is request.nexturl.pathname 
    if(request.nextUrl.pathname === "/logoutbolte"){
        // this way is for creatting and redirecting in the url
        const url = new URL("/", request.url)
        return NextResponse.redirect(url)
    }
    if(request.nextUrl.pathname === "/add"){
        const reponse = await fetch("/api/cookieconfirmation",{
            method: "GET"
        })
        const data = await reponse.json()
        if(data.data){
            const url = new URL ("/add", request.url)
            return NextResponse.redirect(url)
        }
        else{
            const url = new URL ("/login", request.url)
            return NextResponse.redirect(url)
        }
        
    }

    else{
        return NextResponse.next()
    }
}

export const config = {
    matcher: ["/logout"]
}