import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App";

vi.mock("@monaco-editor/react", () => ({
  default: ({
    value,
    onChange
  }: {
    value?: string;
    onChange?: (value: string | undefined) => void;
  }) => (
    <textarea
      aria-label="C 语言代码编辑器"
      value={value ?? ""}
      onChange={(event) => onChange?.(event.target.value)}
    />
  )
}));

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

const level003Detail = {
  ...levelSummaries[2],
  inputFormat: "输入一个整数 energy。",
  outputFormat: "如果 energy >= 60，输出 open，否则输出 close。",
  sampleInput: "80",
  sampleOutput: "open",
  starterCode:
    "#include <stdio.h>\n\nint main(void) {\n    int energy;\n    scanf(\"%d\", &energy);\n    return 0;\n}",
  hints: ["先用 scanf 读入 energy。"],
  tests: [
    { name: "电量充足", input: "80", expectedOutput: "open" },
    { name: "隐藏测试：边界值 60", input: "60", expectedOutput: "open", hidden: true }
  ],
  animationRules: [{ output: "open", action: "open-door" }]
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

  it("runs C code with custom stdin and submits the level to the judge API", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockImplementation(async (input, init) => {
      const url = String(input);

      if (url === "/api/levels/level-003") {
        return mockJsonResponse(level003Detail) as Response;
      }

      if (url === "/api/run-c") {
        expect(init?.method).toBe("POST");
        expect(JSON.parse(String(init?.body))).toMatchObject({
          code: expect.stringContaining("scanf"),
          stdin: "60"
        });

        return mockJsonResponse({
          status: "success",
          stdout: "open",
          stderr: "",
          timeMs: 25
        }) as Response;
      }

      if (url === "/api/submit-level") {
        expect(init?.method).toBe("POST");
        expect(JSON.parse(String(init?.body))).toMatchObject({
          levelId: "level-003",
          code: expect.stringContaining("scanf")
        });

        return mockJsonResponse({
          passed: false,
          score: 50,
          errorType: "wrong_answer",
          message: "部分测试未通过",
          results: [
            {
              name: "电量充足",
              hidden: false,
              passed: true,
              input: "80",
              expectedOutput: "open",
              actualOutput: "open",
              status: "success"
            },
            {
              name: "隐藏测试：边界值 60",
              hidden: true,
              passed: false,
              input: "60",
              expectedOutput: "open",
              actualOutput: "close",
              status: "success"
            }
          ]
        }) as Response;
      }

      throw new Error(`Unexpected request: ${url}`);
    });

    renderRoute("/levels/level-003");

    expect(await screen.findByRole("heading", { name: "能量门" })).toBeInTheDocument();
    expect(screen.getByLabelText("自定义输入")).toHaveValue("80");

    fireEvent.change(screen.getByLabelText("自定义输入"), {
      target: { value: "60" }
    });

    fireEvent.click(screen.getByRole("button", { name: "运行" }));

    expect(await screen.findByText("运行结果")).toBeInTheDocument();
    expect(screen.getByText("success")).toBeInTheDocument();
    expect(screen.getAllByText("open").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("耗时：25ms")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "提交" }));

    expect(await screen.findByText("提交判题结果")).toBeInTheDocument();
    expect(screen.getByText("得分：50")).toBeInTheDocument();
    expect(screen.getByText("程序能运行，但输出结果和题目要求不一致。")).toBeInTheDocument();
    expect(screen.getByText("隐藏测试：边界值 60")).toBeInTheDocument();
    expect(screen.getByText("实际输出：close")).toBeInTheDocument();
    expect(screen.getByText("模拟错误")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith("/api/levels/level-003");
  });

  it("shows submit errorType when the judge returns a compile error", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
      const url = String(input);

      if (url === "/api/levels/level-003") {
        return mockJsonResponse(level003Detail) as Response;
      }

      if (url === "/api/submit-level") {
        return mockJsonResponse({
          passed: false,
          score: 0,
          errorType: "compile_error",
          message: "代码编译失败",
          results: [],
          stderr: "expected ';' before return"
        }) as Response;
      }

      throw new Error(`Unexpected request: ${url}`);
    });

    renderRoute("/levels/level-003");

    expect(await screen.findByRole("heading", { name: "能量门" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "提交" }));

    expect(await screen.findByText("提交判题结果")).toBeInTheDocument();
    expect(
      screen.getByText((_, element) => element?.textContent === "错误类型：compile_error")
    ).toBeInTheDocument();
    expect(
      screen.getByText("代码编译失败，请检查语法，例如分号、括号、变量名。")
    ).toBeInTheDocument();
  });

  it("renders level detail with editor, reset, and progressive hints", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      mockJsonResponse(levelDetail) as Response
    );

    renderRoute("/levels/level-001");

    expect(
      await screen.findByRole("heading", { name: "启动 CodeBot" })
    ).toBeInTheDocument();
    expect(screen.getByText("输出一行 Hello CodeBot")).toBeInTheDocument();
    expect(screen.getByText("Hello CodeBot")).toBeInTheDocument();
    const editor = screen.getByLabelText("C 语言代码编辑器");
    expect(editor).toHaveValue(levelDetail.starterCode);
    expect(screen.queryByText("使用 printf 输出固定文本。")).not.toBeInTheDocument();
    expect(screen.getByText("等待运行")).toBeInTheDocument();

    fireEvent.change(editor, {
      target: { value: "#include <stdio.h>\n\nint main(void) { return 0; }" }
    });

    expect(editor).toHaveValue("#include <stdio.h>\n\nint main(void) { return 0; }");

    fireEvent.click(screen.getByRole("button", { name: "重置" }));

    expect(editor).toHaveValue(levelDetail.starterCode);

    fireEvent.click(screen.getByRole("button", { name: "提示" }));

    expect(screen.getByText("使用 printf 输出固定文本。")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "提示" }));

    expect(screen.getByText("注意输出内容大小写。")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "提示" }));

    expect(screen.getByText("已经没有更多提示")).toBeInTheDocument();
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
