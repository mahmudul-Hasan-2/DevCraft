import Link from "next/link";
import React from "react";

export interface Asset {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  imageUrl: string;
}

interface AssetCardProps {
  asset: Asset;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset }) => {
  return (
    <div className="flex flex-col justify-between h-full bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl shadow-xl hover:border-slate-700/60 transition-all duration-300 overflow-hidden group hover:scale-[1.01]">
      {/* Image Container with Hover Effect */}
      <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
        <img
          src={
            asset.imageUrl ||
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600&auto=format&fit=crop"
          }
          alt={asset.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-slate-900/20">
        <div>
          <h3 className="font-bold text-lg text-slate-100 tracking-tight line-clamp-1 group-hover:text-blue-400 transition-colors">
            {asset.title}
          </h3>
          <p className="text-slate-400 text-sm mt-2 line-clamp-2 leading-relaxed">
            {asset.shortDescription}
          </p>
        </div>

        {/* Price & Action Button */}
        <div className="mt-6">
          <div className="flex items-baseline gap-1">
            <span className="text-xs font-medium text-slate-500">$</span>
            <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
              {asset.price.toLocaleString()}
            </span>
          </div>

          <Link href={`/items/${asset._id}`}>
            <button className="w-full mt-4 bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 text-sm border border-slate-700/60 hover:border-blue-500 shadow-md active:scale-[0.98]">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AssetCard;
