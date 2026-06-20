import type { RunCStatus } from "../services/cRunner.js";

export type JudgeErrorType =
  | "compile_error"
  | "timeout"
  | "runtime_error"
  | "wrong_answer"
  | "level_not_found"
  | "invalid_request";

export type JudgeTestResult = {
  name: string;
  hidden: boolean;
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  status: RunCStatus;
};

export type JudgeResponse = {
  passed: boolean;
  score: number;
  errorType: JudgeErrorType | null;
  message: string;
  results: JudgeTestResult[];
  stderr?: string;
};
