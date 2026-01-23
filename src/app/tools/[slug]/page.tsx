import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { toolComponents } from "@/components/tools/registry";
import { getToolBySlug, getToolsBySlugs, tools } from "@/data/tools";
import { siteConfig, siteUrl } from "@/lib/site";
import ToolHeader from "@/components/ToolHeader";
import ToolShellLayout from "@/components/ToolShellLayout";
import StepsList from "@/components/StepsList";
import FAQAccordion from "@/components/FAQAccordion";
import RelatedToolsGrid from "@/components/RelatedToolsGrid";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

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

  const base = new URL(siteUrl);
  const url = new URL(`/tools/${tool.slug}`, base).toString();
  const ogImage = new URL(`/tools/${tool.slug}/opengraph-image`, base).toString();

  return {
    title: tool.title,
    description: tool.description,
    keywords: tool.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: tool.title,
      description: tool.description,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${tool.title} — ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.title,
      description: tool.description,
      images: [ogImage],
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
    url: new URL(`/tools/${tool.slug}`, siteUrl).toString(),
  };

  return (
    <div className="space-y-12 pb-16">
      <Section className="pt-10">
        <Container className="space-y-8">
          <ToolHeader tool={tool} />
          <ToolShellLayout tool={tool}>
            <ToolComponent />
          </ToolShellLayout>
        </Container>
      </Section>

      <Section>
        <Container className="space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--text)]">
            How it works
          </h2>
          <StepsList steps={tool.howItWorks} />
        </Container>
      </Section>

      <Section>
        <Container className="space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--text)]">FAQ</h2>
          <FAQAccordion items={tool.faq} />
        </Container>
      </Section>

      <Section>
        <Container className="space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--text)]">
            Related tools
          </h2>
          <RelatedToolsGrid tools={relatedTools} />
        </Container>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
