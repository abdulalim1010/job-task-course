import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const auth = req.headers.get("authorization");
    if (!auth?.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.isPremium) {
      return NextResponse.json({ message: "Premium required" }, { status: 403 });
    }

    const studentId = req.nextUrl.searchParams.get("studentId");
    const client = await clientPromise;
    const db = client.db("learningPlatform");
    const enrollments = db.collection("enrollments");

    const courses = await enrollments.find({ studentId }).toArray();

    return NextResponse.json(courses);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
