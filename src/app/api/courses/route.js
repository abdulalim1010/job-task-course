import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("learningPlatform");
    const courses = db.collection("courses");

    // ----------- Query Params -----------
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 6;
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const level = searchParams.get("level") || "";
    const sort = searchParams.get("sort") || ""; // price_low, price_high

    const skip = (page - 1) * limit;

    // ----------- FILTER QUERY -----------
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { instructor: { $regex: search, $options: "i" } }
      ];
    }

    if (category) {
      query.category = category;
    }

    if (level) {
      query.level = level;
    }

    // ----------- SORTING -----------
    let sortQuery = {};

    if (sort === "price_low") sortQuery.price = 1;
    if (sort === "price_high") sortQuery.price = -1;

    // ----------- DB FETCH -----------
    const data = await courses
      .find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await courses.countDocuments(query);

    return NextResponse.json({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      courses: data,
    });

  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
