"use client";

import { useSearchStore } from "@/lib/store/searchStore";
import { IoSearch } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

export default function SearchInput() {
  const query = useSearchStore((state) => state.query);
  const setQuery = useSearchStore((state) => state.setQuery);

  return (
    <div className="flex items-center gap-2 text-gray-400 dark:text-zinc-300 bg-white dark:bg-zinc-800 ring-1 ring-gray-300 dark:ring-zinc-600 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-emerald-200 transition w-64">
      <IoSearch className="text-lg" />
      <input
        type="text"
        placeholder="Search your contacts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="placeholder:text-gray-400 flex-1 min-w-0 outline-none text-sm"
      />
      {query && (
        <MdCancel
          onClick={() => setQuery("")}
          className="text-lg cursor-pointer hover:text-gray-500 dark:hover:text-zinc-400 transition"
        />
      )}
    </div>
  );
}
