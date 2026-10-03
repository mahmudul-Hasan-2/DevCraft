"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const SellAssetPage = () => {
  const { data } = authClient.useSession();
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
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          userId: data?.user?.id,
          createdAt: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setFormData({
          title: "",
          shortDescription: "",
          fullDescription: "",
          price: "",
          category: "",
          imageUrl: "",
        });

        setTimeout(() => {
          router.push("/items");
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
    <div className="min-h-screen w-full bg-[#0F172A] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Page Heading */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight">
            Sell Your Asset
          </h1>
          <p className="mt-1.5 text-xs text-slate-400">
            List your premium hardware, digital resources, or enterprise items
            on our global marketplace.
          </p>
        </div>

        {/* Main Form Container */}
        <div className="bg-[#0F172A] p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Alerts */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3.5 rounded-xl text-xs font-medium">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3.5 rounded-xl text-xs font-medium">
                Asset listed successfully! Redirecting to Explore page...
              </div>
            )}

            {/* Title */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Asset Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. MacBook Pro M3 Max (64GB RAM)"
                className="w-full px-3.5 py-2.5 bg-[#0F172A] border border-slate-700/80 rounded-xl focus:outline-none focus:border-cyan-400 text-xs text-slate-200 placeholder:text-slate-600 transition-all"
                required
              />
            </div>

            {/* Price and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Price (USD) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 2499"
                  min="1"
                  className="w-full px-3.5 py-2.5 bg-[#0F172A] border border-slate-700/80 rounded-xl focus:outline-none focus:border-cyan-400 text-xs text-slate-200 placeholder:text-slate-600 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-[#0F172A] border border-slate-700/80 rounded-xl focus:outline-none focus:border-cyan-400 text-xs text-slate-300 transition-all cursor-pointer"
                  required
                >
                  <option value="" className="bg-[#0F172A]">
                    Select Category
                  </option>
                  <option value="electronics" className="bg-[#0F172A]">
                    Electronics
                  </option>
                  <option value="realestate" className="bg-[#0F172A]">
                    Real Estate
                  </option>
                  <option value="vehicles" className="bg-[#0F172A]">
                    Vehicles
                  </option>
                </select>
              </div>
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Short Description *
              </label>
              <input
                type="text"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="Brief summary of the item (max 100-120 chars)"
                maxLength={150}
                className="w-full px-3.5 py-2.5 bg-[#0F172A] border border-slate-700/80 rounded-xl focus:outline-none focus:border-cyan-400 text-xs text-slate-200 placeholder:text-slate-600 transition-all"
                required
              />
            </div>

            {/* Full Description */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Full Description *
              </label>
              <textarea
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleChange}
                placeholder="Provide a comprehensive breakdown of specifications, conditions, and warranty details..."
                rows={4}
                className="w-full px-3.5 py-2.5 bg-[#0F172A] border border-slate-700/80 rounded-xl focus:outline-none focus:border-cyan-400 text-xs text-slate-200 placeholder:text-slate-600 transition-all resize-none"
                required
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Image URL (Optional)
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3.5 py-2.5 bg-[#0F172A] border border-slate-700/80 rounded-xl focus:outline-none focus:border-cyan-400 text-xs text-slate-200 placeholder:text-slate-600 transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-semibold py-2.5 px-5 rounded-xl transition-all text-xs shadow-md active:scale-[0.99] flex justify-center items-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-slate-950"
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
    </div>
  );
};

export default SellAssetPage;
