import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    const { studentId, isPremium } = await req.json();

    if (!studentId)
      return NextResponse.json({ message: "studentId missing" }, { status: 400 });

    const client = await clientPromise;
    const db = client.db("learningPlatform");
    const users = db.collection("users");

    const result = await users.updateOne(
      { _id: new ObjectId(studentId) },
      { $set: { isPremium } }
    );

    if (result.modifiedCount === 0)
      return NextResponse.json({ message: "Update failed" }, { status: 400 });

    return NextResponse.json(
      { message: "Premium status updated successfully" },
      { status: 200 }
    );

  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
