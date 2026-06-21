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

export type LevelExplanation = {
  concept: string;
  syntax: string;
  executionSteps: string[];
  commonMistakes: string[];
  referenceSolution: string;
  extraPractice: string[];
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
  explanation?: LevelExplanation;
  animationRules: AnimationRule[];
};

export type LevelSummary = Pick<
  Level,
  "id" | "title" | "chapter" | "knowledgePoint" | "difficulty" | "description"
>;

const includeStdio = `#include <stdio.h>

`;

const levelExplanations: Record<string, LevelExplanation> = {
  "level-001": {
    concept:
      "printf 是 C 语言中最常用的输出函数。本关练习固定文本输出，程序不需要读取输入，只要把题目要求的文字原样输出即可。",
    syntax: `printf("要输出的文字");`,
    executionSteps: [
      "程序从 main 函数开始执行。",
      "执行 printf 语句，把双引号中的文字输出到屏幕。",
      "执行 return 0，表示程序正常结束。"
    ],
    commonMistakes: [
      "忘记在 printf 语句末尾写分号。",
      "把 Hello CodeBot 的大小写或空格写错。",
      "额外输出中文提示、标点或换行说明，导致和标准答案不一致。"
    ],
    referenceSolution: `${includeStdio}int main(void) {
    printf("Hello CodeBot");
    return 0;
}`,
    extraPractice: [
      "把输出内容改成 Welcome CodeBot，并观察输出是否完全一致。",
      "尝试输出两行文字，理解 \\n 的换行作用。"
    ]
  },
  "level-002": {
    concept:
      "int 用来保存整数，scanf 用来从标准输入读取数据，printf 用来输出数据。本关练习把输入的整数保存到变量后再原样输出。",
    syntax: `int energy;
scanf("%d", &energy);
printf("%d", energy);`,
    executionSteps: [
      "定义 int 类型变量 energy，用来存放输入的整数。",
      "scanf 根据 %d 读取一个整数，并通过 &energy 写入变量。",
      "printf 使用 %d 把 energy 当前保存的值输出。"
    ],
    commonMistakes: [
      "scanf 读取普通变量时忘记写 &energy。",
      "scanf 或 printf 中的格式符写成 %f、%c 等错误类型。",
      "输出时额外添加说明文字，例如 energy=75，导致答案不匹配。"
    ],
    referenceSolution: `${includeStdio}int main(void) {
    int energy;
    scanf("%d", &energy);
    printf("%d", energy);
    return 0;
}`,
    extraPractice: [
      "输入一个整数 age，并输出这个整数。",
      "输入一个负整数，确认程序也能原样输出。"
    ]
  },
  "level-003": {
    concept:
      "if else 用来根据条件选择不同的执行路径。本关核心是判断 energy 是否大于等于 60，特别要注意 60 这个边界值也应该输出 open。",
    syntax: `if (energy >= 60) {
    printf("open");
} else {
    printf("close");
}`,
    executionSteps: [
      "先读取整数 energy。",
      "判断条件 energy >= 60 是否成立。",
      "条件成立时执行 if 分支输出 open，否则执行 else 分支输出 close。"
    ],
    commonMistakes: [
      "把 >= 写成 >，导致 energy 等于 60 时判断错误。",
      "把比较运算符 == 写成赋值运算符 =。",
      "输出 open 或 close 时大小写不一致，或多输出空格。"
    ],
    referenceSolution: `${includeStdio}int main(void) {
    int energy;
    scanf("%d", &energy);

    if (energy >= 60) {
        printf("open");
    } else {
        printf("close");
    }

    return 0;
}`,
    extraPractice: [
      "把门槛改成 100，输入 score >= 100 时输出 full。",
      "判断温度 temp 是否小于 0，小于 0 输出 freeze，否则输出 safe。"
    ]
  },
  "level-004": {
    concept:
      "for 循环适合执行固定次数的重复操作。本关输入 n 后，需要重复输出 n 行 move，循环次数必须和 n 一致。",
    syntax: `for (int i = 0; i < n; i++) {
    printf("move\\n");
}`,
    executionSteps: [
      "读取整数 n，表示需要重复的次数。",
      "从 i = 0 开始循环，只要 i < n 就继续执行。",
      "每次循环输出一行 move，然后 i 加 1，直到循环结束。"
    ],
    commonMistakes: [
      "循环条件写成 i <= n，导致多输出一行。",
      "忘记在 move 后输出换行，导致多行输出挤在一起。",
      "没有考虑 n 为 0 时不应该输出任何内容。"
    ],
    referenceSolution: `${includeStdio}int main(void) {
    int n;
    scanf("%d", &n);

    for (int i = 0; i < n; i++) {
        printf("move");
        if (i < n - 1) {
            printf("\\n");
        }
    }

    return 0;
}`,
    extraPractice: [
      "输入 n，输出 n 行 CodeBot。",
      "输入 n，输出从 0 到 n - 1 的数字。"
    ]
  },
  "level-005": {
    concept:
      "数组可以保存一组同类型数据。求最大值时，通常先假设第一个元素最大，再逐个比较后面的元素并更新最大值。",
    syntax: `int boxes[5];
int max = boxes[0];
if (boxes[i] > max) {
    max = boxes[i];
}`,
    executionSteps: [
      "用数组 boxes 保存 5 个输入整数。",
      "把 boxes[0] 作为初始最大值 max。",
      "从下标 1 到 4 遍历数组，如果当前元素更大，就更新 max。",
      "遍历结束后输出 max。"
    ],
    commonMistakes: [
      "把 max 初始值写成 0，遇到全是负数的输入会出错。",
      "数组下标写到 boxes[5]，越过了合法范围 0 到 4。",
      "只比较了部分元素，漏掉最后一个数。"
    ],
    referenceSolution: `${includeStdio}int main(void) {
    int boxes[5];

    for (int i = 0; i < 5; i++) {
        scanf("%d", &boxes[i]);
    }

    int max = boxes[0];
    for (int i = 1; i < 5; i++) {
        if (boxes[i] > max) {
            max = boxes[i];
        }
    }

    printf("%d", max);
    return 0;
}`,
    extraPractice: [
      "输入 5 个整数，输出第二个元素。",
      "输入 5 个整数，统计其中大于 0 的个数。"
    ]
  },
  "level-006": {
    concept:
      "一个程序可以一次读取多个变量。整数加法使用 + 运算符，本关把两个输入整数相加后输出结果。",
    syntax: `int a, b;
scanf("%d %d", &a, &b);
printf("%d", a + b);`,
    executionSteps: [
      "定义两个 int 变量 a 和 b。",
      "scanf 按顺序读取两个整数，分别存入 a 和 b。",
      "计算表达式 a + b，并用 printf 输出计算结果。"
    ],
    commonMistakes: [
      "scanf 中有两个 %d，却只传了一个变量地址。",
      "忘记给 a 或 b 加 &，导致读取失败或运行错误。",
      "输出了 a 和 b 本身，而不是输出 a + b 的结果。"
    ],
    referenceSolution: `${includeStdio}int main(void) {
    int a, b;
    scanf("%d %d", &a, &b);
    printf("%d", a + b);
    return 0;
}`,
    extraPractice: [
      "输入两个整数，输出它们的差 a - b。",
      "输入三个整数，输出它们的和。"
    ]
  },
  "level-007": {
    concept:
      "double 用来保存小数。计算圆面积时需要使用乘法表达式，输出时可以用 %.2f 控制保留两位小数。",
    syntax: `double r;
scanf("%lf", &r);
printf("%.2f", 3.14 * r * r);`,
    executionSteps: [
      "读取半径 r，使用 double 保存小数。",
      "根据公式 3.14 * r * r 计算面积。",
      "使用 %.2f 输出面积，保留两位小数。"
    ],
    commonMistakes: [
      "scanf 读取 double 时把 %lf 写成 %f。",
      "把 r * r 写成 r + r，公式使用错误。",
      "忘记使用 %.2f，导致输出小数位数不符合题目要求。"
    ],
    referenceSolution: `${includeStdio}int main(void) {
    double r;
    scanf("%lf", &r);

    double area = 3.14 * r * r;
    printf("%.2f", area);

    return 0;
}`,
    extraPractice: [
      "输入长和宽，输出矩形面积，保留两位小数。",
      "输入一个小数 x，输出 x 的平方，保留两位小数。"
    ]
  },
  "level-008": {
    concept:
      "char 用来保存单个字符。读取字符时使用 %c，输出字符时也使用 %c。本关只需要读入一个字符并原样输出。",
    syntax: `char cmd;
scanf(" %c", &cmd);
printf("%c", cmd);`,
    executionSteps: [
      "定义 char 变量 cmd 保存一个字符。",
      "scanf 使用 %c 读取字符，前面的空格可以跳过换行和空白。",
      "printf 使用 %c 输出 cmd 中保存的字符。"
    ],
    commonMistakes: [
      "把字符变量写成 int 或字符串数组，增加不必要复杂度。",
      "scanf 读取字符时忘记 &cmd。",
      "使用 %d 输出字符，导致显示的是字符编码而不是字符本身。"
    ],
    referenceSolution: `${includeStdio}int main(void) {
    char cmd;
    scanf(" %c", &cmd);
    printf("%c", cmd);
    return 0;
}`,
    extraPractice: [
      "输入一个字符，如果是 A 就输出 A。",
      "输入两个字符，分别输出在两行。"
    ]
  },
  "level-009": {
    concept:
      "取模运算 % 可以得到整数除法的余数。判断奇偶时，只需要看 n % 2 是否等于 0。",
    syntax: `if (n % 2 == 0) {
    printf("even");
} else {
    printf("odd");
}`,
    executionSteps: [
      "读取整数 n。",
      "计算 n % 2，得到 n 除以 2 的余数。",
      "余数为 0 时输出 even，否则输出 odd。"
    ],
    commonMistakes: [
      "把 n % 2 == 0 写成 n / 2 == 0，混淆除法和取模。",
      "在 if 条件中把 == 写成 =。",
      "把 0 判断成 odd，导致偶数边界错误。"
    ],
    referenceSolution: `${includeStdio}int main(void) {
    int n;
    scanf("%d", &n);

    if (n % 2 == 0) {
        printf("even");
    } else {
        printf("odd");
    }

    return 0;
}`,
    extraPractice: [
      "输入整数 n，判断它是否能被 3 整除。",
      "输入整数 n，如果 n 是偶数输出 0，否则输出 1。"
    ]
  },
  "level-010": {
    concept:
      "多分支判断可以处理三种或更多情况。本关需要分别判断正数、负数和零，三个分支的顺序要清楚。",
    syntax: `if (n > 0) {
    printf("positive");
} else if (n < 0) {
    printf("negative");
} else {
    printf("zero");
}`,
    executionSteps: [
      "读取整数 n。",
      "先判断 n 是否大于 0，成立则输出 positive。",
      "如果不是正数，再判断 n 是否小于 0，成立则输出 negative。",
      "前两个条件都不成立时，n 只能是 0，输出 zero。"
    ],
    commonMistakes: [
      "只写 if 和 else，漏掉 zero 的单独情况。",
      "把 n < 0 写成 n <= 0，导致 0 被判断成 negative。",
      "多个 if 没有用 else if 连接，可能让逻辑变得混乱。"
    ],
    referenceSolution: `${includeStdio}int main(void) {
    int n;
    scanf("%d", &n);

    if (n > 0) {
        printf("positive");
    } else if (n < 0) {
        printf("negative");
    } else {
        printf("zero");
    }

    return 0;
}`,
    extraPractice: [
      "输入温度，判断 hot、cold 或 normal。",
      "输入成绩，判断 pass 或 fail，并单独处理满分。"
    ]
  }
};

