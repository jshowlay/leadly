import { NextResponse } from "next/server";

/** Lightweight check that the Node server is up (use when the page “stops loading”). */
export async function GET() {
  return NextResponse.json({ ok: true, service: "dentily" }, { status: 200 });
}
