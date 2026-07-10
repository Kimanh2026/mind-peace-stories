/**
 * Brand marks.
 * The seven-dot rising arc is the site's signature element: seven days,
 * seven small steps, rising gently. It appears in the logo, section
 * dividers and the hero.
 */

export function SevenDotArc({
  className = "",
  dot = 4,
  tone = "mixed",
}: {
  className?: string;
  dot?: number;
  tone?: "mixed" | "paper" | "forest";
}) {
  // Seven dots along a gentle rising arc inside a 160x48 box.
  const points = [
    [10, 40],
    [33, 36],
    [56, 31],
    [79, 25],
    [102, 19],
    [125, 13],
    [148, 8],
  ];
  const fill = (i: number) => {
    if (tone === "paper") return "#FBF8F2";
    if (tone === "forest") return "#1E3A2C";
    return i === 6 ? "#C2A14D" : "#1E3A2C";
  };
  return (
    <svg
      viewBox="0 0 160 48"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={dot} fill={fill(i)} opacity={tone === "mixed" && i < 6 ? 0.35 + i * 0.11 : 1} />
      ))}
    </svg>
  );
}

export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <circle cx="24" cy="24" r="23" fill="#1E3A2C" />
      {/* rising arc of dots */}
      {[
        [12, 32, 2.2],
        [17, 29.5, 2.4],
        [22, 26.5, 2.6],
        [27, 23, 2.8],
        [32, 19, 3.0],
      ].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#FBF8F2" opacity={0.55 + i * 0.1} />
      ))}
      <circle cx="37" cy="14.5" r="3.4" fill="#C2A14D" />
    </svg>
  );
}
