import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const auth = req.headers.get("authorization");

    if (!auth || !auth.startsWith("Bearer "))
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const token = auth.split(" ")[1];

    // verify only (no decode needed in frontend)
    jwt.verify(token, process.env.JWT_SECRET);

    const studentId = req.nextUrl.searchParams.get("studentId");

    const client = await clientPromise;
    const db = client.db("learningPlatform");
    const enrollments = db.collection("enrollments");

    const data = await enrollments.find({ studentId }).toArray();

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
