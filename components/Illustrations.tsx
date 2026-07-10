/**
 * Stylized vector illustrations in a soft, warm, family-centred style.
 * Rounded forms, gentle gradients, no hard outlines — inspired by soft
 * anime background art, rendered as lightweight inline SVG.
 */

export function HeroScene({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 480" className={className} role="img" aria-label="A parent and child reading together under a tree at dusk">
      <defs>
        <radialGradient id="sky" cx="50%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#F6EED9" />
          <stop offset="55%" stopColor="#EDE7D4" />
          <stop offset="100%" stopColor="#DCE3D2" />
        </radialGradient>
        <linearGradient id="hill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B7C9AE" />
          <stop offset="100%" stopColor="#8FA98C" />
        </linearGradient>
        <linearGradient id="hill2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5F7D5F" />
          <stop offset="100%" stopColor="#3E5A44" />
        </linearGradient>
        <linearGradient id="canopy" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4E7154" />
          <stop offset="100%" stopColor="#2C4736" />
        </linearGradient>
        <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E9C87A" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#E9C87A" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* sky */}
      <rect x="0" y="0" width="560" height="480" rx="28" fill="url(#sky)" />
      {/* sun */}
      <circle cx="415" cy="120" r="46" fill="#E9C87A" opacity="0.85" />
      <circle cx="415" cy="120" r="70" fill="url(#glow)" opacity="0.5" />
      {/* distant hills */}
      <path d="M0 320 Q 120 260 260 305 T 560 290 V480 H0 Z" fill="url(#hill)" opacity="0.8" />
      <path d="M0 370 Q 160 320 320 360 T 560 350 V480 H0 Z" fill="url(#hill2)" />

      {/* tree */}
      <path d="M118 372 C 116 320 112 280 120 236" stroke="#4A3B2A" strokeWidth="16" strokeLinecap="round" fill="none" />
      <path d="M120 250 C 150 240 168 220 176 198" stroke="#4A3B2A" strokeWidth="10" strokeLinecap="round" fill="none" />
      <ellipse cx="150" cy="170" rx="118" ry="86" fill="url(#canopy)" />
      <ellipse cx="82" cy="200" rx="62" ry="46" fill="#43684C" />
      <ellipse cx="218" cy="196" rx="66" ry="48" fill="#54785A" />
      {/* golden leaves */}
      <circle cx="236" cy="150" r="5" fill="#E9C87A" />
      <circle cx="196" cy="120" r="4" fill="#E9C87A" opacity="0.85" />
      <circle cx="256" cy="196" r="3.5" fill="#E9C87A" opacity="0.7" />

      {/* blanket */}
      <ellipse cx="330" cy="420" rx="150" ry="34" fill="#F3E9D2" opacity="0.9" />

      {/* parent (seated, holding book) */}
      <g>
        <path d="M282 420 C 276 372 284 340 306 330 C 330 320 348 336 352 366 C 356 396 350 416 340 422 Z" fill="#33513E" />
        <circle cx="312" cy="312" r="24" fill="#F0C9A6" />
        <path d="M290 306 C 292 288 306 280 318 282 C 332 284 338 296 336 306 C 326 296 304 296 290 306 Z" fill="#3B3A36" />
        {/* arm */}
        <path d="M330 356 C 348 362 364 372 372 384" stroke="#33513E" strokeWidth="16" strokeLinecap="round" fill="none" />
      </g>

      {/* child (leaning on parent) */}
      <g>
        <path d="M356 424 C 354 394 362 376 378 372 C 394 368 404 380 406 400 C 408 414 404 422 398 424 Z" fill="#C2A14D" />
        <circle cx="384" cy="358" r="18" fill="#F4D4B4" />
        <path d="M368 354 C 370 342 380 336 388 338 C 398 340 402 348 400 354 C 392 346 376 347 368 354 Z" fill="#4A4640" />
      </g>

      {/* shared book */}
      <g>
        <path d="M352 392 L 384 384 L 384 402 L 352 410 Z" fill="#FBF8F2" />
        <path d="M384 384 L 416 392 L 416 410 L 384 402 Z" fill="#EFE7D2" />
        <path d="M384 384 L 384 402" stroke="#C2A14D" strokeWidth="2" />
      </g>

      {/* fireflies / rising dots — echo of the seven-dot arc */}
      {[
        [452, 300, 3, 0.5],
        [468, 276, 3.5, 0.65],
        [486, 250, 4, 0.75],
        [506, 222, 4.5, 0.9],
      ].map(([x, y, r, o], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#C2A14D" opacity={o} />
      ))}
    </svg>
  );
}

export function LanternScene({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" className={className} role="img" aria-label="A softly glowing lantern beside a stack of books">
      <defs>
        <linearGradient id="lbg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#20402F" />
          <stop offset="100%" stopColor="#14291F" />
        </linearGradient>
        <radialGradient id="lglow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#E9C87A" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#E9C87A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" rx="24" fill="url(#lbg)" />
      <circle cx="200" cy="140" r="110" fill="url(#lglow)" />
      {/* lantern */}
      <rect x="178" y="88" width="44" height="10" rx="5" fill="#C2A14D" />
      <path d="M172 98 h56 l8 84 a36 20 0 0 1 -72 0 Z" fill="#F3E4BC" />
      <path d="M172 98 h56 l8 84 a36 20 0 0 1 -72 0 Z" fill="none" stroke="#C2A14D" strokeWidth="3" />
      <line x1="200" y1="98" x2="200" y2="198" stroke="#C2A14D" strokeWidth="2" opacity="0.6" />
      <ellipse cx="200" cy="152" rx="12" ry="16" fill="#E9A94D" />
      {/* books */}
      <rect x="94" y="212" width="88" height="14" rx="4" fill="#3E5A44" />
      <rect x="102" y="198" width="72" height="14" rx="4" fill="#C2A14D" />
      <rect x="230" y="206" width="80" height="20" rx="4" fill="#54785A" />
      {/* ground line */}
      <rect x="60" y="226" width="280" height="4" rx="2" fill="#0E1E16" />
    </svg>
  );
}
