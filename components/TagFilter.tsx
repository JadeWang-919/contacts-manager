"use client";

import { useTagFilterStore } from "@/lib/store/tagFilterStore";

interface TagFilterProps {
  allTags: string[];
}

export default function TagFilter({ allTags }: TagFilterProps) {
  const { selectedTags, toggleTag, clearTags } = useTagFilterStore();

  if (allTags.length === 0) return null;

  return (
    <div className="mb-4">
      <p className="text-sm text-gray-600 mb-2 font-medium">Filter by tags:</p>
      <div className="flex flex-wrap gap-2 mb-2">
        {allTags.map((tag) => {
          const isActive = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-sm border transition-colors duration-300 ease-in-out ${
                isActive
                  ? "bg-emerald-100 text-teal-700 border-teal-400"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              }`}
            >
              {tag}
            </button>
          );
        })}
        {selectedTags.length > 0 && (
          <button
            onClick={clearTags}
            className="ml-2 text-sm text-teal-500 hover:underline"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
}
