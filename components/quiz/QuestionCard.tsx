import type { Question } from "@/lib/types";
import { Card } from "@/components/ui/Card";

interface QuestionCardProps {
  question: Question;
  index: number;
  total: number;
}

export function QuestionCard({ question, index, total }: QuestionCardProps) {
  return (
    <Card className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] lowercase tracking-[0.08em] text-[#888880]">
            Question {index + 1} of {total}
          </p>
          <p className="mt-2 text-[12px] text-[#888880]">
            trap type <span className="text-[#1a1a18]">{question.trapType.replaceAll("_", " ")}</span>
          </p>
        </div>
        <div className="border border-[#d8d5ce] px-3 py-2 text-[11px] text-[#888880]">
          {question.kind === "multiple_choice" ? "Multiple choice" : "Free response"}
        </div>
      </div>

      <h1 className="font-serif text-[30px] font-normal leading-tight text-[#1a1a18] md:text-[40px]">
        {question.prompt}
      </h1>
    </Card>
  );
}
