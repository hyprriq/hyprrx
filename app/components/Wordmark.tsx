export default function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`font-display font-bold tracking-tight ${className ?? ""}`}>
      Hyprr<span className="text-accent">X</span>
    </span>
  );
}
