import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App";

const levelSummaries = [
  {
    id: "level-001",
    title: "启动 CodeBot",
    chapter: "第一章：输出",
    knowledgePoint: "printf 输出",
    difficulty: "入门",
    description: "输出 Hello CodeBot，唤醒你的机器人。"
  },
  {
    id: "level-002",
    title: "输入电量",
    chapter: "第二章：输入",
    knowledgePoint: "int、scanf、printf",
    difficulty: "入门",
    description: "读取一个整数 energy，并输出它。"
  },
  {
    id: "level-003",
    title: "能量门",
    chapter: "第三章：条件",
    knowledgePoint: "if else、>=",
    difficulty: "基础",
    description: "根据 energy 是否达到 60 输出 open 或 close。"
  },
  {
    id: "level-004",
    title: "重复移动",
    chapter: "第四章：循环",
    knowledgePoint: "for 循环",
    difficulty: "基础",
    description: "输入 n，输出 n 行 move。"
  },
  {
    id: "level-005",
    title: "仓库最大能量箱",
    chapter: "第五章：数组",
    knowledgePoint: "数组、循环、最大值",
    difficulty: "进阶",
    description: "输入 5 个整数，输出最大值。"
  }
];

const levelDetail = {
  ...levelSummaries[0],
  inputFormat: "无输入",
  outputFormat: "输出一行 Hello CodeBot",
  sampleInput: "",
  sampleOutput: "Hello CodeBot",
  starterCode:
    "#include <stdio.h>\n\nint main(void) {\n    // 在这里输出内容\n    return 0;\n}",
  hints: ["使用 printf 输出固定文本。", "注意输出内容大小写。"],
  tests: [{ name: "输出问候", input: "", expectedOutput: "Hello CodeBot" }],
  animationRules: [{ output: "Hello CodeBot", action: "wake" }]
};

function mockJsonResponse(data: unknown, ok = true, status = 200) {
  return {
    ok,
    status,
    json: async () => data
  };
}

function renderRoute(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("App", () => {
  it("renders the CodeBot landing page", () => {
    renderRoute("/");

    expect(
      screen.getByRole("heading", { name: "CodeBot C 编程实验室" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("用 C 语言控制机器人闯关的编程教学游戏")
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "开始学习" })).toHaveAttribute(
      "href",
      "/levels"
    );
    expect(screen.getByRole("link", { name: "关卡列表" })).toHaveAttribute(
      "href",
      "/levels"
    );
  });

  it("renders level summaries from the backend", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      mockJsonResponse(levelSummaries) as Response
    );

    renderRoute("/levels");

    expect(await screen.findByRole("heading", { name: "关卡列表" })).toBeInTheDocument();
    expect(document.querySelectorAll(".level-card")).toHaveLength(5);
    expect(screen.getByText("启动 CodeBot")).toBeInTheDocument();
    expect(screen.getByText("仓库最大能量箱")).toBeInTheDocument();
    expect(globalThis.fetch).toHaveBeenCalledWith("/api/levels");
  });

  it("renders level detail from the backend and reveals the first hint on demand", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      mockJsonResponse(levelDetail) as Response
    );

    renderRoute("/levels/level-001");

    expect(
      await screen.findByRole("heading", { name: "启动 CodeBot" })
    ).toBeInTheDocument();
    expect(screen.getByText("输出一行 Hello CodeBot")).toBeInTheDocument();
    expect(screen.getByText("Hello CodeBot")).toBeInTheDocument();
    expect(screen.getAllByText(/#include <stdio.h>/).length).toBeGreaterThan(0);
    expect(screen.queryByText("使用 printf 输出固定文本。")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "点击提示查看第一条" }));

    expect(screen.getByText("使用 printf 输出固定文本。")).toBeInTheDocument();
    expect(globalThis.fetch).toHaveBeenCalledWith("/api/levels/level-001");
  });

  it("shows a not found message when the backend returns 404", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      mockJsonResponse({ error: "Level not found" }, false, 404) as Response
    );

    renderRoute("/levels/not-exist");

    expect(await screen.findByText("关卡不存在")).toBeInTheDocument();
  });

  it("shows an error message when the level list request fails", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network down"));

    renderRoute("/levels");

    expect(await screen.findByText("关卡数据加载失败")).toBeInTheDocument();
  });
});
