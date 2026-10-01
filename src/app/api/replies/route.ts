import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const REPLIES_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'replies.json');

export interface ReplyItem {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  updatedAt?: string;
}

async function getReplies(): Promise<ReplyItem[]> {
  try {
    const data = await fs.readFile(REPLIES_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveReplies(replies: ReplyItem[]): Promise<void> {
  const dir = path.dirname(REPLIES_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(REPLIES_FILE_PATH, JSON.stringify(replies, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const replies = await getReplies();
    return NextResponse.json({ success: true, replies });
  } catch {
    return NextResponse.json({ success: false, replies: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, message } = body;

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: 'Message content is required.' },
        { status: 400 }
      );
    }

    const newReply: ReplyItem = {
      id: Date.now().toString(),
      name: name?.trim() || 'A Silent Reader',
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    const existingReplies = await getReplies();
    const updatedReplies = [newReply, ...existingReplies];

    await saveReplies(updatedReplies);

    return NextResponse.json({ success: true, reply: newReply, replies: updatedReplies });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to save reply.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, message } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Reply ID is required.' },
        { status: 400 }
      );
    }

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: 'Message content cannot be empty.' },
        { status: 400 }
      );
    }

    const existingReplies = await getReplies();
    const index = existingReplies.findIndex((item) => item.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, message: 'Reply not found.' },
        { status: 404 }
      );
    }

    existingReplies[index] = {
      ...existingReplies[index],
      name: name !== undefined ? (name.trim() || 'A Silent Reader') : existingReplies[index].name,
      message: message.trim(),
      updatedAt: new Date().toISOString(),
    };

    await saveReplies(existingReplies);

    return NextResponse.json({
      success: true,
      reply: existingReplies[index],
      replies: existingReplies,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to update reply.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let id = searchParams.get('id');

    if (!id) {
      try {
        const body = await request.json();
        id = body.id;
      } catch {
        // searchParams might be the primary source
      }
    }

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Reply ID is required.' },
        { status: 400 }
      );
    }

    const existingReplies = await getReplies();
    const updatedReplies = existingReplies.filter((item) => item.id !== id);

    if (existingReplies.length === updatedReplies.length) {
      return NextResponse.json(
        { success: false, message: 'Reply not found.' },
        { status: 404 }
      );
    }

    await saveReplies(updatedReplies);

    return NextResponse.json({ success: true, replies: updatedReplies });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to delete reply.' },
      { status: 500 }
    );
  }
}

