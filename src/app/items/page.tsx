import React from "react";
import { Filter, Document } from "mongodb";
import AssetCard, { Asset } from "@/Components/AssetCard";
import FilterPanel from "@/Components/FilterPanel";
import clientPromise from "@/lib/mongodb";

// ডাটা যেন ক্যাশ না হয়ে প্রতি রিকোয়েস্টে সরাসরি ডাটাবেজ থেকে আসে
export const dynamic = "force-dynamic";

interface SearchParams {
  search?: string;
  category?: string;
  sortBy?: string;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

// সার্ভার-সাইড ডাটা ফেচিং, ফিল্টারিং এবং সর্টিং ফাংশন
async function fetchFilteredAssets(params: SearchParams): Promise<Asset[]> {
  try {
    const client = await clientPromise;
    const db = client.db();

    // টাইপ-সেফ মঙ্গোডিবি ফিল্টার অবজেক্ট
    const query: Filter<Document> = {};

    // ১. টেক্সট সার্চ লজিক (Title, Short, অথবা Full Description-এর ভেতর কেস-ইনসেন্সিটিভ খুঁজবে)
    if (params.search && params.search.trim() !== "") {
      query.$or = [
        { title: { $regex: params.search.trim(), $options: "i" } },
        { shortDescription: { $regex: params.search.trim(), $options: "i" } },
        { fullDescription: { $regex: params.search.trim(), $options: "i" } },
      ];
    }

    // ২. ক্যাটাগরি ফিল্টার লজিক
    if (params.category && params.category.trim() !== "") {
      query.category = params.category.trim();
    }

    // ৩. ডাইনামিক সর্টিং লজিক
    let sortOptions: any = {};
    if (params.sortBy === "price_asc") {
      sortOptions = { price: 1 }; // কম থেকে বেশি দাম
    } else if (params.sortBy === "price_desc") {
      sortOptions = { price: -1 }; // বেশি থেকে কম দাম
    } else if (params.sortBy === "date_asc") {
      sortOptions = { createdAt: 1 }; // পুরানো প্রোডাক্ট আগে
    } else {
      sortOptions = { createdAt: -1 }; // ডিফল্ট: নতুন প্রোডাক্ট আগে দেখাবে
    }

    // ডাটাবেজ থেকে ডাটা তুলে আনা হচ্ছে
    const data = await db
      .collection("assets")
      .find(query)
      .sort(sortOptions)
      .toArray();

    // সার্ভার কম্পোনেন্ট থেকে ক্লায়েন্ট সেফ করার জন্য ডাটা ম্যাপ ও আইডি কনভার্ট করা
    return data.map((item) => ({
      _id: item._id.toString(),
      title: item.title || "Untitled Asset",
      shortDescription: item.shortDescription || "",
      fullDescription: item.fullDescription || "",
      price:
        typeof item.price === "number" ? item.price : Number(item.price) || 0,
      imageUrl: item.imageUrl || "https://via.placeholder.com/150",
      category: item.category || "Uncategorized",
    })) as Asset[];
  } catch (error) {
    console.error("Database connection failed in server component:", error);
    return [];
  }
}

const ExploreAssets = async ({ searchParams }: PageProps) => {
  const resolvedParams = await searchParams;
  const assets = await fetchFilteredAssets(resolvedParams);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 font-sans">
      {/* Upper Content / Heading Section */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight">
          Explore Assets
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Discover and browse through our exclusive catalog of certified
          enterprise assets.
        </p>
      </div>

      {/* Interactive Filter & Search Controls */}
      <FilterPanel />

      {/* Responsive Core Grid Architecture */}
      {assets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-in fade-in duration-300">
          {assets.map((asset) => (
            <AssetCard key={asset._id} asset={asset} />
          ))}
        </div>
      ) : (
        /* Standard Redesigned Empty State Message */
        <div className="text-center py-24 bg-slate-900/20 rounded-2xl border border-dashed border-slate-800 shadow-inner max-w-2xl mx-auto mt-8 animate-in fade-in duration-200">
          <svg
            className="mx-auto h-12 w-12 text-slate-600 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h3 className="mt-4 text-lg font-semibold text-slate-300">
            No assets available
          </h3>
          <p className="mt-2 text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
            We couldn't find any premium resources matching your active filter
            configuration. Try changing your search query or category!
          </p>
        </div>
      )}
    </div>
  );
};

export default ExploreAssets;
