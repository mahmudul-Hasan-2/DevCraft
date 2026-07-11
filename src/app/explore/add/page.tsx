"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SellAssetPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    category: "",
    imageUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // বেসিক ফ্রন্টএন্ড ভ্যালিডেশন
    if (
      !formData.title ||
      !formData.shortDescription ||
      !formData.fullDescription ||
      !formData.price ||
      !formData.category
    ) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/assets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price), // স্ট্রিং প্রাইসকে নাম্বারে কনভার্ট
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        // ফর্ম রিসেট করা
        setFormData({
          title: "",
          shortDescription: "",
          fullDescription: "",
          price: "",
          category: "",
          imageUrl: "",
        });
        // ৩ সেকেন্ড পর ইউজারকে এক্সপ্লোর পেজে রিডাইরেক্ট করা
        setTimeout(() => {
          router.push("/explore");
          router.refresh();
        }, 2000);
      } else {
        setError(result.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError("Failed to submit asset. Server might be offline.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Heading */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight">
          Sell Your Asset
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          List your premium hardware, digital resources, or enterprise items on
          our global marketplace.
        </p>
      </div>

      {/* Main Form Container */}
      <div className="bg-slate-800/40 backdrop-blur-md p-8 rounded-2xl border border-slate-750/80 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Success & Error Alert Banners */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-sm font-medium">
              Asset listed successfully! Redirecting to Explore page...
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Asset Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. MacBook Pro M3 Max (64GB RAM)"
              className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm text-slate-200 placeholder-slate-600 transition-all"
              required
            />
          </div>

          {/* Grid for Price and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Price (USD) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 2499"
                min="1"
                className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm text-slate-200 placeholder-slate-600 transition-all"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm text-slate-300 bg-none transition-all cursor-pointer"
                required
              >
                <option value="" className="bg-slate-900">
                  Select Category
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
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Short Description *
            </label>
            <input
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Brief summary of the item (max 100-120 chars)"
              maxLength={150}
              className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm text-slate-200 placeholder-slate-600 transition-all"
              required
            />
          </div>

          {/* Full Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Full Description *
            </label>
            <textarea
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleChange}
              placeholder="Provide a comprehensive breakdown of specifications, conditions, and warranty details..."
              rows={5}
              className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm text-slate-200 placeholder-slate-600 transition-all resize-none"
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Image URL (Optional)
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm text-slate-200 placeholder-slate-600 transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all text-sm shadow-lg shadow-blue-600/10 active:scale-[0.99] flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </>
            ) : (
              "Submit Asset for Sale"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellAssetPage;
