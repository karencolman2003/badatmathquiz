"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnswerFeedback } from "@/components/quiz/AnswerFeedback";
import { ConfidenceRating } from "@/components/quiz/ConfidenceRating";
import { FreeResponseInput } from "@/components/quiz/FreeResponseInput";
import { MultipleChoiceOptions } from "@/components/quiz/MultipleChoiceOptions";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { ResultsDashboard } from "@/components/quiz/ResultsDashboard";
import { Button, getButtonClassName } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { questions } from "@/lib/questions";
import { createAttempt, createInitialQuizState, formatDuration, getCurrentQuestion } from "@/lib/quiz";
import { clearQuizState, loadQuizState, saveQuizState } from "@/lib/storage";
import type { ConfidenceLevel, QuizState } from "@/lib/types";

export default function QuizPage() {
  const [state, setState] = useState<QuizState>(createInitialQuizState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const savedState = loadQuizState();
    if (savedState) {
      setState(savedState);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    saveQuizState(state);
  }, [hydrated, state]);

  const currentQuestion = getCurrentQuestion(state);
  const lastAttempt = state.attempts[state.attempts.length - 1] ?? null;
  const isComplete = state.currentIndex >= questions.length;

  const updateState = (updater: (current: QuizState) => QuizState) => {
    setState((current) => updater(current));
  };

  const handleSubmit = () => {
    if (!currentQuestion || state.showingFeedback || !state.activeConfidence || !state.activeAnswer.trim()) {
      return;
    }

    const nextAttempt = createAttempt(
      currentQuestion,
      state.activeAnswer,
      state.activeConfidence,
      Date.now() - state.questionStartedAt,
    );

    updateState((current) => ({
      ...current,
      attempts: [...current.attempts, nextAttempt],
      showingFeedback: true,
    }));
  };

  const handleNext = () => {
    updateState((current) => {
      const nextIndex = current.currentIndex + 1;
      return {
        ...current,
        currentIndex: nextIndex,
        activeAnswer: "",
        activeConfidence: null,
        showingFeedback: false,
        questionStartedAt: Date.now(),
        completedAt: nextIndex >= questions.length ? Date.now() : null,
      };
    });
  };

  const handleRestart = () => {
    clearQuizState();
    setState(createInitialQuizState());
  };

  if (!hydrated) {
    return (
      <main className="mx-auto flex min-h-screen max-w-[620px] items-center justify-center px-6 py-16">
        <Card className="w-full max-w-xl text-center">
          <p className="text-[13px] text-[#1a1a18]">Loading your quiz state...</p>
        </Card>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-[720px] px-6 py-12 md:px-8 md:py-16">
      {isComplete ? (
        <ResultsDashboard attempts={state.attempts} onRestart={handleRestart} />
      ) : currentQuestion ? (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className={getButtonClassName("ghost")}>
              Back home
            </Link>
            <div className="text-[11px] text-[#888880]">
              Average pace so far: {formatDuration(
                state.attempts.length === 0
                  ? 0
                  : state.attempts.reduce((sum, attempt) => sum + attempt.timeSpentMs, 0) /
                      state.attempts.length,
              )}
            </div>
          </div>

          <QuestionCard
            question={currentQuestion}
            index={state.currentIndex}
            total={questions.length}
          />

          <Card className="space-y-5">
            {currentQuestion.kind === "multiple_choice" ? (
              <MultipleChoiceOptions
                options={currentQuestion.options}
                value={state.activeAnswer}
                disabled={state.showingFeedback}
                onChange={(value) => updateState((current) => ({ ...current, activeAnswer: value }))}
              />
            ) : (
              <FreeResponseInput
                value={state.activeAnswer}
                disabled={state.showingFeedback}
                placeholder={currentQuestion.placeholder}
                onChange={(value) => updateState((current) => ({ ...current, activeAnswer: value }))}
              />
            )}

            <ConfidenceRating
              value={state.activeConfidence}
              onChange={(value: ConfidenceLevel) =>
                updateState((current) => ({ ...current, activeConfidence: value }))
              }
            />

            {!state.showingFeedback ? (
              <Button
                className="w-full sm:w-auto"
                onClick={handleSubmit}
                disabled={!state.activeConfidence || !state.activeAnswer.trim()}
              >
                submit answer
              </Button>
            ) : null}
          </Card>

          {state.showingFeedback && lastAttempt ? (
            <div className="space-y-4">
              <AnswerFeedback attempt={lastAttempt} />
              <div className="flex justify-end">
                <Button onClick={handleNext}>
                  {state.currentIndex === questions.length - 1 ? "see results" : "next question"}
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mx-auto flex min-h-screen max-w-[620px] items-center justify-center px-6 py-16">
          <Card className="w-full max-w-xl space-y-4 text-center">
            <p className="text-[13px] text-[#1a1a18]">The quiz could not be loaded.</p>
            <div className="flex justify-center gap-3">
              <Button onClick={handleRestart}>reset quiz</Button>
              <Link href="/" className={getButtonClassName("ghost")}>
                back home
              </Link>
            </div>
          </Card>
        </div>
      )}
    </main>
  );
}
