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
  },
  {
    id: "level-006",
    title: "双数能量合并",
    chapter: "第一章：输入输出与变量",
    knowledgePoint: "int、scanf、printf、加法",
    difficulty: "入门",
    description: "输入两个整数，输出它们的和。"
  },
  {
    id: "level-007",
    title: "圆形能量场面积",
    chapter: "第一章：输入输出与变量",
    knowledgePoint: "double、格式化输出",
    difficulty: "基础",
    description: "输入半径，输出圆面积，保留两位小数。"
  },
  {
    id: "level-008",
    title: "读取指令字符",
    chapter: "第一章：输入输出与变量",
    knowledgePoint: "char、scanf、printf",
    difficulty: "入门",
    description: "输入一个字符并原样输出。"
  },
  {
    id: "level-009",
    title: "奇偶能量判断",
    chapter: "第二章：条件判断",
    knowledgePoint: "%、if else",
    difficulty: "基础",
    description: "输入整数，判断 odd 或 even。"
  },
  {
    id: "level-010",
    title: "正负能量检测",
    chapter: "第二章：条件判断",
    knowledgePoint: "if else if",
    difficulty: "基础",
    description: "输入整数，判断 positive、negative 或 zero。"
  },
  {
    id: "level-011",
    title: "三路最大能量",
    chapter: "第二章：条件判断",
    knowledgePoint: "多条件最大值",
    difficulty: "基础",
    description: "输入三个整数，输出最大值。"
  },
  {
    id: "level-012",
    title: "成绩等级门",
    chapter: "第二章：条件判断",
    knowledgePoint: "if else if、区间判断",
    difficulty: "基础",
    description: "输入成绩，输出 A、B、C、D 或 F。"
  },
  {
    id: "level-013",
    title: "闰年时钟",
    chapter: "第二章：条件判断",
    knowledgePoint: "逻辑运算、闰年规则",
    difficulty: "进阶",
    description: "输入年份，判断 leap 或 common。"
  },
  {
    id: "level-014",
    title: "编号路线输出",
    chapter: "第三章：循环",
    knowledgePoint: "for 循环",
    difficulty: "基础",
    description: "输入 n，输出 1 到 n。"
  },
  {
    id: "level-015",
    title: "前 n 项能量和",
    chapter: "第三章：循环",
    knowledgePoint: "循环累加",
    difficulty: "基础",
    description: "输入 n，输出 1 到 n 的和。"
  },
  {
    id: "level-016",
    title: "阶乘能量核心",
    chapter: "第三章：循环",
    knowledgePoint: "循环乘法",
    difficulty: "基础",
    description: "输入 n，输出 n 的阶乘。"
  },
  {
    id: "level-017",
    title: "素数通行证",
    chapter: "第三章：循环",
    knowledgePoint: "循环、取模、标记变量",
    difficulty: "进阶",
    description: "输入整数 n，判断 prime 或 not prime。"
  },
  {
    id: "level-018",
    title: "数组能量总和",
    chapter: "第四章：数组",
    knowledgePoint: "数组、循环、求和",
    difficulty: "基础",
    description: "输入 5 个整数，输出总和。"
  },
  {
    id: "level-019",
    title: "数组最小能量箱",
    chapter: "第四章：数组",
    knowledgePoint: "数组、循环、最小值",
    difficulty: "基础",
    description: "输入 5 个整数，输出最小值。"
  },
  {
    id: "level-020",
    title: "数组右移传送带",
    chapter: "第四章：数组",
    knowledgePoint: "数组、取模、循环移动",
    difficulty: "挑战",
    description: "输入 5 个整数和 m，输出右移 m 位后的数组。"
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
  animationRules: [{ output: "Hello CodeBot", action: "wake" }],
  explanation: {
    concept:
      "printf 用来把文字输出到屏幕。本关要练习固定文本输出，输出内容必须和题目要求完全一致。",
    syntax: 'printf("Hello CodeBot");',
    executionSteps: [
      "程序从 main 函数开始执行。",
      "执行 printf 语句，把双引号中的文字输出到屏幕。",
      "return 0 表示程序正常结束。"
    ],
    commonMistakes: [
      "忘记在语句末尾写分号。",
      "把 Hello CodeBot 的大小写写错。",
      "额外输出了提示文字，导致答案不匹配。"
    ],
    referenceSolution:
      '#include <stdio.h>\n\nint main(void) {\n    printf("Hello CodeBot");\n    return 0;\n}',
    extraPractice: ["输出 Welcome CodeBot。", "输出两行不同的问候语。"]
  }
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
  localStorage.clear();
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
    expect(screen.getByRole("link", { name: "错题本" })).toHaveAttribute(
      "href",
      "/mistakes"
    );
    expect(screen.getByRole("link", { name: "教师面板" })).toHaveAttribute(
      "href",
      "/teacher-dashboard"
    );
    expect(screen.getByText("核心功能")).toBeInTheDocument();
    expect(screen.getByText("C 代码编辑")).toBeInTheDocument();
    expect(screen.getByText("在线编译运行")).toBeInTheDocument();
    expect(screen.getByText("自动判题")).toBeInTheDocument();
    expect(screen.getByText("错误诊断")).toBeInTheDocument();
    expect(screen.getAllByText("错题本").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("教师数据面板")).toBeInTheDocument();
    expect(screen.getByText("总关卡数")).toBeInTheDocument();
    expect(screen.getByText("已完成关卡数")).toBeInTheDocument();
    expect(screen.getByText("当前完成率")).toBeInTheDocument();
  });

  it("shows learning progress on the home page", () => {
    localStorage.setItem(
      "codebot-progress",
      JSON.stringify([
        {
          levelId: "level-003",
          passed: true,
          bestScore: 100,
          submitCount: 2,
          lastSubmittedAt: "2026-06-21T10:00:00.000Z",
          lastCode: "int main(){return 0;}"
        }
      ])
    );

    renderRoute("/");

    expect(screen.getByText("5%")).toBeInTheDocument();
    expect(screen.getByText("最近学习关卡")).toBeInTheDocument();
    expect(screen.getByText("能量门")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "继续学习" })).toHaveAttribute(
      "href",
      "/levels/level-003"
    );
  });

  it("renders the teacher dashboard page", () => {
    renderRoute("/teacher-dashboard");

    expect(screen.getByRole("heading", { name: "教师数据面板" })).toBeInTheDocument();
    expect(screen.getByText("学生人数")).toBeInTheDocument();
    expect(screen.getByText("总提交次数")).toBeInTheDocument();
    expect(screen.getByText("平均通过率")).toBeInTheDocument();
    expect(screen.getByText("最薄弱知识点")).toBeInTheDocument();
  });

  it("shows level pass rates, error distribution, and teaching advice", () => {
    renderRoute("/teacher-dashboard");

    expect(screen.getByRole("heading", { name: "关卡通过率" })).toBeInTheDocument();
    expect(screen.getByText("启动 CodeBot")).toBeInTheDocument();
    expect(screen.getByText("能量门")).toBeInTheDocument();
    expect(screen.getAllByText("仓库最大能量箱").length).toBeGreaterThanOrEqual(1);

    expect(screen.getByRole("heading", { name: "错误类型分布" })).toBeInTheDocument();
    expect(screen.getByText("compile_error")).toBeInTheDocument();
    expect(screen.getAllByText("wrong_answer").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("timeout")).toBeInTheDocument();
    expect(screen.getByText("runtime_error")).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: "知识点掌握情况" })).toBeInTheDocument();
    expect(screen.getAllByText("printf 输出").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("scanf 输入").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("if else 判断").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("for 循环").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("数组最大值").length).toBeGreaterThanOrEqual(1);

    expect(screen.getByRole("heading", { name: "教学建议" })).toBeInTheDocument();
    expect(screen.getByText(/建议重点讲解输出格式/)).toBeInTheDocument();
  });

  it("renders level summaries from the backend", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      mockJsonResponse(levelSummaries) as Response
    );

    renderRoute("/levels");

    expect(await screen.findByRole("heading", { name: "关卡列表" })).toBeInTheDocument();
    expect(document.querySelectorAll(".level-card")).toHaveLength(20);
    expect(screen.getByText("启动 CodeBot")).toBeInTheDocument();
    expect(screen.getByText("仓库最大能量箱")).toBeInTheDocument();
    expect(globalThis.fetch).toHaveBeenCalledWith("/api/levels");
  });

  it("shows passed progress on level cards", async () => {
    localStorage.setItem(
      "codebot-progress",
      JSON.stringify([
        {
          levelId: "level-003",
          passed: true,
          bestScore: 100,
          submitCount: 2,
          lastSubmittedAt: "2026-06-21T10:00:00.000Z",
          lastCode: "int main(){return 0;}"
        }
      ])
    );
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      mockJsonResponse(levelSummaries) as Response
    );

    renderRoute("/levels");

    expect(await screen.findByText("已通过")).toBeInTheDocument();
    expect(screen.getByText("最高分：100")).toBeInTheDocument();
    expect(screen.getByText("提交次数：2")).toBeInTheDocument();
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

  it("shows backend submit error bodies from non-2xx responses", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
      const url = String(input);

      if (url === "/api/levels/level-003") {
        return mockJsonResponse(level003Detail) as Response;
      }

      if (url === "/api/submit-level") {
        return mockJsonResponse(
          {
            passed: false,
            score: 0,
            errorType: "invalid_request",
            message: "请提交 C 语言代码",
            results: []
          },
          false,
          400
        ) as Response;
      }

      throw new Error(`Unexpected request: ${url}`);
    });

    renderRoute("/levels/level-003");

    expect(await screen.findByRole("heading", { name: "能量门" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "提交" }));

    expect(await screen.findByText("提交判题结果")).toBeInTheDocument();
    expect(
      screen.getByText((_, element) => element?.textContent === "错误类型：invalid_request")
    ).toBeInTheDocument();
    expect(screen.queryByText("network_error")).not.toBeInTheDocument();
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
    expect(screen.getByRole("heading", { name: "知识讲解" })).toBeInTheDocument();
    expect(screen.getByText("本关知识点说明")).toBeInTheDocument();
    expect(screen.getByText(/printf 用来把文字输出到屏幕/)).toBeInTheDocument();
    expect(screen.getByText("语法格式")).toBeInTheDocument();
    expect(screen.getByText('printf("Hello CodeBot");')).toBeInTheDocument();
    expect(screen.getByText("程序执行步骤")).toBeInTheDocument();
    expect(screen.getByText("常见错误")).toBeInTheDocument();
    expect(screen.getByText("变式练习")).toBeInTheDocument();
    expect(screen.queryByText(/先自己写，卡住后再看/)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "错题本" })).toHaveAttribute(
      "href",
      "/mistakes"
    );
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

    fireEvent.click(screen.getByRole("button", { name: "显示参考答案" }));

    expect(screen.getByText(/先自己写，卡住后再看/)).toBeInTheDocument();
    expect(screen.getAllByText(/printf\("Hello CodeBot"\);/).length).toBeGreaterThanOrEqual(2);

    fireEvent.click(screen.getByRole("button", { name: "隐藏参考答案" }));

    expect(screen.queryByText(/先自己写，卡住后再看/)).not.toBeInTheDocument();
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

  it("renders an empty mistakes page", () => {
    renderRoute("/mistakes");

    expect(screen.getByRole("heading", { name: "错题本" })).toBeInTheDocument();
    expect(screen.getByText("暂无错题记录")).toBeInTheDocument();
  });

  it("renders mistake records from localStorage", () => {
    localStorage.setItem(
      "codebot-mistakes",
      JSON.stringify([
        {
          id: "mistake-1",
          levelId: "level-003",
          levelTitle: "能量门",
          knowledgePoint: "if else、>=",
          code: "if (energy > 60) { printf(\"open\"); }",
          errorType: "wrong_answer",
          message: "部分测试未通过",
          diagnosis: "程序可以运行，但输出结果和题目要求不一致。",
          score: 67,
          time: "2026-06-20T14:00:00.000Z"
        }
      ])
    );

    renderRoute("/mistakes");

    expect(screen.getByText("能量门")).toBeInTheDocument();
    expect(screen.getByText("if else、>=")).toBeInTheDocument();
    expect(screen.getByText("wrong_answer")).toBeInTheDocument();
    expect(screen.getByText("得分：67")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "展开" }));

    expect(screen.getByText("程序可以运行，但输出结果和题目要求不一致。")).toBeInTheDocument();
    expect(screen.getByText(/if \(energy > 60\)/)).toBeInTheDocument();
  });

  it("clears all mistake records", () => {
    localStorage.setItem(
      "codebot-mistakes",
      JSON.stringify([
        {
          id: "mistake-1",
          levelId: "level-003",
          levelTitle: "能量门",
          knowledgePoint: "if else、>=",
          code: "int main(){return 0;}",
          errorType: "wrong_answer",
          message: "部分测试未通过",
          diagnosis: "输出不一致。",
          score: 67,
          time: "2026-06-20T14:00:00.000Z"
        }
      ])
    );

    renderRoute("/mistakes");

    fireEvent.click(screen.getByRole("button", { name: "清空错题本" }));

    expect(screen.getByText("暂无错题记录")).toBeInTheDocument();
    expect(localStorage.getItem("codebot-mistakes")).toBe("[]");
  });
});
