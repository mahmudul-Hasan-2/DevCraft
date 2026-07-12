"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Package, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import DeleteOwnAsset from "@/Components/DeleteOwnAsset";
import EditOwnAsset from "@/Components/EditOwnAsset"; // এডিট কম্পোনেন্ট ইমপোর্ট

interface Item {
  id: string;
  name: string;
  price: number;
  category: string;
  createdAt: string;
}

export default function ManageItemsPage() {
  const router = useRouter();
  const { data: session, isPending: isAuthPending } = authClient.useSession();

  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // ১. প্রোটেক্টেড রুট চেক
  useEffect(() => {
    if (!isAuthPending && !session) {
      router.push("/login");
    }
  }, [session, isAuthPending, router]);

  // ২. ইউজারের নিজস্ব আইটেমগুলো ফেচ করা
  useEffect(() => {
    if (!session) return;

    const fetchMyItems = async () => {
      try {
        const response = await fetch("/api/items/mine");
        if (response.ok) {
          const data = await response.json();
          setItems(data);
        }
      } catch (error) {
        console.error("Failed to fetch items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyItems();
  }, [session]);

  // ৩. ডিলিট সাকসেস হ্যান্ডলার (স্টেট ফিল্টার)
  const handleRemoveFromState = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // ৪. এডিট সাকসেস হ্যান্ডলার (স্টেট ম্যাপ/আপডেট)
  const handleUpdateInState = (updatedItem: Item) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item,
      ),
    );
  };

  // Loading State
  if (isAuthPending || (isLoading && session)) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-zinc-950 text-white">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-400 mb-2" />
        <p className="text-zinc-400 text-sm">Loading your inventory...</p>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* হেডার সেকশন */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Manage Your Items
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              View, monitor, or remove items you have listed for sale.
            </p>
          </div>
          <Link
            href="/items/add"
            className="inline-flex items-center justify-center gap-1.5 bg-zinc-50 hover:bg-zinc-200 text-zinc-950 font-semibold px-4 py-2 rounded-lg text-sm transition-all shadow-sm self-start sm:self-center"
          >
            Sell Another Item
          </Link>
        </div>

        {/* আইটেম লিস্ট / টেবিল কন্টেইনার */}
        {items.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/30">
            <Package className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-zinc-300">
              No items found
            </h3>
            <p className="text-zinc-500 text-sm max-w-sm mx-auto mt-1 mb-6">
              You haven't listed any items for sale yet. Start showcasing your
              dev items today!
            </p>
            <Link
              href="/items/add"
              className="inline-flex items-center gap-1 text-sm text-zinc-300 hover:text-white font-medium underline underline-offset-4"
            >
              List your first item <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto border border-zinc-800 rounded-xl bg-zinc-900/20 backdrop-blur-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/50 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  <th className="px-6 py-4">Item Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Date Added</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-sm text-zinc-300">
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-zinc-900/40 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-white">
                      {item.name || "Untitled Item"}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-zinc-200">
                      ${item.price ? item.price.toFixed(2) : "0.00"}
                    </td>
                    <td className="px-6 py-4 text-zinc-400">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-right flex items-center justify-end gap-1">
                      {/* এডিট বাটন উইজেট */}
                      <EditOwnAsset
                        item={item}
                      />

                      {/* ডিলিট বাটন উইজেট */}
                      <DeleteOwnAsset
                        itemId={item.id}
                        itemName={item.name || "Untitled Item"}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
