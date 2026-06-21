import type { RunCStatus, SubmitLevelErrorType, SubmitLevelTestResult } from "../api/code";

export type DiagnosisErrorType =
  | RunCStatus
  | Exclude<SubmitLevelErrorType, null>
  | "network_error";

type ErrorDiagnosisInput = {
  errorType: DiagnosisErrorType;
  stderr?: string;
  code?: string;
  message?: string;
  results?: SubmitLevelTestResult[];
};

function hasScanfWithoutAddress(code: string): boolean {
  return /scanf\s*\(\s*"[^"]*"\s*,\s*[A-Za-z_]\w*\s*\)/.test(code);
}

function hasAssignmentInIf(code: string): boolean {
  return /if\s*\([^)]*[^!<>=]=[^=][^)]*\)/.test(code);
}

function hasStringEquality(code: string): boolean {
  return (
    /[A-Za-z_]\w*\s*==\s*"[^"]+"/.test(code) ||
    /"[^"]+"\s*==\s*[A-Za-z_]\w*/.test(code)
  );
}

function hasArrayIndexFive(code: string): boolean {
  return /[A-Za-z_]\w*\s*\[\s*5\s*\]/.test(code);
}

function hasObviousInfiniteLoop(code: string): boolean {
  return /while\s*\(\s*1\s*\)/.test(code) || /for\s*\(\s*;\s*;\s*\)/.test(code);
}

function getBaseMessage(errorType: DiagnosisErrorType): string {
  switch (errorType) {
    case "compile_error":
      return "代码编译失败，请先检查是否缺少分号、括号是否配对、变量名是否写错。";
    case "timeout":
      return "程序运行超时，可能存在死循环。请检查 while 或 for 循环条件是否能结束。";
    case "runtime_error":
      return "程序运行时出错，可能是数组越界、除以 0 或非法访问内存。";
    case "wrong_answer":
      return "程序可以运行，但输出结果和题目要求不一致。请重点检查条件判断、边界值、输出格式。";
    case "network_error":
      return "无法连接后端，请确认 npm run dev 正在运行。";
    case "invalid_request":
      return "提交内容不完整，请检查是否选择了关卡，并且代码不是空的。";
    case "level_not_found":
      return "关卡不存在，请返回关卡列表重新选择。";
    case "success":
      return "程序运行成功。";
  }
}

export function generateErrorDiagnosis({
  errorType,
  stderr = "",
  code = "",
  results = []
}: ErrorDiagnosisInput): string {
  const tips = [getBaseMessage(errorType)];
  const failedResult = results.find((result) => !result.passed);

  if (failedResult) {
    tips.push(
      `第一个未通过测试是“${failedResult.name}”，期望输出为 ${failedResult.expectedOutput || "空"}，实际输出为 ${failedResult.actualOutput || "空"}。`
    );

    if (failedResult.hidden) {
      tips.push("这个失败来自隐藏测试，通常说明代码没有处理好边界值或特殊输入。");
    }
  }

  if (hasScanfWithoutAddress(code)) {
    tips.push('scanf 读取普通变量时通常需要使用 &，例如 scanf("%d", &x)。');
  }

  if (hasAssignmentInIf(code)) {
    tips.push("= 是赋值，== 才是判断相等。请检查 if 条件里是否误用了单个等号。");
  }

  if (stderr.includes("expected ';'")) {
    tips.push("可能缺少分号。C 语言大多数语句末尾需要使用 ;。");
  }

  if (hasStringEquality(code)) {
    tips.push("C 语言字符串不能直接用 == 比较内容，应该使用 strcmp。");
  }

  if (hasArrayIndexFive(code)) {
    tips.push("数组下标从 0 开始，5 个元素的合法下标是 0 到 4，请检查是否访问了 a[5]。");
  }

  if (errorType === "timeout" && hasObviousInfiniteLoop(code)) {
    tips.push("代码中存在明显无限循环，需要设置退出条件。");
  }

  return tips.join("\n");
}
