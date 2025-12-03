import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("learningPlatform");
    const usersCollection = db.collection("users");

    // check existing user
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      role: "student",
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
