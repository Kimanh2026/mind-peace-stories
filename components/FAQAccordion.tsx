"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <div className="divide-y divide-forest/10 rounded-xl2 border border-forest/10 bg-white/70 shadow-soft">
      {items.map((item, i) => {
        const open = openIdx === i;
        return (
          <div key={i}>
            <button
              type="button"
              className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7"
              aria-expanded={open}
              aria-controls={`faq-panel-${i}`}
              id={`faq-button-${i}`}
              onClick={() => setOpenIdx(open ? null : i)}
            >
              <span className="font-display text-base font-medium text-forest sm:text-lg">{item.q}</span>
              <motion.span
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: reduce ? 0 : 0.2 }}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-forest/20 text-forest"
                aria-hidden
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M8 2v12M2 8h12" />
                </svg>
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-6 text-sm leading-relaxed text-charcoal/80 sm:px-7 sm:text-base">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
