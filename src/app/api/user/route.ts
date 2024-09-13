import { db } from '@vercel/postgres';

import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
	try {
		const client = await db.connect();
		const url = new URL(req.url);
		const password = url.searchParams.get('password') ?? '';
		const uid = url.searchParams.get('uid');

		const existingUser = await client.sql`
        SELECT * FROM users WHERE uid =${uid as string}
    `;

		if (existingUser.rows.length > 0) {
			const verified = await bcrypt.compare(
				password,
				existingUser.rows[0].password
			);
			if (verified) {
				return NextResponse.json({ success: true, data: existingUser.rows[0] });
			} else
				return NextResponse.json(
					{ success: false, message: '비밀번호를 확인해주세요' },
					{ status: 400 }
				);
		} else {
			return NextResponse.json(
				{ success: false, message: '아이디를 확인해주세요' },
				{ status: 400 }
			);
		}
	} catch (e) {
		// 에러 처리
		return NextResponse.json({ success: false, message: e }, { status: 500 });
	}
}

export async function POST(req: NextRequest, res: NextResponse) {
	try {
		const client = await db.connect();
		const { name, uid, password } = await req.json();

		const existingUser = await client.sql`
		    SELECT * FROM users WHERE uid =${uid}
		`;
		if (existingUser.rows.length > 0) {
			return NextResponse.json(
				{ success: false, message: '이미 존재하는 아이디입니다.' },
				{ status: 400 }
			);
		} else {
			const hashedPassword = await bcrypt.hash(password, 10);
			const newUser = await client.sql`
		    INSERT INTO users ( name, uid, password)
		    VALUES (${name},${uid}, ${hashedPassword})
		    ON CONFLICT (id) DO NOTHING;
		    `;
			return NextResponse.json({ success: true, data: newUser.rows[0] });
		}
	} catch (e) {
		// 에러 처리
		return NextResponse.json({ success: false, message: e }, { status: 500 });
	}
}
