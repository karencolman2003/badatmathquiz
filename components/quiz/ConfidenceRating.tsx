import type { ConfidenceLevel } from "@/lib/types";

interface ConfidenceRatingProps {
  value: ConfidenceLevel | null;
  onChange: (value: ConfidenceLevel) => void;
}

const labels: Record<ConfidenceLevel, string> = {
  1: "Guessing",
  2: "Unsure",
  3: "Maybe",
  4: "Pretty sure",
  5: "Certain",
};

export function ConfidenceRating({ value, onChange }: ConfidenceRatingProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[11px] lowercase tracking-[0.08em] text-[#888880]">confidence</p>
        <p className="text-[11px] text-[#888880]">{value ? labels[value] : "pick 1-5"}</p>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((level) => {
          const typedLevel = level as ConfidenceLevel;
          const active = typedLevel === value;

          return (
            <button
              key={level}
              type="button"
              onClick={() => onChange(typedLevel)}
            className={`border px-3 py-3 text-[12px] font-medium transition ${
              active
                ? "border-[#1a1a18] bg-[#1a1a18] text-[#f7f5f0]"
                : "border-[#d8d5ce] bg-transparent text-[#1a1a18] hover:border-[#1a1a18]"
            }`}
          >
            {level}
            </button>
          );
        })}
      </div>
    </div>
  );
}
