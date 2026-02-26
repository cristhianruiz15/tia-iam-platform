import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const users = db.prepare('SELECT * FROM users').all();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, nombre, apellido, email, telefono, estado, cargo, sistemas } = body;
    
    const insert = db.prepare(`
      INSERT INTO users (id, nombre, apellido, email, telefono, estado, cargo, sistemas)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    insert.run(id, nombre, apellido, email, telefono, estado, cargo, JSON.stringify(sistemas));
    
    return NextResponse.json({ message: 'User created successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
