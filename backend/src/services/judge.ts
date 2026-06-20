import type { Level } from "../data/levels.js";
import { runCProgram } from "./cRunner.js";
import type { JudgeResponse, JudgeTestResult } from "../types/judge.js";

function calculateScore(passedCount: number, totalCount: number): number {
  if (totalCount === 0) {
    return 0;
  }

  return Math.round((passedCount / totalCount) * 100);
}

export async function judgeLevelSubmission(
  level: Level,
  code: string
): Promise<JudgeResponse> {
  const results: JudgeTestResult[] = [];

  for (const test of level.tests) {
    const runResult = await runCProgram({
      code,
      stdin: test.input
    });

    if (runResult.status === "compile_error") {
      return {
        passed: false,
        score: 0,
        errorType: "compile_error",
        message: "代码编译失败",
        results: [],
        stderr: runResult.stderr
      };
    }

    if (runResult.status === "timeout") {
      return {
        passed: false,
        score: 0,
        errorType: "timeout",
        message: "程序运行超时，可能存在死循环",
        results: []
      };
    }

    if (runResult.status === "runtime_error") {
      return {
        passed: false,
        score: 0,
        errorType: "runtime_error",
        message: "程序运行时出错，请检查数组下标、除零或非法内存访问",
        results: [],
        stderr: runResult.stderr
      };
    }

    const actualOutput = runResult.stdout;
    const passed = actualOutput.trim() === test.expectedOutput.trim();

    results.push({
      name: test.name,
      hidden: test.hidden ?? false,
      passed,
      input: test.input,
      expectedOutput: test.expectedOutput,
      actualOutput,
      status: runResult.status
    });
  }

  const passedCount = results.filter((result) => result.passed).length;
  const score = calculateScore(passedCount, level.tests.length);
  const passed = passedCount === level.tests.length;

  return {
    passed,
    score,
    errorType: passed ? null : "wrong_answer",
    message: passed ? "全部测试通过" : "部分测试未通过",
    results
  };
}
