import { writeFile } from "node:fs/promises";
import path from "node:path";
import { safeExec } from "../utils/safeExec.js";
import { cleanupTempDir, createTempDir } from "../utils/tempDir.js";

export type RunCStatus =
  | "success"
  | "compile_error"
  | "timeout"
  | "runtime_error";

export type RunCRequest = {
  code: string;
  stdin?: string;
};

export type RunCResult = {
  status: RunCStatus;
  stdout: string;
  stderr: string;
  timeMs: number;
};

const COMPILE_TIMEOUT_MS = 5000;
const RUN_TIMEOUT_MS = 2000;
const MAX_OUTPUT_LENGTH = 64_000;

function executableName(): string {
  return process.platform === "win32" ? "main.exe" : "main";
}

export async function runCProgram({
  code,
  stdin = ""
}: RunCRequest): Promise<RunCResult> {
  const tempDir = await createTempDir();

  try {
    const sourcePath = path.join(tempDir, "main.c");
    const executablePath = path.join(tempDir, executableName());

    await writeFile(sourcePath, code, "utf8");

    const compileResult = await safeExec(
      "gcc",
      [sourcePath, "-O0", "-std=c11", "-Wall", "-Wextra", "-o", executablePath],
      {
        timeoutMs: COMPILE_TIMEOUT_MS,
        maxOutputLength: MAX_OUTPUT_LENGTH
      }
    );

    if (compileResult.timedOut) {
      return {
        status: "compile_error",
        stdout: "",
        stderr: "gcc compile timed out",
        timeMs: 0
      };
    }

    if (compileResult.exitCode !== 0) {
      return {
        status: "compile_error",
        stdout: "",
        stderr: compileResult.stderr || compileResult.stdout,
        timeMs: 0
      };
    }

    const runResult = await safeExec(executablePath, [], {
      stdin,
      timeoutMs: RUN_TIMEOUT_MS,
      maxOutputLength: MAX_OUTPUT_LENGTH
    });

    if (runResult.timedOut) {
      return {
        status: "timeout",
        stdout: "",
        stderr: "Program timed out",
        timeMs: RUN_TIMEOUT_MS
      };
    }

    if (runResult.exitCode !== 0) {
      return {
        status: "runtime_error",
        stdout: runResult.stdout,
        stderr:
          runResult.stderr || `Program exited with code ${runResult.exitCode}`,
        timeMs: runResult.timeMs
      };
    }

    return {
      status: "success",
      stdout: runResult.stdout,
      stderr: runResult.stderr,
      timeMs: runResult.timeMs
    };
  } catch (error) {
    return {
      status: "runtime_error",
      stdout: "",
      stderr: error instanceof Error ? error.message : "Unknown runtime error",
      timeMs: 0
    };
  } finally {
    await cleanupTempDir(tempDir);
  }
}
