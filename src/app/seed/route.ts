// import { db } from '@vercel/postgres';
// import bcrypt from 'bcrypt';

// const client = await db.connect();

// async function seedUsers() {
// 	await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
// 	await client.sql`
//     CREATE TABLE IF NOT EXISTS users (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       uid TEXT NOT NULL UNIQUE,
//       password TEXT NOT NULL,
//       "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//     );
//   `;
// 	const hashedPassword = await bcrypt.hash('test123', 10);
// 	const insertedUsers = await client.sql`
//         INSERT INTO users ( name, uid, password)
//         VALUES ( '왕규하', 'wgh19', ${hashedPassword})
//         ON CONFLICT (id) DO NOTHING;
//       `;

// 	return insertedUsers;
// }

// async function seedTodos() {
// 	await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
// 	await client.sql`
// 	CREATE TABLE IF NOT EXISTS todos (
// 		id SERIAL PRIMARY KEY,
// 		user_id UUID NOT NULL,
// 		title VARCHAR(255) NOT NULL,
// 		content VARCHAR(255),
// 		startDate TIMESTAMP,
// 		endDate TIMESTAMP,
// 		colorIndex SMALLINT,
// 		isDone BOOLEAN NOT NULL DEFAULT FALSE,
// 		"createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
// 		CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES "users"(id) ON DELETE CASCADE ON UPDATE CASCADE
// 	  );
//   `;

// 	const insertedUsers = await client.query(
// 		`
//   INSERT INTO todos (user_id, title, content)
//   VALUES ($1, $2, $3)
//   ON CONFLICT DO NOTHING
//   RETURNING *;
// `,
// 		['792d073c-d7f4-44bf-b6c3-ea0ae8c462da', 'test', 'test1']
// 	);
// 	return insertedUsers;
// }
// export async function GET() {
// 	try {
// 		await client.sql`BEGIN`;
// 		// await seedUsers();
// 		await seedTodos();
// 		await client.sql`COMMIT`;

// 		return Response.json({ message: 'Database seeded successfully' });
// 	} catch (error) {
// 		await client.sql`ROLLBACK`;
// 		return Response.json({ error }, { status: 500 });
// 	}
// }
