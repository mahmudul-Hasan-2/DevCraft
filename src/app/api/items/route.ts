import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// ১. GET Method: ডাটা রিড করার জন্য
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(); // তোমার ডিরেক্ট কানেক্টেড ডাটাবেজ নিয়ে নেবে

    // 'assets' কালেকশন থেকে সব ডাটা নিয়ে আসা
    const assets = await db.collection("assets").find({}).toArray();

    return NextResponse.json({ success: true, data: assets }, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch assets" },
      { status: 500 },
    );
  }
}

// ২. POST Method: নতুন ডাটা ডাটাবেজে পাঠানোর জন্য
export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const body = await request.json();
    const { title, shortDescription, fullDescription, price, imageUrl } = body;

    if (!title || !shortDescription || !fullDescription || !price) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    const newAsset = {
      title,
      shortDescription,
      fullDescription,
      price: Number(price),
      imageUrl: imageUrl || "https://via.placeholder.com/150",
      createdAt: new Date(),
    };

    const result = await db.collection("assets").insertOne(newAsset);

    return NextResponse.json(
      {
        success: true,
        message: "Asset added successfully",
        id: result.insertedId,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add asset" },
      { status: 500 },
    );
  }
}
