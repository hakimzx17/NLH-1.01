import type { QuizQuestion, QuizState } from '../content/types';

// ---------------------------------------------------------------------------
// Shuffling utilities
// ---------------------------------------------------------------------------

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

// ---------------------------------------------------------------------------
// Question randomization
// ---------------------------------------------------------------------------

export function randomizeQuestions(questions: QuizQuestion[]): QuizQuestion[] {
  return shuffleArray(questions);
}

export function randomizeOptions(question: QuizQuestion): QuizQuestion {
  if (!question.options || question.options.length === 0) {
    return question;
  }

  const shuffledOptions = shuffleArray(question.options);

  // For single-mcq, correct is a single id string
  // For multi-mcq, correct is an array of id strings
  // We keep the correct answer IDs the same — only the display order changes
  return {
    ...question,
    options: shuffledOptions,
    // correct stays the same — it references option IDs, not indices
  };
}

// ---------------------------------------------------------------------------
// Quiz state initialization
// ---------------------------------------------------------------------------

export function initQuizState(questions: QuizQuestion[]): QuizState {
  const randomized = randomizeQuestions(questions).map(randomizeOptions);

  return {
    questions: randomized,
    currentIndex: 0,
    answers: {},
    startTime: Date.now(),
    elapsedSeconds: 0,
    isSubmitted: false,
    isComplete: false,
  };
}

// ---------------------------------------------------------------------------
// Answer tracking
// ---------------------------------------------------------------------------

export function recordAnswer(
  state: QuizState,
  questionId: string,
  answer: string | string[],
): QuizState {
  return {
    ...state,
    answers: {
      ...state.answers,
      [questionId]: answer,
    },
  };
}

export function advanceQuestion(state: QuizState): QuizState {
  const nextIndex = Math.min(state.currentIndex + 1, state.questions.length - 1);

  return {
    ...state,
    currentIndex: nextIndex,
  };
}

// ---------------------------------------------------------------------------
// Submission and scoring
// ---------------------------------------------------------------------------

function scoreQuestion(question: QuizQuestion, answer: string | string[]): boolean {
  if (question.type === 'fill-blank') {
    const userAnswer = typeof answer === 'string' ? answer.trim().toLowerCase() : '';
    const correctAnswer = typeof question.correct === 'string' ? question.correct.trim().toLowerCase() : '';

    return userAnswer === correctAnswer;
  }

  if (question.type === 'multi-mcq') {
    const userAnswers = Array.isArray(answer) ? answer : [];
    const correctAnswers = Array.isArray(question.correct) ? question.correct : [];

    if (userAnswers.length !== correctAnswers.length) {
      return false;
    }

    const userSet = new Set(userAnswers);
    const correctSet = new Set(correctAnswers);

    for (const id of userSet) {
      if (!correctSet.has(id)) {
        return false;
      }
    }

    return true;
  }

  // single-mcq and true-false
  return answer === question.correct;
}

export function submitQuiz(state: QuizState): {
  score: number;
  total: number;
  passed: boolean;
  passThreshold: number;
  missedQuestionIds: string[];
  results: { questionId: string; isCorrect: boolean }[];
} {
  const passThreshold = 80;
  let correctCount = 0;
  const missedQuestionIds: string[] = [];
  const results: { questionId: string; isCorrect: boolean }[] = [];

  for (const question of state.questions) {
    const answer = state.answers[question.id];
    const isCorrect = answer !== undefined && scoreQuestion(question, answer);

    if (isCorrect) {
      correctCount++;
    } else {
      missedQuestionIds.push(question.id);
    }

    results.push({ questionId: question.id, isCorrect });
  }

  const total = state.questions.length;
  const score = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const passed = score >= passThreshold;

  return {
    score,
    total,
    passed,
    passThreshold,
    missedQuestionIds,
    results,
  };
}

// ---------------------------------------------------------------------------
// Timer
// ---------------------------------------------------------------------------

export function getElapsedSeconds(startTime: number): number {
  return Math.floor((Date.now() - startTime) / 1000);
}

export function formatElapsedTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
