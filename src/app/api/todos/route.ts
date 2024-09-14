import { db } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
	try {
		const client = await db.connect();

		const todos = await client.sql`
        SELECT * FROM todos 
    `;

		return NextResponse.json({ success: true, data: todos.rows });
	} catch (e) {
		// 에러 처리
		return NextResponse.json({ success: false, message: e }, { status: 500 });
	}
}

export async function POST(req: NextRequest, res: NextResponse) {
	try {
		const client = await db.connect();

		const { user_id, title, content, startdate, enddate, colorindex } =
			await req.json();

		const newTodo = await client.sql`
		    INSERT INTO todos (user_id, title, content, startdate, enddate, colorindex)
		    VALUES (${user_id}, ${title}, ${content}, ${startdate}, ${enddate}, ${colorindex})
		    ON CONFLICT (id) DO NOTHING 
			RETURNING *;
		    `;

		return NextResponse.json({ success: true, data: newTodo.rows[0] });
	} catch (e) {
		// 에러 처리
		console.log(e);
		return NextResponse.json({ success: false, message: e }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest, res: NextResponse) {
	try {
		const client = await db.connect();

		const { id } = await req.json();

		const res = await client.sql`
		    DELETE FROM todos WHERE id=${id}
		    `;

		return NextResponse.json({ success: true, message: 'deleted' });
	} catch (e) {
		// 에러 처리
		return NextResponse.json({ success: false, message: e }, { status: 500 });
	}
}

export async function PUT(req: NextRequest, res: NextResponse) {
	try {
		const client = await db.connect();

		const {
			id,
			user_id,
			title,
			content,
			startdate,
			enddate,
			colorindex,
			isdone,
			createdAt,
		} = await req.json();

		const res = await client.sql`
		    UPDATE todos SET isdone=${isdone} WHERE id=${id}
		    `;
		return NextResponse.json({ success: true, message: 'updated' });
	} catch (e) {
		// 에러 처리
		return NextResponse.json({ success: false, message: e }, { status: 500 });
	}
}
