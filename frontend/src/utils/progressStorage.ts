export type ProgressRecord = {
  levelId: string;
  passed: boolean;
  bestScore: number;
  submitCount: number;
  lastSubmittedAt: string;
  lastCode?: string;
};

export type ProgressUpdateInput = {
  levelId: string;
  passed: boolean;
  score: number;
  code: string;
  submittedAt?: string;
};

const PROGRESS_STORAGE_KEY = "codebot-progress";

function readProgress(): ProgressRecord[] {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (record): record is ProgressRecord =>
        typeof record === "object" &&
        record !== null &&
        typeof record.levelId === "string" &&
        typeof record.passed === "boolean" &&
        typeof record.bestScore === "number" &&
        typeof record.submitCount === "number" &&
        typeof record.lastSubmittedAt === "string"
    );
  } catch {
    return [];
  }
}

function writeProgress(records: ProgressRecord[]): ProgressRecord[] {
  localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(records));
  return records;
}

export function getProgressRecords(): ProgressRecord[] {
  return readProgress();
}

export function getProgressForLevel(levelId: string): ProgressRecord | null {
  return readProgress().find((record) => record.levelId === levelId) ?? null;
}

export function updateProgressAfterSubmit(input: ProgressUpdateInput): ProgressRecord {
  const records = readProgress();
  const current = records.find((record) => record.levelId === input.levelId);
  const next: ProgressRecord = {
    levelId: input.levelId,
    passed: current?.passed || input.passed,
    bestScore: Math.max(current?.bestScore ?? 0, input.score),
    submitCount: (current?.submitCount ?? 0) + 1,
    lastSubmittedAt: input.submittedAt ?? new Date().toISOString(),
    lastCode: input.code
  };

  const nextRecords = current
    ? records.map((record) => (record.levelId === input.levelId ? next : record))
    : [next, ...records];

  writeProgress(nextRecords);
  return next;
}

export function clearProgress(): ProgressRecord[] {
  return writeProgress([]);
}

