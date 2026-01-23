type FaqItem = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  items: FaqItem[];
};

export default function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-sm)]"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">
            {item.question}
            <span className="text-[var(--muted)] transition group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 text-sm text-[var(--muted)]">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
