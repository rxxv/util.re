"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";

export default function HeaderSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState("");

  useEffect(() => {
    const query = searchParams.get("q") ?? "";
    setValue(query);
  }, [searchParams]);

  return (
    <form
      className="hidden lg:block"
      onSubmit={(event) => {
        event.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
          params.set("q", value);
        } else {
          params.delete("q");
        }
        router.push(`/?${params.toString()}`);
      }}
    >
      <Input
        type="search"
        placeholder="Search tools"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="w-72"
        aria-label="Search tools"
      />
    </form>
  );
}
