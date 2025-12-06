import { ObjectId } from "mongodb";

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import clientPromise from "@/lib/mongodb";

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("learningPlatform");
    const users = db.collection("users");

    // 1) Find user
    const user = await users.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 2) Toggle isPremium status
    const updatedUser = await users.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $set: { isPremium: !user.isPremium } },
      { returnDocument: "after" }
    );

    // 3) Create new token with updated isPremium
    const newToken = jwt.sign(
      {
        id: updatedUser.value._id.toString(),
        email: updatedUser.value.email,
        isAdmin: updatedUser.value.role === "admin",
        isPremium: updatedUser.value.isPremium,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      message: "Premium status updated successfully",
      newToken,
      updatedUser: updatedUser.value,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
