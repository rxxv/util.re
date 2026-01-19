import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ToolCard from "@/components/ToolCard";
import { toolComponents } from "@/components/tools/registry";
import { getToolBySlug, getToolsBySlugs, tools } from "@/data/tools";
import { siteConfig } from "@/lib/site";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import ToolIcon from "@/components/ToolIcon";

type ToolPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) {
    return { title: "Tool not found" };
  }

  const url = `${siteConfig.url}/tools/${tool.slug}`;

  return {
    title: tool.title,
    description: tool.description,
    keywords: tool.keywords,
    openGraph: {
      title: tool.title,
      description: tool.description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.title,
      description: tool.description,
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) {
    notFound();
  }

  const ToolComponent = toolComponents[tool.slug];
  if (!ToolComponent) {
    notFound();
  }

  const relatedTools = getToolsBySlugs(tool.related);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title,
    description: tool.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    keywords: tool.keywords.join(", "),
    url: `${siteConfig.url}/tools/${tool.slug}`,
  };

  return (
    <div className="space-y-10">
      <section className="space-y-5">
        <div>
          <Link
            href="/"
            className="inline-flex rounded-lg border border-[var(--border)] bg-[var(--paper-surface)] px-3 py-2 text-xs font-medium text-[var(--accent-green)] transition hover:bg-[var(--paper-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper-bg)]"
          >
            Back to menu
          </Link>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <ToolIcon slug={tool.slug} className="h-6 w-6" />
            <Badge tone="soft">{tool.category}</Badge>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
            {tool.title}
          </h1>
          <p className="text-base text-[var(--color-muted-text)]">
            {tool.description}
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge tone="soft">Privacy-first</Badge>
            <Badge tone="soft">No tracking</Badge>
            <Badge tone="soft">Runs locally</Badge>
          </div>
        </div>
        <Card className="p-6 sm:p-8">
          <ToolComponent />
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[var(--color-ink)]">How it works</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-[var(--color-muted-text)]">
          {tool.howItWorks.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[var(--color-ink)]">FAQ</h2>
        <div className="space-y-4">
          {tool.faq.map((item) => (
            <Card key={item.question} className="p-4">
              <h3 className="text-base font-semibold text-[var(--color-ink)]">
                {item.question}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-muted-text)]">
                {item.answer}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[var(--color-ink)]">Related tools</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {relatedTools.map((related) => (
            <ToolCard key={related.slug} tool={related} />
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
