"use client";

import type { ChangeEvent } from "react";
import Input from "@/components/ui/Input";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({
  value,
  onChange,
  placeholder,
}: SearchBarProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="w-full">
      <label htmlFor="tool-search" className="sr-only">
        Search tools
      </label>
      <Input
        id="tool-search"
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder || "Search tools"}
      />
    </div>
  );
}
