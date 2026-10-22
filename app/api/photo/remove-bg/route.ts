import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { image } = await req.json();
    if (!image) return NextResponse.json({ error: "No image" }, { status: 400 });

    const mode = process.env.AI_MODE || "free"; // Don't use NEXT_PUBLIC_ for server

    // MODE 1: FREE - for your 6 studios to work without key
    if (mode === "free" || !process.env.FAL_KEY) {
      return NextResponse.json({ 
        mode: "free",
        // Tell frontend to use @imgly/background-removal locally
        message: "Use client side" 
      });
    }

    // MODE 2: FAL PREMIUM - Photoroom level
    const falRes = await fetch('https://queue.fal.run/fal-ai/birefnet/v2', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.FAL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        image_url: image,
        output_format: "png"
      }),
    });

    const queueData = await falRes.json();
    if (!falRes.ok) throw new Error(queueData.detail || "Fal queue failed");

    // Poll for result (Photoroom also polls)
    const statusUrl = queueData.status_url || queueData.response_url;
    let result: any = null;
    for (let i = 0; i < 20; i++) {
      await new Promise(r => setTimeout(r, 1000));
      const poll = await fetch(statusUrl, {
        headers: { 'Authorization': `Key ${process.env.FAL_KEY}` }
      });
      const pollData = await poll.json();
      if (pollData.status === "COMPLETED" || pollData.image) {
        result = pollData;
        break;
      }
    }

    return NextResponse.json({ 
      mode: "fal", 
      image: result?.image?.url || result?.images?.[0]?.url || queueData,
      ...result 
    });

  } catch (e: any) {
    console.error("remove-bg error:", e);
    // Fallback to free if fal fails - never break 6 studios
    return NextResponse.json({ 
      mode: "free_fallback", 
      message: "Use client side",
      error: e.message 
    });
  }
}
