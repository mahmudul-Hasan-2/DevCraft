import React from "react";

const ExploreLoading = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Upper Content Skeleton */}
      <div className="mb-10 space-y-3 animate-pulse">
        <div className="h-10 bg-slate-800/60 rounded-xl w-48 md:w-64" />
        <div className="h-4 bg-slate-800/40 rounded-lg w-full max-w-md" />
      </div>

      {/* Filter Panel Skeleton */}
      <div className="bg-slate-900/20 border border-slate-800/60 p-6 rounded-2xl mb-8 flex flex-col md:flex-row gap-4 items-end animate-pulse">
        <div className="w-full md:flex-1 space-y-2">
          <div className="h-3 bg-slate-800/60 rounded w-20" />
          <div className="h-11 bg-slate-800/40 rounded-xl w-full" />
        </div>
        <div className="w-full md:w-56 space-y-2">
          <div className="h-3 bg-slate-800/60 rounded w-16" />
          <div className="h-11 bg-slate-800/40 rounded-xl w-full" />
        </div>
        <div className="w-full md:w-auto h-11 bg-slate-800/60 rounded-xl px-12" />
      </div>

      {/* Grid Architecture Skeleton (4 Cards per row on desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col justify-between h-[400px] bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden animate-pulse shadow-xl"
          >
            {/* Image Box */}
            <div className="h-48 w-full bg-slate-800/50" />

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                {/* Title */}
                <div className="h-5 bg-slate-800/60 rounded-lg w-5/6" />
                {/* Descriptions */}
                <div className="h-3.5 bg-slate-800/40 rounded w-full" />
                <div className="h-3.5 bg-slate-800/40 rounded w-4/5" />
              </div>

              {/* Price and Button */}
              <div className="space-y-3">
                <div className="h-6 bg-slate-800/60 rounded-lg w-24" />
                <div className="h-10 bg-slate-800/40 rounded-xl w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreLoading;
