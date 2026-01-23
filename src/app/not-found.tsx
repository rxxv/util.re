import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Card className="mx-auto mt-16 max-w-xl p-8 text-center">
      <h1 className="text-2xl font-semibold text-[var(--text)]">
        Page not found
      </h1>
      <p className="mt-2 text-[var(--muted)]">
        The tool you are looking for does not exist yet.
      </p>
      <Link href="/" className="mt-6 inline-flex">
        <Button>Back to home</Button>
      </Link>
    </Card>
  );
}
