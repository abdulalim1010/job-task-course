import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req, { params }) {
  const { id, lessonId } = params;
  const token = req.headers.get("Authorization")?.split(" ")[1];
  const userId = decodeToken(token);

  const client = await clientPromise;
  const db = client.db("learningPlatform");

  await db.collection("userProgress").updateOne(
    { userId: new ObjectId(userId), courseId: new ObjectId(id) },
    { $addToSet: { completedLessons: new ObjectId(lessonId) } },
    { upsert: true }
  );

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
