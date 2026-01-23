type StepsListProps = {
  steps: string[];
};

export default function StepsList({ steps }: StepsListProps) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2">
      {steps.map((step, index) => (
        <li
          key={step}
          className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-sm)]"
        >
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
            Step {index + 1}
          </div>
          <p className="mt-2 text-sm text-[var(--text)]">{step}</p>
        </li>
      ))}
    </ol>
  );
}
