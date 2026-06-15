export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
      {children}
    </p>
  );
}
