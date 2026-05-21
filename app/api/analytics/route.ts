import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  if (!body?.event || typeof body.event !== "string") {
    return NextResponse.json({ error: "Missing event" }, { status: 400 });
  }
  await prisma.analyticsEvent.create({
    data: {
      event: body.event,
      metadata: body.metadata ?? {}
    }
  });
  return NextResponse.json({ ok: true });
}

