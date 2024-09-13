export { default } from 'next-auth/middleware';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest, event: NextFetchEvent) {
	const session = await getToken({ req, secret, raw: true });

	const url = new URL(req.url);

	if (!session) {
		return NextResponse.redirect(new URL('/auth/login', req.url));
	}
}
export const config = {
	matcher: ['/calendar/:path*'],
};
