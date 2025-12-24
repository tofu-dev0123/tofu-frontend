import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  //   console.log('=== Middleware Debug Info ===');
  //   console.log('Pathname:', request.nextUrl.pathname);
  //   console.log('Request URL:', request.url);
  //   console.log('Method:', request.method);
  //   const { pathname } = request.nextUrl;
  //   // すべてのクッキーをログ出力
  //   const allCookies = request.cookies.getAll();
  //   console.log('All cookies count:', allCookies.length);
  //   console.log(
  //     'All cookies:',
  //     allCookies.map((c) => ({
  //       name: c.name,
  //       value: c.value.length > 20 ? c.value.substring(0, 20) + '...' : c.value,
  //       hasValue: !!c.value,
  //     }))
  //   );
  //   if (pathname === '/admin/login') {
  //     console.log('Login page - allowing access');
  //     return NextResponse.next();
  //   }
  //   const token = request.cookies.get('access_token')?.value;
  //   console.log('access_token found:', !!token);
  //   if (token) {
  //     console.log(
  //       'access_token value (first 30 chars):',
  //       token.substring(0, 30) + '...'
  //     );
  //     console.log('access_token length:', token.length);
  //   } else {
  //     console.log('access_token NOT found in cookies');
  //     console.log(
  //       'Available cookie names:',
  //       allCookies.map((c) => c.name)
  //     );
  //   }
  //   if (!token) {
  //     console.log('No token found - redirecting to login');
  //     const loginUrl = new URL('/admin/login', request.url);
  //     loginUrl.searchParams.set('redirect', pathname);
  //     console.log('Redirect URL:', loginUrl.toString());
  //     return NextResponse.redirect(loginUrl);
  //   }
  //   console.log('Token found - allowing access');
  //   console.log('=== End Middleware Debug ===');
  //   return NextResponse.next();
  // }
  // export const config = {
  //   matcher: ['/admin/:path*'],
}
