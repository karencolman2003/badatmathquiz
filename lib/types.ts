export const trapTypes = [
  "assumption",
  "language",
  "order_of_operations",
  "units",
  "off_by_one",
  "visual",
  "underdetermined",
  "real_world",
  "definition",
  "impulsivity",
] as const;

export type TrapType = (typeof trapTypes)[number];
export type ConfidenceLevel = 1 | 2 | 3 | 4 | 5;

interface QuestionBase {
  id: string;
  prompt: string;
  trapType: TrapType;
  explanation: string;
  commonWrongAnswer: string;
  correctAnswerText: string;
}

export interface MultipleChoiceQuestion extends QuestionBase {
  kind: "multiple_choice";
  options: string[];
  correctAnswer: string;
}

export interface FreeResponseQuestion extends QuestionBase {
  kind: "free_response";
  acceptedAnswers: string[];
  placeholder?: string;
}

export type Question = MultipleChoiceQuestion | FreeResponseQuestion;

export interface Attempt {
  questionId: string;
  prompt: string;
  trapType: TrapType;
  answer: string;
  correctAnswer: string;
  isCorrect: boolean;
  confidence: ConfidenceLevel;
  timeSpentMs: number;
  explanation: string;
  commonWrongAnswer: string;
}

export interface QuizState {
  currentIndex: number;
  attempts: Attempt[];
  questionStartedAt: number;
  activeAnswer: string;
  activeConfidence: ConfidenceLevel | null;
  showingFeedback: boolean;
  completedAt: number | null;
}
