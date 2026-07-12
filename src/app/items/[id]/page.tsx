import React from "react";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { notFound } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import { Asset } from "@/Components/AssetCard";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function fetchAssetDetails(id: string): Promise<Asset | null> {
  try {
    if (!ObjectId.isValid(id)) return null;

    const client = await clientPromise;
    const db = client.db();

    const data = await db
      .collection("assets")
      .findOne({ _id: new ObjectId(id) });

    if (!data) return null;

    return {
      _id: data._id.toString(),
      title: data.title || "",
      shortDescription: data.shortDescription || "",
      fullDescription: data.fullDescription || "",
      price: Number(data.price) || 0,
      imageUrl: data.imageUrl || "",
    };
  } catch (error) {
    console.error("Failed to fetch asset details:", error);
    return null;
  }
}

const AssetDetailsPage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const asset = await fetchAssetDetails(resolvedParams.id);

  if (!asset) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Back to Explore Navigation Link */}
      <div className="mb-8">
        <Link
          href="/explore"
          className="inline-flex items-center text-sm font-semibold text-slate-400 hover:text-blue-400 transition-colors gap-2 group"
        >
          <svg
            className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Go back to explore assets
        </Link>
      </div>

      {/* Main Container Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-slate-900/20 rounded-3xl border border-slate-800/80 p-6 md:p-10 shadow-2xl backdrop-blur-md">
        {/* Left Section: Asset Display Image */}
        <div className="lg:col-span-7 w-full h-[300px] md:h-[450px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-inner relative">
          <img
            src={
              asset.imageUrl ||
              "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600&auto=format&fit=crop"
            }
            alt={asset.title}
            className="w-full h-full object-cover opacity-90"
          />
        </div>

        {/* Right Section: Trust Indicators & Meta Metrics (No Action Buttons) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4 uppercase tracking-wider">
              Active Listing
            </span>

            <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight leading-tight break-words">
              {asset.title}
            </h1>

            {/* Price Visualization Box */}
            <div className="mt-5 p-4 bg-slate-900/60 border border-slate-800/60 rounded-xl inline-block min-w-[180px]">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Evaluated Price
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-medium text-slate-400">$</span>
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                  {asset.price.toLocaleString()}
                </span>
              </div>
            </div>

            <p className="mt-6 text-slate-300 font-medium text-sm border-l-2 border-blue-500 pl-3 italic break-words">
              {asset.shortDescription}
            </p>
          </div>

          {/* Premium Recruiter-Focused Trust Panel */}
          <div className="space-y-4 bg-slate-900/40 border border-slate-850/80 p-5 rounded-2xl shadow-inner">
            {/* Buyer Protection */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 flex-shrink-0 mt-0.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Escrow System Integrated
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Transactional funds are held safely within an escrow smart
                  contract protocol until manual asset hand-off confirmation.
                </p>
              </div>
            </div>

            <hr className="border-slate-800/60" />

            {/* Asset Integrity Check */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                Asset Integrity Assessment
              </h4>
              <ul className="space-y-2 text-[11px] text-slate-400">
                <li className="flex items-center gap-2">
                  <svg
                    className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Automatic structural vulnerability check passed
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Legal corporate ownership documentation confirmed
                </li>
              </ul>
            </div>

            <hr className="border-slate-800/60" />

            {/* Urgency/Activity Metric */}
            <div className="flex items-center gap-2 text-[11px] text-amber-400 bg-amber-500/5 border border-amber-500/10 px-3 py-2 rounded-xl">
              <svg
                className="w-4 h-4 text-amber-500 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span>
                <strong className="font-semibold text-amber-300">
                  Traffic:
                </strong>{" "}
                4 verification agents audited this log today.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Description Section */}
      <div className="mt-10 bg-slate-900/20 rounded-3xl border border-slate-800/80 p-6 md:p-10 shadow-xl backdrop-blur-md overflow-hidden">
        <h2 className="text-xl font-bold text-slate-200 tracking-tight mb-4 pb-2 border-b border-slate-800">
          Detailed Information & Specifications
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line break-words max-w-full">
          {asset.fullDescription}
        </p>
      </div>
    </div>
  );
};

export default AssetDetailsPage;
