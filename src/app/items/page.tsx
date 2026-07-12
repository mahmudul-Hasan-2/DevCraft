import React from "react";
import { Filter, Document } from "mongodb";
import AssetCard, { Asset } from "@/Components/AssetCard";
import FilterPanel from "@/Components/FilterPanel";
import clientPromise from "@/lib/mongodb";
import Link from "next/link"; // পেজিনেশন লিংকের জন্য

// ডাটা যেন ক্যাশ না হয়ে প্রতি রিকোয়েস্টে সরাসরি ডাটাবেজ থেকে আসে
export const dynamic = "force-dynamic";

interface SearchParams {
  search?: string;
  category?: string;
  sortBy?: string;
  page?: string; // নতুন পেজ প্যারামিটার যোগ করা হলো
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

// আমরা রিটার্ন টাইপে assets-এর সাথে totalPages-ও ফিরিয়ে দেবো
interface FetchResult {
  assets: Asset[];
  totalPages: number;
  currentPage: number;
}

const ITEMS_PER_PAGE = 8; // প্রতি পেজে ৮টি করে আইটেম দেখাবো

// সার্ভার-সাইড ডাটা ফেচিং, ফিল্টারিং, সর্টিং এবং পেজিনেশন ফাংশন
async function fetchFilteredAssets(params: SearchParams): Promise<FetchResult> {
  try {
    const client = await clientPromise;
    const db = client.db();

    const currentPage = parseInt(params.page || "1", 10) || 1;
    const skipAmount = (currentPage - 1) * ITEMS_PER_PAGE;

    // টাইপ-সেফ মঙ্গোডিবি ফিল্টার অবজেক্ট
    const query: Filter<Document> = {};

    // ১. টেক্সট সার্চ লজিক
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
      sortOptions = { price: 1 };
    } else if (params.sortBy === "price_desc") {
      sortOptions = { price: -1 };
    } else if (params.sortBy === "date_asc") {
      sortOptions = { createdAt: 1 };
    } else {
      sortOptions = { createdAt: -1 }; // ডিফল্ট
    }

    // ফিল্টার অনুযায়ী টোটাল কয়টা আইটেম আছে তা গণনা করা হচ্ছে
    const totalItems = await db.collection("assets").countDocuments(query);
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    // ডাটাবেজ থেকে skip ও limit মিলিয়ে ডাটা তুলে আনা হচ্ছে
    const data = await db
      .collection("assets")
      .find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(ITEMS_PER_PAGE)
      .toArray();

    // ডাটা ম্যাপ ও আইডি কনভার্ট করা
    const assets = data.map((item) => ({
      _id: item._id.toString(),
      title: item.title || "Untitled Asset",
      shortDescription: item.shortDescription || "",
      fullDescription: item.fullDescription || "",
      price:
        typeof item.price === "number" ? item.price : Number(item.price) || 0,
      imageUrl: item.imageUrl || "https://via.placeholder.com/150",
      category: item.category || "Uncategorized",
    })) as Asset[];

    return { assets, totalPages, currentPage };
  } catch (error) {
    console.error("Database connection failed in server component:", error);
    return { assets: [], totalPages: 1, currentPage: 1 };
  }
}

const ExploreAssets = async ({ searchParams }: PageProps) => {
  const resolvedParams = await searchParams;
  const { assets, totalPages, currentPage } =
    await fetchFilteredAssets(resolvedParams);

  // ইউআরএল কোয়েরি জেনারেট করার হেল্পার ফাংশন (যাতে ফিল্টার নষ্ট না হয়)
  const createPageLink = (pageNumber: number) => {
    const params = new URLSearchParams();
    if (resolvedParams.search) params.set("search", resolvedParams.search);
    if (resolvedParams.category)
      params.set("category", resolvedParams.category);
    if (resolvedParams.sortBy) params.set("sortBy", resolvedParams.sortBy);
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

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
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-in fade-in duration-300">
            {assets.map((asset) => (
              <AssetCard key={asset._id} asset={asset} />
            ))}
          </div>

          {/* 🎯 মডার্ন ডার্ক-থিমড পেজিনেশন বার */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-12 bg-slate-900/40 p-4 rounded-xl border border-slate-800/60 max-w-md mx-auto">
              {/* Previous বাটন */}
              <Link
                href={createPageLink(currentPage - 1)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition ${
                  currentPage === 1
                    ? "pointer-events-none opacity-40 border-slate-800 bg-slate-900 text-slate-500"
                    : "border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                Previous
              </Link>

              {/* পেজ নম্বর সমূহ */}
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                return (
                  <Link
                    key={pageNumber}
                    href={createPageLink(pageNumber)}
                    className={`px-3 py-1.5 text-sm font-semibold rounded-lg border transition ${
                      currentPage === pageNumber
                        ? "bg-white text-slate-950 border-white shadow-lg"
                        : "border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    {pageNumber}
                  </Link>
                );
              })}

              {/* Next বাটন */}
              <Link
                href={createPageLink(currentPage + 1)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition ${
                  currentPage === totalPages
                    ? "pointer-events-none opacity-40 border-slate-800 bg-slate-900 text-slate-500"
                    : "border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                Next
              </Link>
            </div>
          )}
        </>
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