export const levels: Level[] = [
  {
    id: "level-001",
    title: "启动 CodeBot",
    chapter: "第一章：输入输出与变量",
    knowledgePoint: "printf 输出",
    difficulty: "入门",
    description: "输出 Hello CodeBot，唤醒你的机器人。",
    inputFormat: "无输入",
    outputFormat: "输出一行 Hello CodeBot",
    sampleInput: "",
    sampleOutput: "Hello CodeBot",
    starterCode: `${includeStdio}int main(void) {
    // 输出 Hello CodeBot
    return 0;
}`,
    hints: [
      "使用 printf 输出固定文本。",
      "输出内容必须是 Hello CodeBot。",
      "注意 Hello 和 CodeBot 的大小写。",
      "不要额外输出多余说明文字。"
    ],
    tests: [
      { name: "输出问候", input: "", expectedOutput: "Hello CodeBot" },
      { name: "重复检查输出", input: "", expectedOutput: "Hello CodeBot" },
      { name: "隐藏测试：固定文本", input: "", expectedOutput: "Hello CodeBot", hidden: true },
      { name: "隐藏测试：无输入输出", input: "", expectedOutput: "Hello CodeBot", hidden: true }
    ],
    explanation: levelExplanations["level-001"],
    animationRules: [{ output: "Hello CodeBot", action: "wake" }]
  },
  {
    id: "level-002",
    title: "输入电量",
    chapter: "第一章：输入输出与变量",
    knowledgePoint: "int、scanf、printf",
    difficulty: "入门",
    description: "输入一个整数 energy，并输出这个整数。",
    inputFormat: "输入一个整数 energy。",
    outputFormat: "输出 energy 的值。",
    sampleInput: "75",
    sampleOutput: "75",
    starterCode: `${includeStdio}int main(void) {
    int energy;
    // 读取并输出 energy
    return 0;
}`,
    hints: [
      "使用 int 定义 energy。",
      "scanf 读取整数时格式符是 %d。",
      "读取普通变量时通常要写 &energy。",
      "printf 输出整数时也使用 %d。"
    ],
    tests: [
      { name: "输出普通电量", input: "75", expectedOutput: "75" },
      { name: "输出低电量", input: "12", expectedOutput: "12" },
      { name: "隐藏测试：零电量", input: "0", expectedOutput: "0", hidden: true },
      { name: "隐藏测试：负数输入", input: "-5", expectedOutput: "-5", hidden: true }
    ],
    explanation: levelExplanations["level-002"],
    animationRules: [{ output: "75", action: "charge" }]
  },
  {
    id: "level-003",
    title: "能量门",
    chapter: "第二章：条件判断",
    knowledgePoint: "if else、>=",
    difficulty: "基础",
    description: "输入整数 energy，如果 energy >= 60，输出 open，否则输出 close。",
    inputFormat: "输入一个整数 energy。",
    outputFormat: "如果 energy 大于等于 60，输出 open；否则输出 close。",
    sampleInput: "80",
    sampleOutput: "open",
    starterCode: `${includeStdio}int main(void) {
    int energy;
    // 判断 energy 是否足够打开能量门
    return 0;
}`,
    hints: [
      "先用 scanf 读取 energy。",
      "条件判断可以写成 energy >= 60。",
      "if 分支输出 open。",
      "else 分支输出 close。"
    ],
    tests: [
      { name: "电量充足", input: "80", expectedOutput: "open" },
      { name: "电量不足", input: "59", expectedOutput: "close" },
      { name: "隐藏测试：边界值 60", input: "60", expectedOutput: "open", hidden: true },
      { name: "隐藏测试：零电量", input: "0", expectedOutput: "close", hidden: true }
    ],
    explanation: levelExplanations["level-003"],
    animationRules: [
      { output: "open", action: "open-door" },
      { output: "close", action: "stop" }
    ]
  },
  {
    id: "level-004",
    title: "重复移动",
    chapter: "第三章：循环",
    knowledgePoint: "for 循环",
    difficulty: "基础",
    description: "输入整数 n，输出 n 行 move。",
    inputFormat: "输入一个整数 n。",
    outputFormat: "输出 n 行，每行都是 move。",
    sampleInput: "3",
    sampleOutput: "move\nmove\nmove",
    starterCode: `${includeStdio}int main(void) {
    int n;
    // 使用 for 循环输出 n 行 move
    return 0;
}`,
    hints: [
      "先读取 n。",
      "for 循环可以从 i = 0 到 i < n。",
      "每次循环输出一行 move。",
      "注意换行，最后多一个换行通常不会影响判题。"
    ],
    tests: [
      { name: "移动三次", input: "3", expectedOutput: "move\nmove\nmove" },
      { name: "移动一次", input: "1", expectedOutput: "move" },
      { name: "隐藏测试：不移动", input: "0", expectedOutput: "", hidden: true },
      { name: "隐藏测试：移动五次", input: "5", expectedOutput: "move\nmove\nmove\nmove\nmove", hidden: true }
    ],
    explanation: levelExplanations["level-004"],
    animationRules: [{ output: "move", action: "step" }]
  },
  {
    id: "level-005",
    title: "仓库最大能量箱",
    chapter: "第四章：数组",
    knowledgePoint: "数组、循环、最大值",
    difficulty: "进阶",
    description: "输入 5 个整数，输出最大值。",
    inputFormat: "输入 5 个整数。",
    outputFormat: "输出这 5 个整数中的最大值。",
    sampleInput: "3 9 4 8 2",
    sampleOutput: "9",
    starterCode: `${includeStdio}int main(void) {
    int boxes[5];
    // 读取 5 个整数并输出最大值
    return 0;
}`,
    hints: [
      "先把 5 个整数读入数组。",
      "用 boxes[0] 初始化最大值。",
      "从下标 1 开始遍历剩余元素。",
      "如果当前元素更大，就更新最大值。"
    ],
    tests: [
      { name: "最大值在中间", input: "3 9 4 8 2", expectedOutput: "9" },
      { name: "最大值在末尾", input: "1 2 3 4 5", expectedOutput: "5" },
      { name: "隐藏测试：全是负数", input: "-7 -2 -9 -4 -5", expectedOutput: "-2", hidden: true },
      { name: "隐藏测试：最大值重复", input: "6 6 1 2 3", expectedOutput: "6", hidden: true }
    ],
    explanation: levelExplanations["level-005"],
    animationRules: [{ output: "9", action: "collect-max-box" }]
  },
  {
    id: "level-006",
    title: "双数能量合并",
    chapter: "第一章：输入输出与变量",
    knowledgePoint: "scanf、整数加法",
    difficulty: "入门",
    description: "输入两个整数 a 和 b，输出它们的和。",
    inputFormat: "输入两个整数 a 和 b。",
    outputFormat: "输出 a + b 的结果。",
    sampleInput: "3 5",
    sampleOutput: "8",
    starterCode: `${includeStdio}int main(void) {
    int a, b;
    // 读取两个整数并输出它们的和
    return 0;
}`,
    hints: [
      "可以用 int a, b; 定义两个变量。",
      "scanf 可以一次读取两个整数。",
      "两个普通变量读取时都需要加 &。",
      "输出 a + b 的结果即可。"
    ],
    tests: [
      { name: "两个正数", input: "3 5", expectedOutput: "8" },
      { name: "包含负数", input: "-3 8", expectedOutput: "5" },
      { name: "隐藏测试：和为零", input: "-4 4", expectedOutput: "0", hidden: true },
      { name: "隐藏测试：两个零", input: "0 0", expectedOutput: "0", hidden: true }
    ],
    explanation: levelExplanations["level-006"],
    animationRules: [{ output: "8", action: "merge-energy" }]
  },
  {
    id: "level-007",
    title: "圆形能量场面积",
    chapter: "第一章：输入输出与变量",
    knowledgePoint: "double、乘法、格式化输出",
    difficulty: "基础",
    description: "输入圆的半径 r，使用 3.14 作为圆周率，输出圆面积，保留两位小数。",
    inputFormat: "输入一个实数 r。",
    outputFormat: "输出圆面积，保留两位小数。",
    sampleInput: "2",
    sampleOutput: "12.56",
    starterCode: `${includeStdio}int main(void) {
    double r;
    // 计算 3.14 * r * r
    return 0;
}`,
    hints: [
      "半径可以用 double 保存。",
      "面积公式是 3.14 * r * r。",
      "printf(\"%.2f\", area) 可以保留两位小数。",
      "半径为 0 时面积也应为 0.00。"
    ],
    tests: [
      { name: "半径为 2", input: "2", expectedOutput: "12.56" },
      { name: "半径为 1", input: "1", expectedOutput: "3.14" },
      { name: "隐藏测试：半径为 0", input: "0", expectedOutput: "0.00", hidden: true },
      { name: "隐藏测试：半径为 10", input: "10", expectedOutput: "314.00", hidden: true }
    ],
    explanation: levelExplanations["level-007"],
    animationRules: [{ output: "12.56", action: "draw-field" }]
  },
  {
    id: "level-008",
    title: "读取指令字符",
    chapter: "第一章：输入输出与变量",
    knowledgePoint: "char、scanf、printf",
    difficulty: "入门",
    description: "输入一个字符 cmd，并原样输出这个字符。",
    inputFormat: "输入一个字符。",
    outputFormat: "输出这个字符。",
    sampleInput: "A",
    sampleOutput: "A",
    starterCode: `${includeStdio}int main(void) {
    char cmd;
    // 读取并输出一个字符
    return 0;
}`,
    hints: [
      "字符变量使用 char 类型。",
      "读取字符时格式符是 %c。",
      "可以写 scanf(\" %c\", &cmd) 跳过前面的空白。",
      "printf 输出字符时也使用 %c。"
    ],
    tests: [
      { name: "大写字符", input: "A", expectedOutput: "A" },
      { name: "小写字符", input: "z", expectedOutput: "z" },
      { name: "隐藏测试：数字字符", input: "7", expectedOutput: "7", hidden: true },
      { name: "隐藏测试：符号字符", input: "#", expectedOutput: "#", hidden: true }
    ],
    explanation: levelExplanations["level-008"],
    animationRules: [{ output: "A", action: "read-command" }]
  },
  {
    id: "level-009",
    title: "奇偶能量判断",
    chapter: "第二章：条件判断",
    knowledgePoint: "取模、if else",
    difficulty: "基础",
    description: "输入一个整数 n，如果是偶数输出 even，否则输出 odd。",
    inputFormat: "输入一个整数 n。",
    outputFormat: "偶数输出 even，奇数输出 odd。",
    sampleInput: "4",
    sampleOutput: "even",
    starterCode: `${includeStdio}int main(void) {
    int n;
    // 判断 n 是奇数还是偶数
    return 0;
}`,
    hints: [
      "取模运算使用 %。",
      "n % 2 == 0 表示 n 是偶数。",
      "0 也是偶数。",
      "负数也可以用 n % 2 判断奇偶。"
    ],
    tests: [
      { name: "普通偶数", input: "4", expectedOutput: "even" },
      { name: "普通奇数", input: "7", expectedOutput: "odd" },
      { name: "隐藏测试：零", input: "0", expectedOutput: "even", hidden: true },
      { name: "隐藏测试：负奇数", input: "-5", expectedOutput: "odd", hidden: true }
    ],
    explanation: levelExplanations["level-009"],
    animationRules: [{ output: "even", action: "even-path" }]
  },
  {
    id: "level-010",
    title: "正负能量检测",
    chapter: "第二章：条件判断",
    knowledgePoint: "if else if",
    difficulty: "基础",
    description: "输入一个整数 n，判断它是 positive、negative 还是 zero。",
    inputFormat: "输入一个整数 n。",
    outputFormat: "正数输出 positive，负数输出 negative，零输出 zero。",
    sampleInput: "-3",
    sampleOutput: "negative",
    starterCode: `${includeStdio}int main(void) {
    int n;
    // 判断正数、负数或零
    return 0;
}`,
    hints: [
      "n > 0 表示正数。",
      "n < 0 表示负数。",
      "剩下的情况就是零。",
      "可以使用 if、else if、else。"
    ],
    tests: [
      { name: "负数", input: "-3", expectedOutput: "negative" },
      { name: "正数", input: "8", expectedOutput: "positive" },
      { name: "隐藏测试：零", input: "0", expectedOutput: "zero", hidden: true },
      { name: "隐藏测试：一", input: "1", expectedOutput: "positive", hidden: true }
    ],
    explanation: levelExplanations["level-010"],
    animationRules: [{ output: "positive", action: "forward" }]
  },
  {
    id: "level-011",
    title: "三路最大能量",
    chapter: "第二章：条件判断",
    knowledgePoint: "多条件比较",
    difficulty: "基础",
    description: "输入三个整数，输出其中最大值。",
    inputFormat: "输入三个整数 a、b、c。",
    outputFormat: "输出最大值。",
    sampleInput: "3 8 5",
    sampleOutput: "8",
    starterCode: `${includeStdio}int main(void) {
    int a, b, c;
    // 输出三个数中的最大值
    return 0;
}`,
    hints: [
      "可以先假设 a 是最大值。",
      "如果 b 更大，就更新最大值。",
      "如果 c 更大，也更新最大值。",
      "注意三个数可能相等。"
    ],
    tests: [
      { name: "最大值在中间", input: "3 8 5", expectedOutput: "8" },
      { name: "最大值在开头", input: "9 2 4", expectedOutput: "9" },
      { name: "隐藏测试：全相等", input: "6 6 6", expectedOutput: "6", hidden: true },
      { name: "隐藏测试：负数比较", input: "-3 -9 -1", expectedOutput: "-1", hidden: true }
    ],
    animationRules: [{ output: "8", action: "choose-max" }]
  },
  {
    id: "level-012",
    title: "成绩等级门",
    chapter: "第二章：条件判断",
    knowledgePoint: "else if、区间判断",
    difficulty: "基础",
    description: "输入成绩 score，输出等级 A、B、C、D 或 E。",
    inputFormat: "输入一个整数 score。",
    outputFormat: "90 及以上 A，80-89 B，70-79 C，60-69 D，60 以下 E。",
    sampleInput: "85",
    sampleOutput: "B",
    starterCode: `${includeStdio}int main(void) {
    int score;
    // 输出成绩等级
    return 0;
}`,
    hints: [
      "从高分区间开始判断更简单。",
      "score >= 90 输出 A。",
      "使用 else if 处理多个区间。",
      "边界分数 90、80、70、60 很容易写错。"
    ],
    tests: [
      { name: "B 等级", input: "85", expectedOutput: "B" },
      { name: "不及格", input: "59", expectedOutput: "E" },
      { name: "隐藏测试：90 边界", input: "90", expectedOutput: "A", hidden: true },
      { name: "隐藏测试：60 边界", input: "60", expectedOutput: "D", hidden: true }
    ],
    animationRules: [{ output: "A", action: "excellent" }]
  },
  {
    id: "level-013",
    title: "闰年时钟",
    chapter: "第二章：条件判断",
    knowledgePoint: "逻辑运算、闰年规则",
    difficulty: "进阶",
    description: "输入年份 year，判断是否为闰年，是则输出 leap，否则输出 common。",
    inputFormat: "输入一个整数 year。",
    outputFormat: "闰年输出 leap，平年输出 common。",
    sampleInput: "2024",
    sampleOutput: "leap",
    starterCode: `${includeStdio}int main(void) {
    int year;
    // 判断是否为闰年
    return 0;
}`,
    hints: [
      "能被 400 整除是闰年。",
      "能被 4 整除但不能被 100 整除也是闰年。",
      "可以使用 && 和 || 组合条件。",
      "1900 不是闰年，2000 是闰年。"
    ],
    tests: [
      { name: "普通闰年", input: "2024", expectedOutput: "leap" },
      { name: "普通平年", input: "2023", expectedOutput: "common" },
      { name: "隐藏测试：世纪平年", input: "1900", expectedOutput: "common", hidden: true },
      { name: "隐藏测试：世纪闰年", input: "2000", expectedOutput: "leap", hidden: true }
    ],
    animationRules: [{ output: "leap", action: "time-jump" }]
  },
  {
    id: "level-014",
    title: "编号路线输出",
    chapter: "第三章：循环",
    knowledgePoint: "for 循环、连续输出",
    difficulty: "基础",
    description: "输入整数 n，输出 1 到 n，数字之间用一个空格分隔。",
    inputFormat: "输入一个整数 n。",
    outputFormat: "输出 1 到 n，用空格分隔。",
    sampleInput: "5",
    sampleOutput: "1 2 3 4 5",
    starterCode: `${includeStdio}int main(void) {
    int n;
    // 输出 1 到 n
    return 0;
}`,
    hints: [
      "for 循环可以从 i = 1 开始。",
      "循环条件可以写 i <= n。",
      "输出数字后处理空格。",
      "n = 1 时只输出 1。"
    ],
    tests: [
      { name: "输出 1 到 5", input: "5", expectedOutput: "1 2 3 4 5" },
      { name: "输出单个数", input: "1", expectedOutput: "1" },
      { name: "隐藏测试：输出 1 到 3", input: "3", expectedOutput: "1 2 3", hidden: true },
      { name: "隐藏测试：输出 1 到 10", input: "10", expectedOutput: "1 2 3 4 5 6 7 8 9 10", hidden: true }
    ],
    animationRules: [{ output: "1 2 3", action: "number-route" }]
  },
  {
    id: "level-015",
    title: "前 n 项能量和",
    chapter: "第三章：循环",
    knowledgePoint: "循环累加",
    difficulty: "基础",
    description: "输入整数 n，输出 1 到 n 的和。",
    inputFormat: "输入一个整数 n。",
    outputFormat: "输出 1 + 2 + ... + n 的结果。",
    sampleInput: "5",
    sampleOutput: "15",
    starterCode: `${includeStdio}int main(void) {
    int n;
    // 求 1 到 n 的和
    return 0;
}`,
    hints: [
      "定义 sum 保存累加结果。",
      "sum 初始值应该是 0。",
      "循环中执行 sum += i。",
      "n = 0 时结果应该是 0。"
    ],
    tests: [
      { name: "前 5 项和", input: "5", expectedOutput: "15" },
      { name: "前 1 项和", input: "1", expectedOutput: "1" },
      { name: "隐藏测试：n 为 0", input: "0", expectedOutput: "0", hidden: true },
      { name: "隐藏测试：前 100 项和", input: "100", expectedOutput: "5050", hidden: true }
    ],
    animationRules: [{ output: "15", action: "sum-energy" }]
  },
  {
    id: "level-016",
    title: "阶乘能量核心",
    chapter: "第三章：循环",
    knowledgePoint: "阶乘、循环乘法",
    difficulty: "基础",
    description: "输入整数 n，输出 n!。",
    inputFormat: "输入一个整数 n，范围 0 到 10。",
    outputFormat: "输出 n 的阶乘。",
    sampleInput: "5",
    sampleOutput: "120",
    starterCode: `${includeStdio}int main(void) {
    int n;
    // 计算 n!
    return 0;
}`,
    hints: [
      "阶乘是从 1 乘到 n。",
      "结果变量初始值应该是 1。",
      "0! 的结果也是 1。",
      "本关可以使用 int 保存结果。"
    ],
    tests: [
      { name: "5 的阶乘", input: "5", expectedOutput: "120" },
      { name: "1 的阶乘", input: "1", expectedOutput: "1" },
      { name: "隐藏测试：0 的阶乘", input: "0", expectedOutput: "1", hidden: true },
      { name: "隐藏测试：7 的阶乘", input: "7", expectedOutput: "5040", hidden: true }
    ],
    animationRules: [{ output: "120", action: "power-core" }]
  },
  {
    id: "level-017",
    title: "素数通行证",
    chapter: "第三章：循环",
    knowledgePoint: "循环、取模、素数",
    difficulty: "进阶",
    description: "输入整数 n，判断是否为素数，是则输出 prime，否则输出 not prime。",
    inputFormat: "输入一个整数 n。",
    outputFormat: "素数输出 prime，否则输出 not prime。",
    sampleInput: "7",
    sampleOutput: "prime",
    starterCode: `${includeStdio}int main(void) {
    int n;
    // 判断 n 是否为素数
    return 0;
}`,
    hints: [
      "小于 2 的数不是素数。",
      "从 2 开始尝试整除 n。",
      "如果能整除，说明不是素数。",
      "可以只检查到 i * i <= n。"
    ],
    tests: [
      { name: "普通素数", input: "7", expectedOutput: "prime" },
      { name: "普通合数", input: "9", expectedOutput: "not prime" },
      { name: "隐藏测试：1 不是素数", input: "1", expectedOutput: "not prime", hidden: true },
      { name: "隐藏测试：2 是素数", input: "2", expectedOutput: "prime", hidden: true }
    ],
    animationRules: [{ output: "prime", action: "prime-pass" }]
  },
  {
    id: "level-018",
    title: "数组能量总和",
    chapter: "第四章：数组",
    knowledgePoint: "数组、循环、求和",
    difficulty: "基础",
    description: "输入 5 个整数，输出它们的和。",
    inputFormat: "输入 5 个整数。",
    outputFormat: "输出数组元素总和。",
    sampleInput: "1 2 3 4 5",
    sampleOutput: "15",
    starterCode: `${includeStdio}int main(void) {
    int a[5];
    // 读取数组并求和
    return 0;
}`,
    hints: [
      "定义长度为 5 的 int 数组。",
      "用循环读取 5 个元素。",
      "sum 初始值应该是 0。",
      "循环中把每个元素加到 sum。"
    ],
    tests: [
      { name: "连续正数", input: "1 2 3 4 5", expectedOutput: "15" },
      { name: "包含负数", input: "-1 2 -3 4 -5", expectedOutput: "-3" },
      { name: "隐藏测试：全为零", input: "0 0 0 0 0", expectedOutput: "0", hidden: true },
      { name: "隐藏测试：全为负数", input: "-1 -2 -3 -4 -5", expectedOutput: "-15", hidden: true }
    ],
    animationRules: [{ output: "15", action: "sum-array" }]
  },
  {
    id: "level-019",
    title: "数组最小能量箱",
    chapter: "第四章：数组",
    knowledgePoint: "数组、循环、最小值",
    difficulty: "基础",
    description: "输入 5 个整数，输出最小值。",
    inputFormat: "输入 5 个整数。",
    outputFormat: "输出这 5 个整数中的最小值。",
    sampleInput: "3 9 4 8 2",
    sampleOutput: "2",
    starterCode: `${includeStdio}int main(void) {
    int a[5];
    // 读取数组并输出最小值
    return 0;
}`,
    hints: [
      "先读取 5 个整数。",
      "可以用 a[0] 初始化最小值。",
      "如果当前元素更小，就更新最小值。",
      "注意负数比较时不要把初始值写成 0。"
    ],
    tests: [
      { name: "最小值在末尾", input: "3 9 4 8 2", expectedOutput: "2" },
      { name: "最小值在开头", input: "1 2 3 4 5", expectedOutput: "1" },
      { name: "隐藏测试：全是负数", input: "-7 -2 -9 -4 -5", expectedOutput: "-9", hidden: true },
      { name: "隐藏测试：最小值重复", input: "6 1 1 2 3", expectedOutput: "1", hidden: true }
    ],
    animationRules: [{ output: "2", action: "find-min-box" }]
  },
  {
    id: "level-020",
    title: "数组右移传送带",
    chapter: "第四章：数组",
    knowledgePoint: "数组、取模、循环移动",
    difficulty: "进阶",
    description: "输入 5 个整数和右移位数 m，将数组循环右移 m 位后输出。",
    inputFormat: "第一行输入 5 个整数，第二行输入整数 m。",
    outputFormat: "输出右移后的 5 个整数，用空格分隔。",
    sampleInput: "1 2 3 4 5\n2",
    sampleOutput: "4 5 1 2 3",
    starterCode: `${includeStdio}int main(void) {
    int a[5];
    int m;
    // 将数组循环右移 m 位
    return 0;
}`,
    hints: [
      "先读取 5 个数组元素和 m。",
      "m 可能大于 5，可以先计算 m % 5。",
      "右移后新位置可以用 (i + m) % 5。",
      "输出时注意空格格式。"
    ],
    tests: [
      { name: "右移两位", input: "1 2 3 4 5\n2", expectedOutput: "4 5 1 2 3" },
      { name: "右移一位", input: "1 2 3 4 5\n1", expectedOutput: "5 1 2 3 4" },
      { name: "隐藏测试：右移零位", input: "1 2 3 4 5\n0", expectedOutput: "1 2 3 4 5", hidden: true },
      { name: "隐藏测试：m 大于长度", input: "1 2 3 4 5\n7", expectedOutput: "4 5 1 2 3", hidden: true }
    ],
    animationRules: [{ output: "4 5 1 2 3", action: "rotate-array" }]
  }
];
