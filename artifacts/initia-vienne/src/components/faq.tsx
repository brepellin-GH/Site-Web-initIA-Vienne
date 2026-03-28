import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqProps {
  items: FaqItem[];
}

export function Faq({ items }: FaqProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
            open === i
              ? "border-brand-green/40 bg-brand-green-light shadow-sm"
              : "border-border bg-white hover:border-brand-green/20"
          }`}
        >
          <button
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className={`font-semibold text-base leading-snug transition-colors ${open === i ? "text-brand-green" : "text-primary"}`}>
              {item.q}
            </span>
            <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${open === i ? "bg-brand-green text-white" : "bg-muted text-muted-foreground"}`}>
              {open === i ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            </span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <p className="px-6 pb-5 text-muted-foreground leading-relaxed">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
