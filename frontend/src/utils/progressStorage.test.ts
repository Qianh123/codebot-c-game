import { afterEach, describe, expect, it } from "vitest";
import {
  clearProgress,
  getProgressForLevel,
  getProgressRecords,
  updateProgressAfterSubmit
} from "./progressStorage";

afterEach(() => {
  localStorage.clear();
});

describe("progressStorage", () => {
  it("saves progress for a level", () => {
    updateProgressAfterSubmit({
      levelId: "level-001",
      passed: true,
      score: 100,
      code: "int main(){return 0;}",
      submittedAt: "2026-06-21T10:00:00.000Z"
    });

    expect(getProgressRecords()).toEqual([
      {
        levelId: "level-001",
        passed: true,
        bestScore: 100,
        submitCount: 1,
        lastSubmittedAt: "2026-06-21T10:00:00.000Z",
        lastCode: "int main(){return 0;}"
      }
    ]);
  });

  it("keeps the highest score", () => {
    updateProgressAfterSubmit({
      levelId: "level-003",
      passed: false,
      score: 80,
      code: "score 80",
      submittedAt: "2026-06-21T10:00:00.000Z"
    });
    updateProgressAfterSubmit({
      levelId: "level-003",
      passed: false,
      score: 60,
      code: "score 60",
      submittedAt: "2026-06-21T10:01:00.000Z"
    });

    expect(getProgressForLevel("level-003")?.bestScore).toBe(80);
    expect(getProgressForLevel("level-003")?.lastCode).toBe("score 60");
  });

  it("records submit count", () => {
    updateProgressAfterSubmit({
      levelId: "level-003",
      passed: false,
      score: 50,
      code: "first",
      submittedAt: "2026-06-21T10:00:00.000Z"
    });
    updateProgressAfterSubmit({
      levelId: "level-003",
      passed: true,
      score: 100,
      code: "second",
      submittedAt: "2026-06-21T10:01:00.000Z"
    });

    expect(getProgressForLevel("level-003")).toMatchObject({
      passed: true,
      bestScore: 100,
      submitCount: 2
    });
  });

  it("clears saved progress", () => {
    updateProgressAfterSubmit({
      levelId: "level-001",
      passed: true,
      score: 100,
      code: "done"
    });

    expect(clearProgress()).toEqual([]);
    expect(getProgressRecords()).toEqual([]);
  });
});

