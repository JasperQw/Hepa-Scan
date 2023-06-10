import { NextResponse } from "next/server";
import { writeFileSync } from "node:fs";
import path from "path";

export async function GET(request: Request) {
  const getPath = path.join(process.cwd(), "data", "data.json");
  writeFileSync(getPath, JSON.stringify({data: []}));
  return NextResponse.next().status;
}
