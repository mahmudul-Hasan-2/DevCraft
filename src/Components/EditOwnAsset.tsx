"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Pencil, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  item: { id: string; name: string; price: number; category: string };
}

export default function EditOwnAsset({ item }: Props) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [name, setName] = useState(item?.name);
  const [price, setPrice] = useState(item?.price);
  const [category, setCategory] = useState(item?.category);

  // মোডাল ওপেন হলে কারেন্ট ডাটা সিঙ্ক করা
  useEffect(() => {
    if (isModalOpen) {
      setName(item?.name);
      setPrice(item?.price);
      setCategory(item?.category);
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
        body: JSON.stringify({ name, price, category }),
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
    //   router.refresh();
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
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div
              className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl max-w-md w-full shadow-2xl text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Pencil className="h-5 w-5 text-blue-500" /> Edit Asset
              </h3>

              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">
                    Item Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-zinc-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={price === 0 ? "" : price}
                    onChange={(e) => {
                      const val = e.target.value;
                      setPrice(val === "" ? 0 : Number(val));
                    }}
                    required
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-zinc-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">
                    Category
                  </label>
                  {/* 💡 তোমার নিজস্ব ক্লাসরুম স্টাইলিং এবং অরিজিনাল অপশনস */}
                  <select
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm text-slate-300 bg-none transition-all cursor-pointer"
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

                <div className="flex gap-3 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => !isUpdating && setIsModalOpen(false)}
                    className="text-zinc-400 text-sm hover:text-white transition-colors"
                    disabled={isUpdating}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm text-white font-semibold flex items-center justify-center min-w-[80px] disabled:opacity-50 disabled:cursor-not-allowed"
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
