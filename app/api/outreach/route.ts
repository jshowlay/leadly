import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { requireUserId } from "@/lib/auth";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const userId = await requireUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.ANTHROPIC_API_KEY?.trim()) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not configured" },
      { status: 500 }
    );
  }

  const { csv } = await req.json();

  if (!csv) {
    return NextResponse.json({ error: "No CSV provided" }, { status: 400 });
  }

  try {
  const message = await client.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: `You are an expert B2B cold email copywriter specialising in dental industry outreach for a product called Dentily — a lead intelligence tool for dental sales reps.

A sales rep has pasted a CSV row from their Dentily lead export. Parse every field you can identify and write 3 distinct cold email variants targeting the practice.

CSV row:
${csv}

The CSV may contain any combination of: practice name, dentist/owner name, location, star rating, lead score, practice type, pain point signals, email, phone.

Return ONLY valid JSON — no markdown fences, no preamble, no explanation:
{
  "variants": [
    {
      "id": "cold-intro",
      "label": "Cold Intro",
      "subject": "...",
      "body": "...",
      "tone": "Warm, professional first touch"
    },
    {
      "id": "pain-point",
      "label": "Pain-Point Led",
      "subject": "...",
      "body": "...",
      "tone": "Leads with their specific gap"
    },
    {
      "id": "short-punchy",
      "label": "Short & Punchy",
      "subject": "...",
      "body": "...",
      "tone": "5 lines max, high reply rate"
    }
  ]
}

Writing rules:
- Address the dentist by name if available, otherwise use the practice name
- Reference specific data from the CSV: rating, pain points, location, practice type, lead score
- Cold Intro: 4–6 sentences, warm opener, establish credibility, soft CTA
- Pain-Point Led: open directly with the problem you spotted, 4–5 sentences, specific CTA
- Short & Punchy: 3–5 lines maximum, one clear question as CTA, zero fluff
- Never use the words "cold email", "outreach", or "I hope this email finds you well"
- Sign off every email as: [Your Name] | Dentily
- Use \\n\\n between paragraphs in the body field`,
      },
    ],
  });

  const text =
    message.content[0].type === "text" ? message.content[0].text : "";

  try {
    const parsed = JSON.parse(text);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json(
      { error: "Failed to parse AI response" },
      { status: 500 }
    );
  }
  } catch (error) {
    console.error("[api/outreach]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Generation failed" },
      { status: 500 }
    );
  }
}
