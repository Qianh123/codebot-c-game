export type RunCStatus = "success" | "compile_error" | "timeout" | "runtime_error";

export type RunCResponse = {
  status: RunCStatus;
  stdout: string;
  stderr: string;
  timeMs: number;
};

export type SubmitLevelErrorType =
  | "compile_error"
  | "timeout"
  | "runtime_error"
  | "wrong_answer"
  | "level_not_found"
  | "invalid_request"
  | null;

export type SubmitLevelTestResult = {
  name: string;
  hidden: boolean;
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  status: RunCStatus;
};

export type SubmitLevelResponse = {
  passed: boolean;
  score: number;
  errorType: SubmitLevelErrorType;
  message: string;
  results: SubmitLevelTestResult[];
  stderr?: string;
};

async function postJson<T>(url: string, payload: unknown): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = (await response.json()) as T;

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return data;
}

export function runCCode(code: string, stdin: string): Promise<RunCResponse> {
  return postJson<RunCResponse>("/api/run-c", {
    code,
    stdin
  });
}

export function submitLevel(
  levelId: string,
  code: string
): Promise<SubmitLevelResponse> {
  return postJson<SubmitLevelResponse>("/api/submit-level", {
    levelId,
    code
  });
}
