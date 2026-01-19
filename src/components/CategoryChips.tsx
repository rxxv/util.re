"use client";

import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type CategoryChipsProps = {
  categories: string[];
  active: string;
  onSelect: (category: string) => void;
};

export default function CategoryChips({
  categories,
  active,
  onSelect,
}: CategoryChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const isActive = category === active;
        return (
          <Button
            key={category}
            type="button"
            size="sm"
            variant={isActive ? "solid" : "outline"}
            className={cn(
              isActive
                ? "bg-[#e3ebdf] text-[var(--accent-green)] border-[var(--border-strong)]"
                : ""
            )}
            onClick={() => onSelect(category)}
          >
            {category}
          </Button>
        );
      })}
    </div>
  );
}
