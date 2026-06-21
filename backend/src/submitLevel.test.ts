import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "./app.js";

const level001CorrectCode = `#include <stdio.h>

int main()
{
    printf("Hello CodeBot");
    return 0;
}`;

const level003CorrectCode = `#include <stdio.h>

int main()
{
    int energy;
    scanf("%d", &energy);

    if (energy >= 60)
    {
        printf("open");
    }
    else
    {
        printf("close");
    }

    return 0;
}`;

const level003BoundaryBugCode = `#include <stdio.h>

int main()
{
    int energy;
    scanf("%d", &energy);

    if (energy > 60)
    {
        printf("open");
    }
    else
    {
        printf("close");
    }

    return 0;
}`;

const level005CorrectCode = `#include <stdio.h>

int main()
{
    int boxes[5];
    int maxValue;

    for (int i = 0; i < 5; i++)
    {
        scanf("%d", &boxes[i]);
    }

    maxValue = boxes[0];

    for (int i = 1; i < 5; i++)
    {
        if (boxes[i] > maxValue)
        {
            maxValue = boxes[i];
        }
    }

    printf("%d", maxValue);
    return 0;
}`;

const level006CorrectCode = `#include <stdio.h>

int main()
{
    int a, b;
    scanf("%d %d", &a, &b);
    printf("%d", a + b);
    return 0;
}`;

const level013CorrectCode = `#include <stdio.h>

int main()
{
    int year;
    scanf("%d", &year);

    if ((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0))
    {
        printf("leap");
    }
    else
    {
        printf("common");
    }

    return 0;
}`;

const level020CorrectCode = `#include <stdio.h>

int main()
{
    int a[5];
    int result[5];
    int m;

    for (int i = 0; i < 5; i++)
    {
        scanf("%d", &a[i]);
    }

    scanf("%d", &m);
    m = m % 5;

    for (int i = 0; i < 5; i++)
    {
        result[(i + m) % 5] = a[i];
    }

    for (int i = 0; i < 5; i++)
    {
        if (i > 0)
        {
            printf(" ");
        }
        printf("%d", result[i]);
    }

    return 0;
}`;

describe("POST /api/submit-level", () => {
  it("passes level-001 with correct code", async () => {
    const response = await request(app).post("/api/submit-level").send({
      levelId: "level-001",
      code: level001CorrectCode
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      passed: true,
      score: 100,
      errorType: null,
      message: "全部测试通过"
    });
    expect(response.body.results).toHaveLength(4);
    expect(response.body.results[0]).toMatchObject({
      name: "输出问候",
      hidden: false,
      passed: true,
      input: "",
      expectedOutput: "Hello CodeBot",
      actualOutput: "Hello CodeBot",
      status: "success"
    });
  });

  it("passes level-003 with correct boundary handling", async () => {
    const response = await request(app).post("/api/submit-level").send({
      levelId: "level-003",
      code: level003CorrectCode
    });

    expect(response.status).toBe(200);
    expect(response.body.passed).toBe(true);
    expect(response.body.score).toBe(100);
    expect(response.body.results).toHaveLength(4);
    expect(response.body.results[2]).toMatchObject({
      name: "隐藏测试：边界值 60",
      hidden: true,
      passed: true,
      input: "60",
      expectedOutput: "open",
      actualOutput: "open",
      status: "success"
    });
  });

  it("fails level-003 when energy = 60 is handled incorrectly", async () => {
    const response = await request(app).post("/api/submit-level").send({
      levelId: "level-003",
      code: level003BoundaryBugCode
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      passed: false,
      score: 75,
      errorType: "wrong_answer",
      message: "部分测试未通过"
    });
    expect(response.body.results[2]).toMatchObject({
      name: "隐藏测试：边界值 60",
      hidden: true,
      passed: false,
      input: "60",
      expectedOutput: "open",
      actualOutput: "close",
      status: "success"
    });
  });

  it("returns 404 for a missing level", async () => {
    const response = await request(app).post("/api/submit-level").send({
      levelId: "not-exist",
      code: level001CorrectCode
    });

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      passed: false,
      score: 0,
      errorType: "level_not_found",
      message: "关卡不存在"
    });
  });

  it("returns compile_error for invalid C code", async () => {
    const response = await request(app).post("/api/submit-level").send({
      levelId: "level-001",
      code: `#include <stdio.h>
int main(){ printf("Hello CodeBot") return 0; }`
    });

    expect(response.status).toBe(200);
    expect(response.body.passed).toBe(false);
    expect(response.body.score).toBe(0);
    expect(response.body.errorType).toBe("compile_error");
    expect(response.body.message).toBe("代码编译失败");
    expect(response.body.results).toEqual([]);
    expect(response.body.stderr.length).toBeGreaterThan(0);
  });

  it("returns timeout for an infinite loop", async () => {
    const response = await request(app).post("/api/submit-level").send({
      levelId: "level-001",
      code: `int main(){ while (1) {} return 0; }`
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      passed: false,
      score: 0,
      errorType: "timeout",
      message: "程序运行超时，可能存在死循环",
      results: []
    });
  });

  it("returns invalid_request for empty code", async () => {
    const response = await request(app).post("/api/submit-level").send({
      levelId: "level-001",
      code: "   "
    });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      passed: false,
      score: 0,
      errorType: "invalid_request",
      message: "请提交 C 语言代码"
    });
  });

  it("passes level-005 with correct max-array code", async () => {
    const response = await request(app).post("/api/submit-level").send({
      levelId: "level-005",
      code: level005CorrectCode
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      passed: true,
      score: 100,
      errorType: null,
      message: "全部测试通过"
    });
    expect(response.body.results).toHaveLength(4);
  });

  it("passes level-006 with two-number sum code", async () => {
    const response = await request(app).post("/api/submit-level").send({
      levelId: "level-006",
      code: level006CorrectCode
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      passed: true,
      score: 100,
      errorType: null,
      message: "全部测试通过"
    });
    expect(response.body.results).toHaveLength(4);
  });

  it("passes level-013 with leap-year boundary code", async () => {
    const response = await request(app).post("/api/submit-level").send({
      levelId: "level-013",
      code: level013CorrectCode
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      passed: true,
      score: 100,
      errorType: null,
      message: "全部测试通过"
    });
    expect(response.body.results.at(-1)).toMatchObject({
      input: "2000",
      expectedOutput: "leap",
      passed: true
    });
  });

  it("passes level-020 with right-rotation array code", async () => {
    const response = await request(app).post("/api/submit-level").send({
      levelId: "level-020",
      code: level020CorrectCode
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      passed: true,
      score: 100,
      errorType: null,
      message: "全部测试通过"
    });
    expect(response.body.results.at(-1)).toMatchObject({
      input: "1 2 3 4 5\n7",
      expectedOutput: "4 5 1 2 3",
      passed: true
    });
  });
});
