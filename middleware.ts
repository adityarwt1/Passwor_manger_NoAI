import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest){
    /// mathing ur syntax is request.nexturl.pathname 
    if(request.nextUrl.pathname === "/logoutbolte"){
        // this way is for creatting and redirecting in the url
        const url = new URL("/", request.url)
        return NextResponse.redirect(url)
    }

    else{
        return NextResponse.next()
    }
}

export const config = {
    matcher: ["/logout"]
}