import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const client = await clientPromise;
    const db = client.db("learningPlatform");
    const users = db.collection("users");

    const user = await users.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // ✔ JWT now contains isPremium!!
    const token = jwt.sign(
      {
        id: user._id.toString(),
        email: user.email,
        isAdmin: user.role === "admin",
        isPremium: user.isPremium === true, 
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password: pw, ...userData } = user;

    return NextResponse.json(
      { message: "Login successful", user: userData, token },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
