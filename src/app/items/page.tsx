import React from "react";
import { Filter, Document } from "mongodb";
import AssetCard, { Asset } from "@/Components/AssetCard";
import FilterPanel from "@/Components/FilterPanel";
import clientPromise from "@/lib/mongodb";

interface SearchParams {
  search?: string;
  category?: string;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

// সার্ভার-সাইড ডাটা ফেচিং এবং ফিল্টারিং ফাংশন
async function fetchFilteredAssets(params: SearchParams): Promise<Asset[]> {
  try {
    const client = await clientPromise;
    const db = client.db();

    // টাইপ-সেফ মঙ্গোডিবি ফিল্টার অবজেক্ট
    const query: Filter<Document> = {};

    if (params.search) {
      query.title = { $regex: params.search, $options: "i" };
    }

    if (params.category) {
      query.category = params.category;
    }

    const data = await db.collection("assets").find(query).toArray();

    // সার্ভার কম্পোনেন্ট থেকে ক্লায়েন্ট সেফ করার জন্য _id স্ট্রিং-এ কনভার্ট
    return data.map((item) => ({
      _id: item._id.toString(),
      title: item.title || "",
      shortDescription: item.shortDescription || "",
      fullDescription: item.fullDescription || "",
      price: Number(item.price) || 0,
      imageUrl: item.imageUrl || "",
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
    <div className="min-h-screen bg-slate-950 text-slate-100 max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Upper Content / Heading Section */}
      <div className="mb-10">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {assets.map((asset) => (
            <AssetCard key={asset._id} asset={asset} />
          ))}
        </div>
      ) : (
        /* Standard Redesigned Empty State Message */
        <div className="text-center py-24 bg-slate-900/20 rounded-2xl border border-dashed border-slate-800 shadow-inner">
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
          <p className="mt-2 text-sm text-slate-500 max-w-xs mx-auto">
            We couldn't find any premium resources matching your active filter
            configuration.
          </p>
        </div>
      )}
    </div>
  );
};

export default ExploreAssets;
