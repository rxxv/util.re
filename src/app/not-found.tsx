import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Card className="mx-auto max-w-xl p-8 text-center">
      <h1 className="text-2xl font-semibold text-[var(--color-ink)]">Page not found</h1>
      <p className="mt-2 text-[var(--color-muted-text)]">
        The tool you are looking for does not exist yet.
      </p>
      <Link href="/" className="mt-6 inline-flex">
        <Button>Back to home</Button>
      </Link>
    </Card>
  );
}
