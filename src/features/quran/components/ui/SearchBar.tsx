"use client";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
}

/**
 * SearchBar component
 * Reusable search input with clear button and search icon
 */
export function SearchBar({
  value,
  onChange,
  onSearch,
  onClear,
  placeholder = "بحث...",
  className = "",
}: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    onChange("");
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className={`rounded-lg border overflow-hidden ${className}`}>
      <div className="relative">
        <Input
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="border-0 pr-10 h-12 focus-visible:ring-0 text-right"
        />
        <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 h-8 w-8 -translate-y-1/2"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
