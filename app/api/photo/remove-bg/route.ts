import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { image } = await req.json();
  
  // CHECK MODE
  const mode = process.env.NEXT_PUBLIC_AI_MODE || "free";
  
  if (mode === "free") {
    // Tell frontend to do it free locally
    return NextResponse.json({ mode: "free", message: "Use client side" });
  }

  // FAL MODE - Premium
  try {
    const falRes = await fetch('https://queue.fal.run/fal-ai/birefnet', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.FAL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image_url: image }),
    });
    const data = await falRes.json();
    if (!falRes.ok) return NextResponse.json(data, { status: 500 });
    return NextResponse.json({ ...data, mode: "fal" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}