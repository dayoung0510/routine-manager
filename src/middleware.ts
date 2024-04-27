import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const response = NextResponse.next();
  const { pathname } = req.nextUrl;

  /**
   *
   * 토큰(로그인)관련 로직
   *
   */
  const token = req.cookies.get('Auth')?.value;

  // 로그인세션 있는 상태에서 로그인페이지 접속
  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return response;
}

// matcher에 포함된 경로에서만 미들웨어 실행
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
