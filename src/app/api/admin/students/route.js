import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export async function GET(req) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  let payload;
  try { payload = jwt.verify(token, process.env.JWT_SECRET); } 
  catch { return NextResponse.json({ message: "Invalid token" }, { status: 401 }); }

  if (!payload.isAdmin) return NextResponse.json({ message: "Access denied" }, { status: 403 });

  const client = await clientPromise;
  const db = client.db("learningPlatform");
  const users = db.collection("users");

  const students = await users.find({}).toArray();

  return NextResponse.json(students.map(s => ({
    _id: s._id,
    name: s.name,
    email: s.email,
    role: s.role,
    isPremium: s.isPremium || false
  })));
}
