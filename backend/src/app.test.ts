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
  it("returns five level summaries without heavy fields", async () => {
    const response = await request(app).get("/api/levels");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(5);
    expect(response.body[0]).toMatchObject({
      id: "level-001",
      title: "启动 CodeBot",
      chapter: "第一章：输出",
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
    expect(response.body.hints).toHaveLength(2);
    expect(response.body.tests).toHaveLength(1);
    expect(response.body.animationRules).toHaveLength(1);
  });

  it("returns 404 when the level does not exist", async () => {
    const response = await request(app).get("/api/levels/not-exist");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: "Level not found"
    });
  });
});
