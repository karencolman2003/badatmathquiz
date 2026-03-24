"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button, getButtonClassName } from "@/components/ui/Button";
import { formatDuration, getAccuracy, getAverageResponseTime, getConfidenceSummary, getTrapBreakdown } from "@/lib/quiz";
import type { Attempt } from "@/lib/types";

interface ResultsDashboardProps {
  attempts: Attempt[];
  onRestart: () => void;
}

export function ResultsDashboard({ attempts, onRestart }: ResultsDashboardProps) {
  const score = attempts.filter((attempt) => attempt.isCorrect).length;
  const averageTime = getAverageResponseTime(attempts);
  const trapBreakdown = getTrapBreakdown(attempts);
  const confidenceSummary = getConfidenceSummary(attempts);
  const missedQuestions = attempts.filter((attempt) => !attempt.isCorrect);

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4">
            <p className="text-[11px] lowercase tracking-[0.08em] text-[#888880]">
              final dashboard
            </p>
            <h1 className="font-serif text-[32px] font-normal leading-tight text-[#1a1a18] md:text-[42px]">You versus trick questions</h1>
            <p className="max-w-2xl text-[12px] leading-7 text-[#888880] md:text-[13px]">
              This score is less about arithmetic and more about whether you slowed down, read carefully, and resisted the obvious answer.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-[#d8d5ce] p-4">
              <p className="text-[11px] lowercase tracking-[0.08em] text-[#888880]">score</p>
              <p className="mt-2 font-serif text-[28px] font-normal text-[#1a1a18]">
                {score}/{attempts.length}
              </p>
            </div>
            <div className="border border-[#d8d5ce] p-4">
              <p className="text-[11px] lowercase tracking-[0.08em] text-[#888880]">accuracy</p>
              <p className="mt-2 font-serif text-[28px] font-normal text-[#1a1a18]">{Math.round(getAccuracy(attempts))}%</p>
            </div>
            <div className="border border-[#d8d5ce] p-4">
              <p className="text-[11px] lowercase tracking-[0.08em] text-[#888880]">avg time</p>
              <p className="mt-2 font-serif text-[28px] font-normal text-[#1a1a18]">{formatDuration(averageTime)}</p>
            </div>
            <div className="border border-[#d8d5ce] p-4">
              <p className="text-[11px] lowercase tracking-[0.08em] text-[#888880]">overconfident misses</p>
              <p className="mt-2 font-serif text-[28px] font-normal text-[#1a1a18]">{confidenceSummary.overconfidentMisses}</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="space-y-4">
          <div>
            <h2 className="font-serif text-[28px] font-normal text-[#1a1a18]">Trap type breakdown</h2>
            <p className="mt-1 text-[12px] text-[#888880]">
              Which kinds of questions caused the most trouble.
            </p>
          </div>
          <div className="space-y-3">
            {trapBreakdown.map((item) => (
              <div key={item.trapType} className="border border-[#d8d5ce] p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[12px] font-medium capitalize text-[#1a1a18]">
                    {item.trapType.replaceAll("_", " ")}
                  </p>
                  <p className="text-[11px] text-[#888880]">
                    Missed {item.missed} of {item.total}
                  </p>
                </div>
                <div className="mt-3 h-px bg-[#d8d5ce]">
                  <div
                    className="h-px bg-[#1a1a18]"
                    style={{ width: `${item.total === 0 ? 0 : (item.missed / item.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="space-y-4">
          <div>
            <h2 className="font-serif text-[28px] font-normal text-[#1a1a18]">Confidence vs correctness</h2>
            <p className="mt-1 text-[12px] text-[#888880]">
              A quick read on whether certainty matched reality.
            </p>
          </div>
          <div className="grid gap-3">
            <div className="border border-[#d8d5ce] p-4">
              <p className="text-[11px] text-[#888880]">high confidence accuracy</p>
              <p className="mt-2 font-serif text-[26px] font-normal text-[#1a1a18]">
                {Math.round(confidenceSummary.highConfidenceAccuracy)}%
              </p>
            </div>
            <div className="border border-[#d8d5ce] p-4">
              <p className="text-[11px] text-[#888880]">low confidence accuracy</p>
              <p className="mt-2 font-serif text-[26px] font-normal text-[#1a1a18]">
                {Math.round(confidenceSummary.lowConfidenceAccuracy)}%
              </p>
            </div>
            <div className="border border-[#d8d5ce] p-4">
              <p className="text-[11px] text-[#888880]">takeaway</p>
              <p className="mt-2 text-[12px] leading-7 text-[#1a1a18]">
                {confidenceSummary.overconfidentMisses > 0
                  ? "The main pattern was answering quickly with high confidence on trick questions."
                  : "Confidence stayed pretty well calibrated across the quiz."}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-[28px] font-normal text-[#1a1a18]">Missed question review</h2>
            <p className="mt-1 text-[12px] text-[#888880]">
              Review the traps you fell for so the pattern is visible.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={onRestart}>
              restart quiz
            </Button>
            <Link href="/" className={getButtonClassName("ghost")}>
              back home
            </Link>
          </div>
        </div>

        {missedQuestions.length === 0 ? (
          <div className="border border-[#d8d5ce] p-5 text-[12px] text-[#1a1a18]">
            No missed questions. Either you were careful, lucky, or suspicious in exactly the right ways.
          </div>
        ) : (
          <div className="space-y-3">
            {missedQuestions.map((attempt) => (
              <div key={attempt.questionId} className="border border-[#d8d5ce] p-5">
                <p className="font-serif text-[24px] font-normal leading-tight text-[#1a1a18]">{attempt.prompt}</p>
                <div className="mt-3 grid gap-2 text-[12px] text-[#888880] md:grid-cols-2">
                  <p>Your answer: <span className="text-[#1a1a18]">{attempt.answer || "No answer"}</span></p>
                  <p>Correct answer: <span className="text-[#1a1a18]">{attempt.correctAnswer}</span></p>
                  <p>Trap type: <span className="text-[#1a1a18]">{attempt.trapType.replaceAll("_", " ")}</span></p>
                  <p>Confidence: <span className="text-[#1a1a18]">{attempt.confidence}/5</span></p>
                </div>
                <p className="mt-3 text-[12px] leading-7 text-[#1a1a18]">{attempt.explanation}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
