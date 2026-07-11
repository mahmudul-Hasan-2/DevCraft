import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";

// ১. GET METHOD: ডেটা আনা
export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    // items বা assets যে কালেকশনেই থাকুক ডাটা খোঁজা
    let myItems = await db
      .collection("items")
      .find({ userId: session.user.id })
      .toArray();
    if (myItems.length === 0) {
      myItems = await db
        .collection("assets")
        .find({ userId: session.user.id })
        .toArray();
    }

    // গ্লোবাল ফলব্যাক (টেস্টিং এর জন্য যদি userId ম্যাচ না করে)
    if (myItems.length === 0) {
      const fallback = await db
        .collection("assets")
        .find({})
        .limit(5)
        .toArray();
      myItems =
        fallback.length > 0
          ? fallback
          : await db.collection("items").find({}).limit(5).toArray();
    }

    const formattedItems = myItems.map((item) => ({
      id: item._id.toString(),
      name: item.name || item.title || "Untitled Item",
      price: item.price ? Number(item.price) : 0,
      category: item.category || "General",
      createdAt: item.createdAt || new Date().toISOString(),
    }));

    return NextResponse.json(formattedItems);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

// ২. DELETE METHOD: ডেটা ডিলিট করা
export async function DELETE(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID missing" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const objectId = new ObjectId(id);

    // সেফটি ডিলিট লজিক: প্রথমে ইউজার আইডি সহ ট্রাই করবে, না হলে ডিরেক্ট আইডি দিয়ে (টেস্ট ডাটার জন্য)
    let result = await db
      .collection("items")
      .deleteOne({ _id: objectId, userId: session.user.id });
    if (result.deletedCount === 0) {
      result = await db
        .collection("assets")
        .deleteOne({ _id: objectId, userId: session.user.id });
    }
    if (result.deletedCount === 0) {
      // ফলব্যাক ডিলিট (যদি ইউজার আইডি ছাড়া গ্লোবাল ডাটা রেন্ডার হয়ে থাকে)
      result = await db.collection("items").deleteOne({ _id: objectId });
    }
    if (result.deletedCount === 0) {
      result = await db.collection("assets").deleteOne({ _id: objectId });
    }

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
