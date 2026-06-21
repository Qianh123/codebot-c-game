import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "./app.js";

describe("GET /api/health", () => {
  it("returns the CodeBot backend health response", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      ok: true,
      message: "CodeBot backend is running"
    });
  });
});

describe("GET /api/levels", () => {
  it("returns twenty level summaries without heavy fields", async () => {
    const response = await request(app).get("/api/levels");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(20);
    expect(response.body[0]).toMatchObject({
      id: "level-001",
      title: "启动 CodeBot",
      chapter: "第一章：输入输出与变量",
      knowledgePoint: "printf 输出",
      difficulty: "入门"
    });
    expect(response.body[0]).not.toHaveProperty("starterCode");
    expect(response.body[0]).not.toHaveProperty("tests");
  });
});

describe("GET /api/levels/:id", () => {
  it("returns full level detail", async () => {
    const response = await request(app).get("/api/levels/level-001");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: "level-001",
      title: "启动 CodeBot",
      outputFormat: "输出一行 Hello CodeBot",
      sampleOutput: "Hello CodeBot"
    });
    expect(response.body.starterCode).toContain("#include <stdio.h>");
    expect(response.body.hints.length).toBeGreaterThanOrEqual(4);
    expect(response.body.tests.length).toBeGreaterThanOrEqual(4);
    expect(response.body.animationRules).toHaveLength(1);
  });

  it("all levels have complete learning metadata and test coverage", async () => {
    const listResponse = await request(app).get("/api/levels");

    expect(listResponse.status).toBe(200);

    for (const summary of listResponse.body) {
      const detailResponse = await request(app).get(`/api/levels/${summary.id}`);

      expect(detailResponse.status).toBe(200);
      expect(detailResponse.body.hints.length).toBeGreaterThanOrEqual(4);
      expect(detailResponse.body.tests.length).toBeGreaterThanOrEqual(4);
      expect(detailResponse.body.tests.some((test: { hidden?: boolean }) => test.hidden)).toBe(
        true
      );
      expect(detailResponse.body.animationRules.length).toBeGreaterThanOrEqual(1);
      expect(detailResponse.body.starterCode).toContain("#include <stdio.h>");
    }
  });

  it("returns 404 when the level does not exist", async () => {
    const response = await request(app).get("/api/levels/not-exist");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: "Level not found"
    });
  });
});
