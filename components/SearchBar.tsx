"use client";

import { useSearchStore } from "@/lib/store/searchStore";
import { IoSearch } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

export default function SearchInput() {
  const query = useSearchStore((state) => state.query);
  const setQuery = useSearchStore((state) => state.setQuery);

  return (
    <div className="flex items-center gap-2 bg-white ring-1 ring-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-emerald-200 transition w-64">
      <IoSearch className="text-gray-400 text-lg" />
      <input
        type="text"
        placeholder="Search your contacts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="outline-none text-sm"
      />
      {query && (
        <MdCancel
          onClick={() => setQuery("")}
          className="text-gray-400 text-lg cursor-pointer hover:text-gray-600 transition"
        />
      )}
    </div>
  );
}
