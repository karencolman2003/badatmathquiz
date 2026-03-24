import { questions } from "@/lib/questions";
import type { Attempt, ConfidenceLevel, Question, QuizState, TrapType } from "@/lib/types";

export function createInitialQuizState(): QuizState {
  return {
    currentIndex: 0,
    attempts: [],
    questionStartedAt: Date.now(),
    activeAnswer: "",
    activeConfidence: null,
    showingFeedback: false,
    completedAt: null,
  };
}

export function normalizeAnswer(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function isQuestionCorrect(question: Question, answer: string): boolean {
  if (question.kind === "multiple_choice") {
    return answer === question.correctAnswer;
  }

  const normalized = normalizeAnswer(answer);
  return question.acceptedAnswers.some((accepted) => normalizeAnswer(accepted) === normalized);
}

export function createAttempt(
  question: Question,
  answer: string,
  confidence: ConfidenceLevel,
  timeSpentMs: number,
): Attempt {
  return {
    questionId: question.id,
    prompt: question.prompt,
    trapType: question.trapType,
    answer,
    correctAnswer: question.correctAnswerText,
    isCorrect: isQuestionCorrect(question, answer),
    confidence,
    timeSpentMs,
    explanation: question.explanation,
    commonWrongAnswer: question.commonWrongAnswer,
  };
}

export function getAverageResponseTime(attempts: Attempt[]): number {
  if (attempts.length === 0) {
    return 0;
  }

  const total = attempts.reduce((sum, attempt) => sum + attempt.timeSpentMs, 0);
  return total / attempts.length;
}

export function getTrapBreakdown(attempts: Attempt[]): Array<{
  trapType: TrapType;
  total: number;
  missed: number;
}> {
  return Array.from(
    attempts.reduce((map, attempt) => {
      const existing = map.get(attempt.trapType) ?? {
        trapType: attempt.trapType,
        total: 0,
        missed: 0,
      };

      existing.total += 1;
      if (!attempt.isCorrect) {
        existing.missed += 1;
      }

      map.set(attempt.trapType, existing);
      return map;
    }, new Map<TrapType, { trapType: TrapType; total: number; missed: number }>()),
  ).sort((a, b) => b[1].missed - a[1].missed || b[1].total - a[1].total)
    .map(([, value]) => value);
}

export function getConfidenceSummary(attempts: Attempt[]) {
  const highConfidence = attempts.filter((attempt) => attempt.confidence >= 4);
  const lowConfidence = attempts.filter((attempt) => attempt.confidence <= 2);

  return {
    highConfidenceAccuracy: getAccuracy(highConfidence),
    lowConfidenceAccuracy: getAccuracy(lowConfidence),
    overconfidentMisses: attempts.filter(
      (attempt) => attempt.confidence >= 4 && !attempt.isCorrect,
    ).length,
  };
}

export function getAccuracy(attempts: Attempt[]): number {
  if (attempts.length === 0) {
    return 0;
  }

  const correct = attempts.filter((attempt) => attempt.isCorrect).length;
  return (correct / attempts.length) * 100;
}

export function getCurrentQuestion(state: QuizState): Question | null {
  return questions[state.currentIndex] ?? null;
}

export function formatDuration(ms: number): string {
  const seconds = Math.round(ms / 1000);
  if (seconds < 60) {
    return `${seconds}s`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}m ${remainder}s`;
}
