"use client";

import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";

type CopyButtonProps = {
  text: string;
  label?: string;
  size?: "sm" | "md" | "lg";
};

export default function CopyButton({ text, label = "Copy", size = "sm" }: CopyButtonProps) {
  const toast = useToast();

  const handleCopy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    toast.push("Copied!");
  };

  return (
    <Button type="button" variant="outline" size={size} onClick={handleCopy}>
      {label}
    </Button>
  );
}
