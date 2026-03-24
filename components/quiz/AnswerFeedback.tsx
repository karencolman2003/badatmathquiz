import type { Attempt } from "@/lib/types";
import { Card } from "@/components/ui/Card";

interface AnswerFeedbackProps {
  attempt: Attempt;
}

export function AnswerFeedback({ attempt }: AnswerFeedbackProps) {
  return (
    <Card className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`border px-3 py-1 text-[11px] lowercase tracking-[0.08em] ${
            attempt.isCorrect
              ? "border-[#d8d5ce] text-[#1a1a18]"
              : "border-[#1a1a18] bg-[#1a1a18] text-[#f7f5f0]"
          }`}
        >
          {attempt.isCorrect ? "Correct" : "Caught by the trap"}
        </span>
        <span className="border border-[#d8d5ce] px-3 py-1 text-[11px] lowercase tracking-[0.08em] text-[#888880]">
          {attempt.trapType.replaceAll("_", " ")}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="border border-[#d8d5ce] p-4">
          <p className="text-[11px] lowercase tracking-[0.08em] text-[#888880]">correct answer</p>
          <p className="mt-2 font-serif text-[24px] font-normal text-[#1a1a18]">{attempt.correctAnswer}</p>
        </div>
        <div className="border border-[#d8d5ce] p-4">
          <p className="text-[11px] lowercase tracking-[0.08em] text-[#888880]">common wrong answer</p>
          <p className="mt-2 font-serif text-[24px] font-normal text-[#1a1a18]">{attempt.commonWrongAnswer}</p>
        </div>
      </div>

      <div className="border border-[#d8d5ce] p-4">
        <p className="text-[11px] lowercase tracking-[0.08em] text-[#888880]">explanation</p>
        <p className="mt-2 text-[12px] leading-7 text-[#1a1a18]">{attempt.explanation}</p>
      </div>
    </Card>
  );
}
