import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";

// ==========================================
// ১. GET METHOD: শুধুমাত্র নিজের ডেটা আনা
// ==========================================
export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    // 💡 কঠোরভাবে শুধুমাত্র কারেন্ট ইউজারের 'assets' খোঁজা হচ্ছে (কোনো গ্লোবাল ফলব্যাক ছাড়া)
    const myItems = await db
      .collection("assets")
      .find({ userId: session.user.id })
      .toArray();

    const formattedItems = myItems.map((item) => ({
      id: item._id.toString(),
      name: item.name || item.title || "Untitled Item",
      price: item.price ? Number(item.price) : 0,
      category: item.category || "General",
      createdAt: item.createdAt || new Date().toISOString(),
    }));

    return NextResponse.json(formattedItems);
  } catch (error) {
    console.error("Database GET error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

// ==========================================
// ২. DELETE METHOD: শুধুমাত্র নিজের ডেটা ডিলিট করা
// ==========================================
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

    // 💡 কঠোরভাবে userId ভ্যালিডেশন নিশ্চিত করে ওয়ান-শট ডিলিট লজিক
    const result = await db
      .collection("assets")
      .deleteOne({ _id: objectId, userId: session.user.id });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Asset not found or unauthorized" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database DELETE error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

// ==========================================
// ৩. PUT METHOD: শুধুমাত্র নিজের ডেটা আপডেট করা
// ==========================================
export async function PUT(request: Request) {
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

    const body = await request.json();
    const { name, price, category } = body;

    const client = await clientPromise;
    const db = client.db();
    const objectId = new ObjectId(id);

    const updateFields = {
      name: name,
      title: name,
      price: price ? Number(price) : 0,
      category: category || "General",
      updatedAt: new Date().toISOString(),
    };

    // 💡 কঠোরভাবে userId ভ্যালিডেশন নিশ্চিত করে ওয়ান-শট আপডেট লজিক
    const result = await db
      .collection("assets")
      .updateOne(
        { _id: objectId, userId: session.user.id },
        { $set: updateFields },
      );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Asset not found or unauthorized" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Asset updated successfully",
    });
  } catch (error) {
    console.error("Database PUT error:", error);
    return NextResponse.json(
      { error: "Internal Server Fault" },
      { status: 500 },
    );
  }
}
