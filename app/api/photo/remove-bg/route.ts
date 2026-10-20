import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { image } = await req.json();
    if (!image) return NextResponse.json({ error: 'No image' }, { status: 400 });

    if (!process.env.FAL_KEY) {
      return NextResponse.json({ error: 'FAL_KEY missing in Vercel env' }, { status: 500 });
    }

    // Correct model: birefnet - best for product remove-bg
    const falRes = await fetch('https://queue.fal.run/fal-ai/birefnet', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.FAL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        image_url: image,
        threshold: 0
      }),
    });

    const data = await falRes.json();
    
    if (!falRes.ok) {
      console.error("Fal error:", data);
      return NextResponse.json({ error: data.detail || 'Fal error', full: data }, { status: 500 });
    }

    // birefnet returns { image: { url: ... } }
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}