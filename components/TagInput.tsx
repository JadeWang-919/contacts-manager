"use client";

import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  maxTags?: number;
}

export default function TagInput({
  value,
  onChange,
  maxTags = 5,
}: TagInputProps) {
  const [tagInput, setTagInput] = useState("");
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    async function fetchTags() {
      try {
        const res = await fetch("/api/tags");
        if (!res.ok) throw new Error("Failed to fetch tags");
        const data = await res.json();
        setAllTags(data);
      } catch (err) {
        console.error("Error loading suggested tags:", err);
      }
    }

    fetchTags();
  }, []);

  const addTag = (tag: string) => {
    const newTag = tag.trim();
    if (newTag && !value.includes(newTag) && value.length < maxTags) {
      onChange([...value, newTag]);
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className="w-full space-y-2">
      {/* Tag counter */}
      <div className="text-sm text-gray-500">
        {value.length}/{maxTags} tags
      </div>

      {/* Selected tags */}
      <div className="flex flex-wrap gap-2 max-w-full">
        {value.map((tag) => (
          <span
            key={tag}
            className="bg-emerald-100 text-teal-700 text-base px-3 py-1 rounded-full flex items-center"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1 text-teal-600 hover:text-teal-800 transition duration-200 ease-in-out"
            >
              <IoCloseOutline />
            </button>
          </span>
        ))}
      </div>

      {/* Tag input */}
      <input
        type="text"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addTag(tagInput);
          }
        }}
        placeholder="Type and press Enter to add tag"
        className="w-full border border-gray-400 p-2 rounded text-sm text-gray-500"
      />

      {/* Suggested tags */}
      {allTags.length > 0 && (
        <div className="text-sm text-gray-500">
          <p className="my-2">Suggestions:</p>
          <div className="flex flex-wrap gap-2 max-w-full overflow-x-auto">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => addTag(tag)}
                disabled={value.includes(tag)}
                type="button"
                className="px-3 py-1 border text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-500 rounded hover:bg-gray-100 dark:hover:bg-zinc-700 text-base disabled:opacity-50"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
