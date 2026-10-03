"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Pencil, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ItemData {
  id: string;
  name?: string;
  title?: string;
  price: number;
  category: string;
  shortDescription?: string;
  fullDescription?: string;
  imageUrl?: string;
}

interface Props {
  item: ItemData;
}

export default function EditOwnAsset({ item }: Props) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [mounted, setMounted] = useState(false);

  // সব ফিল্ডের স্টেট
  const [title, setTitle] = useState(item?.title || item?.name || "");
  const [price, setPrice] = useState(item?.price || 0);
  const [category, setCategory] = useState(item?.category || "");
  const [shortDescription, setShortDescription] = useState(
    item?.shortDescription || "",
  );
  const [fullDescription, setFullDescription] = useState(
    item?.fullDescription || "",
  );
  const [imageUrl, setImageUrl] = useState(item?.imageUrl || "");

  // মোডাল ওপেন হলে কারেন্ট ডাটা প্রপারলি সিঙ্ক করা
  useEffect(() => {
    if (isModalOpen) {
      setTitle(item?.title || item?.name || "");
      setPrice(item?.price || 0);
      setCategory(item?.category || "");
      setShortDescription(item?.shortDescription || "");
      setFullDescription(item?.fullDescription || "");
      setImageUrl(item?.imageUrl || "");
    }
  }, [isModalOpen, item]);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    let responseStatus = false;

    try {
      const res = await fetch(`/api/items/mine?id=${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          name: title,
          price: Number(price),
          category,
          shortDescription,
          fullDescription,
          imageUrl,
        }),
      });

      if (res.ok || res.status === 200 || res.status === 204) {
        responseStatus = true;
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setIsUpdating(false);
    }

    if (responseStatus) {
      toast.success("Asset updated successfully! 🎉");
      setIsModalOpen(false);
      window.location.reload();
    } else {
      toast.error("Failed to update asset.");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-2 text-zinc-400 hover:text-blue-400 transition-colors mr-1"
        title="Edit Item"
      >
        <Pencil className="h-4 w-4" />
      </button>

      {isModalOpen &&
        mounted &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200 overflow-y-auto">
            <div
              className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl max-w-lg w-full shadow-2xl text-left my-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Pencil className="h-5 w-5 text-blue-500" /> Edit Asset
              </h3>

              <form onSubmit={handleUpdate} className="space-y-4">
                {/* Asset Title */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">
                    Asset Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-zinc-700"
                  />
                </div>

                {/* Grid for Price and Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Price */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={price === 0 ? "" : price}
                      onChange={(e) => {
                        const val = e.target.value;
                        setPrice(val === "" ? 0 : Number(val));
                      }}
                      required
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-zinc-700"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">
                      Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-zinc-700 text-sm text-slate-300 cursor-pointer"
                      required
                    >
                      <option value="" className="bg-zinc-900">
                        Select Category
                      </option>
                      <option value="electronics" className="bg-zinc-900">
                        Electronics
                      </option>
                      <option value="realestate" className="bg-zinc-900">
                        Real Estate
                      </option>
                      <option value="vehicles" className="bg-zinc-900">
                        Vehicles
                      </option>
                    </select>
                  </div>
                </div>

                {/* Short Description (Required তুলে দেওয়া হয়েছে) */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">
                    Short Description
                  </label>
                  <input
                    type="text"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    maxLength={150}
                    placeholder="Brief summary of the item..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-zinc-700"
                  />
                </div>

                {/* Full Description (Required তুলে দেওয়া হয়েছে) */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">
                    Full Description
                  </label>
                  <textarea
                    value={fullDescription}
                    onChange={(e) => setFullDescription(e.target.value)}
                    rows={4}
                    placeholder="Provide a comprehensive breakdown..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-zinc-700 resize-none"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-zinc-700"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => !isUpdating && setIsModalOpen(false)}
                    className="text-zinc-400 text-sm hover:text-white transition-colors px-3 py-2"
                    disabled={isUpdating}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm text-white font-semibold flex items-center justify-center min-w-[100px] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdating ? (
                      <Loader2 className="animate-spin h-4 w-4" />
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
