"use client";

import { useState } from "react";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";

interface Props {
  itemId: string;
  itemName: string;
  onDeleteSuccess: (id: string) => void;
}

export default function DeleteOwnAsset({
  itemId,
  itemName,
  onDeleteSuccess,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = async () => {
    setIsDeleting(true);

    try {
      // FIXED: /api/items/mine?id=আইডি আকারে পাঠানো হচ্ছে
      const res = await fetch(`/api/items/mine?id=${itemId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        onDeleteSuccess(itemId);
        setIsModalOpen(false);
      } else {
        alert("Error deleting item. Unauthorised or not found.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-2 text-zinc-400 hover:text-red-400 transition-colors"
      >
        <Trash2 className="h-4 w-4" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl max-w-sm w-full shadow-2xl">
            <h3 className="text-white font-bold flex items-center gap-2 mb-4">
              <AlertTriangle className="text-red-500 h-5 w-5" /> Confirm Delete
            </h3>
            <p className="text-zinc-400 text-sm mb-6">
              Are you sure about deleting{" "}
              <span className="text-zinc-200 font-semibold">"{itemName}"</span>?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 text-sm hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm text-white font-semibold transition-all"
              >
                {isDeleting ? (
                  <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
