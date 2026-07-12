"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface Props {
  itemId: string;
  itemName: string;
}

export default function DeleteOwnAsset({ itemId, itemName }: Props) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const confirmDelete = async () => {
    setIsDeleting(true);

    // 💡 রেসপন্স স্ট্যাটাস সরাসরি ট্র্যাক করার জন্য ফ্ল্যাগ
    let responseStatus = false;

    try {
      const res = await fetch(`/api/items/mine?id=${itemId}`, {
        method: "DELETE",
      });

      // স্ট্যাটাস ok অথবা ২০৪ (No Content) হলেও সফল ধরা হবে
      if (res.ok || res.status === 200 || res.status === 204) {
        responseStatus = true;
      }
    } catch (err) {
      console.error("Delete Fetch Error:", err);
    } finally {
      setIsDeleting(false);
    }

    // 💡 এপিআই সফল হলে মোডাল বন্ধ, সাকসেস টোস্ট এবং রাউটার রিফ্রেস হবে
    if (responseStatus) {
      toast.success(`"${itemName}" successfully deleted! 🗑️`);
      setIsModalOpen(false);
      // router.refresh();
      window.location.reload();
    } else {
      toast.error("Failed to delete the asset.");
    }
  };

  return (
    <>
      {/* ট্র্যাশ বাটন */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
        title="Delete Asset"
      >
        <Trash2 className="h-4 w-4" />
      </button>

      {/* পোর্টাল দিয়ে মোডাল বডিতে ট্রান্সফার করা */}
      {isModalOpen &&
        mounted &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div
              className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl max-w-sm w-full shadow-2xl text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-white font-bold flex items-center gap-2 mb-4 text-lg">
                <AlertTriangle className="text-red-500 h-5 w-5" /> Confirm
                Action
              </h3>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                Are you sure you want to permanently delete{" "}
                <span className="text-zinc-200 font-semibold">
                  "{itemName}"
                </span>
                ? This process cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => !isDeleting && setIsModalOpen(false)}
                  className="text-zinc-400 text-sm hover:text-white font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm text-white font-semibold flex items-center justify-center min-w-[80px] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isDeleting ? (
                    <Loader2 className="animate-spin h-4 w-4" />
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
