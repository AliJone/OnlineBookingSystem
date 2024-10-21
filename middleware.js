import { NextRequest, NextResponse } from "next/server";
import Cookies from "js-cookie";


export default function middleware(req){
    // console.log(req)
    let sessionStatus = req.cookies.get('token')
    // console.log(sessionStatus)
    let url=req.url
    // console.log(req)
    if (!sessionStatus && url.includes('/admin/')){
        return(
            NextResponse.redirect('http:/localhost:3000/auth/signIn')
            )        
    }
    else if (sessionStatus && url.includes('/auth/')){
        return(
            NextResponse.redirect('http:/localhost:3000/admin/dashboard')
            )   

    };

}

5