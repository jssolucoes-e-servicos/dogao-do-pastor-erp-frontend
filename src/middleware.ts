import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('smf00')?.value

  // Se não houver sessão, redireciona para a página de login
  if (!session) {
    return NextResponse.redirect(new URL('/acesso', request.url))
  }

  // Se houver sessão, permite que a solicitação continue
  return NextResponse.next()
}

export const config = {
  // O middleware será executado apenas para qualquer caminho que comece com `/app`
  matcher: ['/app/:path*'],
}