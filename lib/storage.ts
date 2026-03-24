import type { QuizState } from "@/lib/types";

export const QUIZ_STORAGE_KEY = "bad-at-math-quiz-state";

export function loadQuizState(): QuizState | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(QUIZ_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as QuizState;
  } catch {
    return null;
  }
}

export function saveQuizState(state: QuizState): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(state));
}

export function clearQuizState(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(QUIZ_STORAGE_KEY);
}
