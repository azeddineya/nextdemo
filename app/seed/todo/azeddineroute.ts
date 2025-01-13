import { db } from '@vercel/postgres';


const client = await db.connect();


async function initToDoTable() {
  await client.sql`
  CREATE TABLE IF NOT EXISTS todos(
   id SERIAL PRIMARY KEY,
   text TEXT NOT NULL
 );`
}


export async function GET() {
  try {
    await client.sql`BEGIN`;
    await initToDoTable();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Table todos created successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
