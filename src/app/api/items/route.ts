import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// ১. GET Method: সার্চ, ফিল্টার এবং সর্টিং সহ ডাটা রিড করার জন্য
export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();

    // ইউআরএল থেকে কুয়েরি প্যারামিটারগুলো বের করা
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim();
    const category = searchParams.get("category")?.trim();
    const sortBy = searchParams.get("sortBy");

    // ডাইনামিক কুয়েরি অবজেক্ট তৈরি
    let query: any = {};

    // ক) ক্যাটাগরি ফিল্টার আগে সেট করা
    if (category) {
      query.category = category;
    }

    // খ) টেক্সট সার্চ লজিক (স্মার্ট ফিক্সড 🛠️)
    if (search) {
      const searchConditions: any[] = [
        { title: { $regex: search, $options: "i" } },
        { shortDescription: { $regex: search, $options: "i" } },
        { fullDescription: { $regex: search, $options: "i" } },
      ];

      // যদি ইউজার ক্যাটাগরি সিলেক্ট না করে কিন্তু সার্চ বক্সে ক্যাটাগরির নাম লেখে, তবে ক্যাটাগরি ফিল্ডেও খুঁজবে
      if (!category) {
        searchConditions.push({ category: { $regex: search, $options: "i" } });
      }

      // যদি অলরেডি ক্যাটাগরি কুয়েরিতে থাকে, তবে ক্যাটাগরির ভেতরেই এই সার্চ কন্ডিশনগুলো AND হবে
      query.$and = query.$and || [];
      query.$and.push({ $or: searchConditions });
    }

    // গ) ডাইনামিক সর্টিং লজিক
    let sortOptions: any = {};
    if (sortBy === "price_asc") {
      sortOptions = { price: 1 }; // কম থেকে বেশি
    } else if (sortBy === "price_desc") {
      sortOptions = { price: -1 }; // বেশি থেকে কম
    } else if (sortBy === "date_desc") {
      sortOptions = { createdAt: -1 }; // নতুন আগে
    } else if (sortBy === "date_asc") {
      sortOptions = { createdAt: 1 }; // পুরানো আগে
    } else {
      sortOptions = { createdAt: -1 }; // ডিফল্ট: নতুন প্রোডাক্ট আগে দেখাবে
    }

    // ডাটাবেজ থেকে কুয়েরি ও সর্ট অনুযায়ী ডেটা আনা
    const assets = await db
      .collection("assets")
      .find(query)
      .sort(sortOptions)
      .toArray();

    // ফ্রন্টএন্ডে যেন map করার সময় জ্যাম না লাগে, তাই মঙ্গোডিবির _id-কে id স্ট্রিং বানিয়ে দেওয়া
    const formattedAssets = assets.map((item) => ({
      ...item,
      id: item._id.toString(),
    }));

    return NextResponse.json(
      { success: true, data: formattedAssets },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch assets" },
      { status: 500 },
    );
  }
}

// ২. POST Method: ক্যাটাগরিসহ নতুন ডাটা ডাটাবেজে সেভ করার জন্য
export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const body = await request.json();
    const {
      title,
      shortDescription,
      fullDescription,
      price,
      category,
      imageUrl,
      userId,
    } = body;

    // ক্যাটাগরিও এখন রিকোয়ার্ড ফিল্ড
    if (
      !title ||
      !shortDescription ||
      !fullDescription ||
      !price ||
      !category
    ) {
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
      category,
      userId: userId || null,
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
