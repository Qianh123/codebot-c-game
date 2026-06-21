export const MISTAKES_STORAGE_KEY = "codebot-mistakes";

export type MistakeRecord = {
  id: string;
  levelId: string;
  levelTitle: string;
  knowledgePoint: string;
  code: string;
  errorType: string;
  message: string;
  diagnosis: string;
  score: number;
  time: string;
};

function canUseLocalStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getMistakes(): MistakeRecord[] {
  if (!canUseLocalStorage()) {
    return [];
  }

  const rawValue = window.localStorage.getItem(MISTAKES_STORAGE_KEY);

  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue) as unknown;

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((record): record is MistakeRecord => {
      return (
        typeof record === "object" &&
        record !== null &&
        "id" in record &&
        "levelId" in record &&
        "code" in record
      );
    });
  } catch {
    return [];
  }
}

export function saveMistake(record: MistakeRecord): MistakeRecord[] {
  const nextRecords = [record, ...getMistakes()].slice(0, 50);

  if (canUseLocalStorage()) {
    window.localStorage.setItem(MISTAKES_STORAGE_KEY, JSON.stringify(nextRecords));
  }

  return nextRecords;
}

export function deleteMistake(id: string): MistakeRecord[] {
  const nextRecords = getMistakes().filter((record) => record.id !== id);

  if (canUseLocalStorage()) {
    window.localStorage.setItem(MISTAKES_STORAGE_KEY, JSON.stringify(nextRecords));
  }

  return nextRecords;
}

export function clearMistakes(): MistakeRecord[] {
  if (canUseLocalStorage()) {
    window.localStorage.setItem(MISTAKES_STORAGE_KEY, "[]");
  }

  return [];
}
