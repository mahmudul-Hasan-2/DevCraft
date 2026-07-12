"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const FilterPanel: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ১. ইউআরএল থেকে কারেন্ট ভ্যালুগুলো নিয়ে স্টেট ইনিশিয়ালাইজ করা
  const [search, setSearch] = useState<string>(
    searchParams.get("search") || "",
  );
  const [category, setCategory] = useState<string>(
    searchParams.get("category") || "",
  );
  const [sortBy, setSortBy] = useState<string>(
    searchParams.get("sortBy") || "",
  );

  // ২. রিইউজেবল ফাংশন: ইউআরএল প্যারামস পুশ করার জন্য
  const applyFilters = (
    currentSearch: string,
    currentCategory: string,
    currentSort: string,
  ) => {
    const params = new URLSearchParams();

    if (currentSearch.trim()) params.set("search", currentSearch.trim());
    if (currentCategory) params.set("category", currentCategory);
    if (currentSort) params.set("sortBy", currentSort);

    // তোমার রুট অনুযায়ী /items পাথে কুয়েরি পুশ করবে
    router.push(`/items?${params.toString()}`);
  };

  // ৩. টেক্সট সার্চের জন্য ফর্ম সাবমিট হ্যান্ডলার
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    applyFilters(search, category, sortBy);
  };

  // ৪. ক্যাটাগরি বা সর্টিং চেঞ্জ হলে বাটনে ক্লিক করা ছাড়াই ইনস্ট্যান্ট ফিল্টার অ্যাপ্লাই হবে
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setCategory(val);
    applyFilters(search, val, sortBy);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSortBy(val);
    applyFilters(search, category, val);
  };

  // ৫. ইউআরএল সরাসরি চেঞ্জ হলে স্টেটের ডেটা সিঙ্ক রাখা
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setCategory(searchParams.get("category") || "");
    setSortBy(searchParams.get("sortBy") || "");
  }, [searchParams]);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800/40 backdrop-blur-md p-6 rounded-2xl border border-slate-750/80 mb-8 flex flex-col lg:flex-row gap-4 items-end shadow-xl"
    >
      {/* Search Input */}
      <div className="w-full lg:flex-1">
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

      {/* Category Dropdown */}
      <div className="w-full md:w-full lg:w-48">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Category
        </label>
        <select
          value={category}
          onChange={handleCategoryChange}
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

      {/* Sorting Dropdown (NEW) */}
      <div className="w-full md:w-full lg:w-56">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Sort By
        </label>
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm text-slate-300 bg-none transition-all cursor-pointer"
        >
          <option value="" className="bg-slate-900">
            Default Sorting
          </option>
          <option value="price_asc" className="bg-slate-900">
            Price: Low to High
          </option>
          <option value="price_desc" className="bg-slate-900">
            Price: High to Low
          </option>
          <option value="date_desc" className="bg-slate-900">
            Date: Newest First
          </option>
          <option value="date_asc" className="bg-slate-900">
            Date: Oldest First
          </option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full lg:w-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-8 rounded-xl transition-all text-sm h-[46px] shadow-lg shadow-blue-600/20 active:scale-[0.98] whitespace-nowrap"
      >
        Search
      </button>
    </form>
  );
};

export default FilterPanel;
