import { NextResponse } from "next/server";

export async function GET() {
  const names = [
    "Alex",
    "Alex",
    "Alex",
    "Alex",
    "Alex",
    "Teófilo",
    "Teófilo",
    "Teófilo",
    "Teófilo",
    "Enio",
    "Enio",
    "Solange",
    "Jackson Abreu",
    "Marinalda",
    "Marinalda",
    "Patricia",
  ];

  return NextResponse.json({ names: names });
}
