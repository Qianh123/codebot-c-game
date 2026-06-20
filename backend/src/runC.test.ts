import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "./app.js";

describe("POST /api/run-c", () => {
  it("runs a correct C program", async () => {
    const response = await request(app)
      .post("/api/run-c")
      .send({
        code: `#include <stdio.h>

int main()
{
    printf("Hello CodeBot");
    return 0;
}`,
        stdin: ""
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.stdout).toBe("Hello CodeBot");
    expect(response.body.stderr).toBe("");
    expect(response.body.timeMs).toEqual(expect.any(Number));
  });

  it("passes stdin to the C program", async () => {
    const response = await request(app)
      .post("/api/run-c")
      .send({
        code: `#include <stdio.h>

int main()
{
    int x;
    scanf("%d", &x);
    printf("%d", x);
    return 0;
}`,
        stdin: "75"
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.stdout).toBe("75");
  });

  it("returns compile_error for invalid C code", async () => {
    const response = await request(app)
      .post("/api/run-c")
      .send({
        code: `#include <stdio.h>

int main()
{
    printf("Hello CodeBot")
    return 0;
}`,
        stdin: ""
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("compile_error");
    expect(response.body.stdout).toBe("");
    expect(response.body.stderr.length).toBeGreaterThan(0);
    expect(response.body.timeMs).toBe(0);
  });

  it("returns timeout for an infinite loop", async () => {
    const response = await request(app)
      .post("/api/run-c")
      .send({
        code: `int main()
{
    while (1)
    {
    }
    return 0;
}`,
        stdin: ""
      });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: "timeout",
      stdout: "",
      stderr: "Program timed out",
      timeMs: 2000
    });
  });

  it("returns runtime_error or another non-success status for a crashing program", async () => {
    const response = await request(app)
      .post("/api/run-c")
      .send({
        code: `int main()
{
    int *p = 0;
    *p = 1;
    return 0;
}`,
        stdin: ""
      });

    expect(response.status).toBe(200);
    expect(response.body.status).not.toBe("success");
  });
});
