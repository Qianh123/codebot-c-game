export type LevelTest = {
  name: string;
  input: string;
  expectedOutput: string;
  hidden?: boolean;
};

export type AnimationRule = {
  output: string;
  action: string;
};

export type Level = {
  id: string;
  title: string;
  chapter: string;
  knowledgePoint: string;
  difficulty: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  sampleInput: string;
  sampleOutput: string;
  starterCode: string;
  hints: string[];
  tests: LevelTest[];
  animationRules: AnimationRule[];
};

export type LevelSummary = Pick<
  Level,
  "id" | "title" | "chapter" | "knowledgePoint" | "difficulty" | "description"
>;

export const levels: Level[] = [
  {
    id: "level-001",
    title: "启动 CodeBot",
    chapter: "第一章：输出",
    knowledgePoint: "printf 输出",
    difficulty: "入门",
    description: "输出 Hello CodeBot，唤醒你的机器人。",
    inputFormat: "无输入",
    outputFormat: "输出一行 Hello CodeBot",
    sampleInput: "",
    sampleOutput: "Hello CodeBot",
    starterCode: `#include <stdio.h>

int main(void) {
    // 输出 Hello CodeBot
    return 0;
}`,
    hints: ["使用 printf 输出固定文本。", "注意 Hello CodeBot 的大小写和空格。"],
    tests: [
      {
        name: "输出问候",
        input: "",
        expectedOutput: "Hello CodeBot"
      }
    ],
    animationRules: [
      {
        output: "Hello CodeBot",
        action: "wake"
      }
    ]
  },
  {
    id: "level-002",
    title: "输入电量",
    chapter: "第二章：输入",
    knowledgePoint: "int、scanf、printf",
    difficulty: "入门",
    description: "输入一个整数 energy，并输出这个整数。",
    inputFormat: "输入一个整数 energy。",
    outputFormat: "输出 energy 的值。",
    sampleInput: "75",
    sampleOutput: "75",
    starterCode: `#include <stdio.h>

int main(void) {
    int energy;
    // 读取并输出 energy
    return 0;
}`,
    hints: ["使用 int 定义 energy。", "scanf 和 printf 都需要使用 %d。"],
    tests: [
      {
        name: "输出普通电量",
        input: "75",
        expectedOutput: "75"
      },
      {
        name: "输出低电量",
        input: "12",
        expectedOutput: "12"
      }
    ],
    animationRules: [
      {
        output: "75",
        action: "charge"
      }
    ]
  },
  {
    id: "level-003",
    title: "能量门",
    chapter: "第三章：条件",
    knowledgePoint: "if else、>=",
    difficulty: "基础",
    description: "输入整数 energy，如果 energy >= 60，输出 open，否则输出 close。",
    inputFormat: "输入一个整数 energy。",
    outputFormat: "如果 energy 大于等于 60，输出 open；否则输出 close。",
    sampleInput: "80",
    sampleOutput: "open",
    starterCode: `#include <stdio.h>

int main(void) {
    int energy;
    // 判断 energy 是否足够打开能量门
    return 0;
}`,
    hints: ["条件判断可以写成 energy >= 60。", "if 和 else 分别处理 open 与 close。"],
    tests: [
      {
        name: "电量充足",
        input: "80",
        expectedOutput: "open"
      },
      {
        name: "电量不足",
        input: "59",
        expectedOutput: "close"
      },
      {
        name: "边界电量",
        input: "60",
        expectedOutput: "open",
        hidden: true
      }
    ],
    animationRules: [
      {
        output: "open",
        action: "open-door"
      },
      {
        output: "close",
        action: "stop"
      }
    ]
  },
  {
    id: "level-004",
    title: "重复移动",
    chapter: "第四章：循环",
    knowledgePoint: "for 循环",
    difficulty: "基础",
    description: "输入整数 n，输出 n 行 move。",
    inputFormat: "输入一个整数 n。",
    outputFormat: "输出 n 行，每行都是 move。",
    sampleInput: "3",
    sampleOutput: "move\nmove\nmove",
    starterCode: `#include <stdio.h>

int main(void) {
    int n;
    // 使用 for 循环输出 n 行 move
    return 0;
}`,
    hints: ["for 循环可以从 i = 0 循环到 i < n。", "每次循环输出一行 move。"],
    tests: [
      {
        name: "移动三次",
        input: "3",
        expectedOutput: "move\nmove\nmove"
      },
      {
        name: "移动一次",
        input: "1",
        expectedOutput: "move"
      }
    ],
    animationRules: [
      {
        output: "move",
        action: "step"
      }
    ]
  },
  {
    id: "level-005",
    title: "仓库最大能量箱",
    chapter: "第五章：数组",
    knowledgePoint: "数组、循环、最大值",
    difficulty: "进阶",
    description: "输入 5 个整数，输出最大值。",
    inputFormat: "输入 5 个整数。",
    outputFormat: "输出这 5 个整数中的最大值。",
    sampleInput: "3 9 4 8 2",
    sampleOutput: "9",
    starterCode: `#include <stdio.h>

int main(void) {
    int boxes[5];
    // 读取 5 个整数并输出最大值
    return 0;
}`,
    hints: ["先把 5 个整数读入数组。", "用一个变量记录当前最大值。"],
    tests: [
      {
        name: "最大值在中间",
        input: "3 9 4 8 2",
        expectedOutput: "9"
      },
      {
        name: "最大值在末尾",
        input: "1 2 3 4 5",
        expectedOutput: "5"
      }
    ],
    animationRules: [
      {
        output: "9",
        action: "collect-max-box"
      }
    ]
  }
];
