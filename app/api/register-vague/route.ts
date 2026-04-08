import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Register user
  const user = {
    id: Math.random(),
    name: body.name,
    email: body.email,
  };

  return NextResponse.json({ success: true, user });
}
