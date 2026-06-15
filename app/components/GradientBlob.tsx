type GradientBlobProps = {
  /** Tailwind position/size classes, e.g. "top-0 -left-24 h-96 w-96". */
  className?: string;
  /** CSS gradient string for the blob fill. */
  gradient: string;
  /** Subtle vertical float animation. */
  float?: boolean;
};

// Soft, blurred background decoration. aria-hidden — purely visual.
export default function GradientBlob({
  className,
  gradient,
  float = false,
}: GradientBlobProps) {
  return (
    <div
      aria-hidden
      className={`hx-blob ${float ? "hx-float" : ""} ${className ?? ""}`}
      style={{ background: gradient }}
    />
  );
}
