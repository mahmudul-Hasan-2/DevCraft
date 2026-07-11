"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const FilterPanel: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState<string>(
    searchParams.get("search") || "",
  );
  const [category, setCategory] = useState<string>(
    searchParams.get("category") || "",
  );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (search.trim()) params.set("search", search.trim());
    else params.delete("search");

    if (category) params.set("category", category);
    else params.delete("category");

    router.push(`/explore?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-slate-800/40 backdrop-blur-md p-6 rounded-2xl border border-slate-750/80 mb-8 flex flex-col md:flex-row gap-4 items-end shadow-xl"
    >
      <div className="w-full md:flex-1">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Search Assets
        </label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="e.g. MacBook Pro, Enterprise Server..."
          className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm text-slate-200 placeholder-slate-500 transition-all"
        />
      </div>

      <div className="w-full md:w-56">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm text-slate-300 bg-none transition-all cursor-pointer"
        >
          <option value="" className="bg-slate-900">
            All Categories
          </option>
          <option value="electronics" className="bg-slate-900">
            Electronics
          </option>
          <option value="realestate" className="bg-slate-900">
            Real Estate
          </option>
          <option value="vehicles" className="bg-slate-900">
            Vehicles
          </option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-8 rounded-xl transition-all text-sm h-[46px] shadow-lg shadow-blue-600/20 active:scale-[0.98]"
      >
        Apply Filters
      </button>
    </form>
  );
};

export default FilterPanel;
