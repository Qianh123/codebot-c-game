import { describe, expect, it } from "vitest";
import { generateErrorDiagnosis } from "./errorDiagnosis";

describe("generateErrorDiagnosis", () => {
  it("explains compile errors for beginners", () => {
    const diagnosis = generateErrorDiagnosis({
      errorType: "compile_error",
      stderr: "main.c:2:27: error: expected ';' before 'return'",
      code: 'int main(){printf("Hello") return 0;}'
    });

    expect(diagnosis).toContain("代码编译失败");
    expect(diagnosis).toContain("可能缺少分号");
  });

  it("explains timeout errors", () => {
    const diagnosis = generateErrorDiagnosis({
      errorType: "timeout",
      code: "int main(){while(1){}return 0;}"
    });

    expect(diagnosis).toContain("程序运行超时");
    expect(diagnosis).toContain("明显无限循环");
  });

  it("recognizes scanf without address operator", () => {
    const diagnosis = generateErrorDiagnosis({
      errorType: "runtime_error",
      code: 'int x; scanf("%d", x);'
    });

    expect(diagnosis).toContain("scanf 读取普通变量时通常需要使用 &");
  });

  it("recognizes assignment used in an if condition", () => {
    const diagnosis = generateErrorDiagnosis({
      errorType: "wrong_answer",
      code: "if (energy = 60) { printf(\"open\"); }"
    });

    expect(diagnosis).toContain("= 是赋值，== 才是判断相等");
  });
});
