import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

const loginPageURL = "/"
const dashboardURL = "/dashboard/home"

export function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const cookieToken = req.cookies.get('session_token')

    //caso o usuario esteja logado e esteja na pagina de login, ele sera redirecionado para o home na dashboard
    if(cookieToken && path == loginPageURL) { 
        const redirectURL = req.nextUrl.clone()
        redirectURL.pathname = dashboardURL
        return NextResponse.redirect(redirectURL)
    }
    

    //se o caminho acessado tiver "dashboard" o middleware ira verificar se esta tudo certo com o token
    if(!path.split("/").includes('dashboard')) return 

    const redirectURL = req.nextUrl.clone()
    redirectURL.pathname = loginPageURL
    if(!cookieToken) return NextResponse.redirect(redirectURL)

    return NextResponse.next()
}

export const config: MiddlewareConfig = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
    ]
}