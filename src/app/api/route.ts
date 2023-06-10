import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "node:fs";
import path from "path";

export async function POST(request: Request) {
  const req = await request.json();
  const getPath = path.join(process.cwd(), "data", "data.json");
  const data = readFileSync(getPath);

  const JSONdata = JSON.parse(data.toString());
  JSONdata.data.push({
    name: req.patientName,
    result: req.result,
  });
  writeFileSync(getPath, JSON.stringify(JSONdata));
  return NextResponse.next().status;
}

export async function GET(request: Request) {
  const getPath = path.join(process.cwd(), "data", "data.json");
  const data = readFileSync(getPath);

  const JSONdata = JSON.parse(data.toString());

  return NextResponse.json(JSONdata.data);
}
