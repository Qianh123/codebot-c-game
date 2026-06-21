export type LevelAnalytics = {
  levelId: string;
  levelTitle: string;
  knowledgePoint: string;
  passRate: number;
  averageScore: number;
  averageSubmitCount: number;
  compileErrorCount: number;
  wrongAnswerCount: number;
  timeoutCount: number;
  runtimeErrorCount: number;
  hintUsedCount: number;
};

export type ClassAnalyticsSummary = {
  totalStudents: number;
  totalSubmissions: number;
  averagePassRate: number;
  mostDifficultLevel: string;
  mostCommonError: "compile_error" | "wrong_answer" | "timeout" | "runtime_error";
  weakestKnowledgePoint: string;
};

export const classAnalyticsSummary: ClassAnalyticsSummary = {
  totalStudents: 32,
  totalSubmissions: 842,
  averagePassRate: 68,
  mostDifficultLevel: "数组右移传送带",
  mostCommonError: "wrong_answer",
  weakestKnowledgePoint: "数组与循环综合"
};

export const levelAnalytics: LevelAnalytics[] = [
  {
    levelId: "level-001",
    levelTitle: "启动 CodeBot",
    knowledgePoint: "printf 输出",
    passRate: 94,
    averageScore: 96,
    averageSubmitCount: 1.2,
    compileErrorCount: 6,
    wrongAnswerCount: 4,
    timeoutCount: 0,
    runtimeErrorCount: 0,
    hintUsedCount: 8
  },
  {
    levelId: "level-002",
    levelTitle: "输入电量",
    knowledgePoint: "scanf 输入",
    passRate: 82,
    averageScore: 86,
    averageSubmitCount: 1.8,
    compileErrorCount: 12,
    wrongAnswerCount: 10,
    timeoutCount: 1,
    runtimeErrorCount: 3,
    hintUsedCount: 16
  },
  {
    levelId: "level-003",
    levelTitle: "能量门",
    knowledgePoint: "if else 判断",
    passRate: 65,
    averageScore: 72,
    averageSubmitCount: 2.6,
    compileErrorCount: 14,
    wrongAnswerCount: 34,
    timeoutCount: 2,
    runtimeErrorCount: 1,
    hintUsedCount: 28
  },
  {
    levelId: "level-004",
    levelTitle: "重复移动",
    knowledgePoint: "for 循环",
    passRate: 70,
    averageScore: 75,
    averageSubmitCount: 2.4,
    compileErrorCount: 10,
    wrongAnswerCount: 18,
    timeoutCount: 12,
    runtimeErrorCount: 2,
    hintUsedCount: 24
  },
  {
    levelId: "level-005",
    levelTitle: "仓库最大能量箱",
    knowledgePoint: "数组最大值",
    passRate: 49,
    averageScore: 61,
    averageSubmitCount: 3.4,
    compileErrorCount: 18,
    wrongAnswerCount: 31,
    timeoutCount: 6,
    runtimeErrorCount: 9,
    hintUsedCount: 33
  },
  {
    levelId: "level-006",
    levelTitle: "双数能量合并",
    knowledgePoint: "整数加法",
    passRate: 86,
    averageScore: 89,
    averageSubmitCount: 1.6,
    compileErrorCount: 9,
    wrongAnswerCount: 8,
    timeoutCount: 0,
    runtimeErrorCount: 1,
    hintUsedCount: 14
  },
  {
    levelId: "level-007",
    levelTitle: "圆形能量场面积",
    knowledgePoint: "double 与格式化输出",
    passRate: 73,
    averageScore: 78,
    averageSubmitCount: 2.1,
    compileErrorCount: 11,
    wrongAnswerCount: 22,
    timeoutCount: 0,
    runtimeErrorCount: 1,
    hintUsedCount: 25
  },
  {
    levelId: "level-008",
    levelTitle: "读取指令字符",
    knowledgePoint: "char 输入输出",
    passRate: 80,
    averageScore: 84,
    averageSubmitCount: 1.8,
    compileErrorCount: 10,
    wrongAnswerCount: 13,
    timeoutCount: 0,
    runtimeErrorCount: 2,
    hintUsedCount: 18
  },
  {
    levelId: "level-009",
    levelTitle: "奇偶能量判断",
    knowledgePoint: "取模与 if else",
    passRate: 76,
    averageScore: 81,
    averageSubmitCount: 2.0,
    compileErrorCount: 8,
    wrongAnswerCount: 19,
    timeoutCount: 1,
    runtimeErrorCount: 1,
    hintUsedCount: 21
  },
  {
    levelId: "level-010",
    levelTitle: "正负能量检测",
    knowledgePoint: "多分支判断",
    passRate: 72,
    averageScore: 77,
    averageSubmitCount: 2.2,
    compileErrorCount: 10,
    wrongAnswerCount: 23,
    timeoutCount: 1,
    runtimeErrorCount: 1,
    hintUsedCount: 24
  },
  {
    levelId: "level-011",
    levelTitle: "三路最大能量",
    knowledgePoint: "最大值判断",
    passRate: 67,
    averageScore: 72,
    averageSubmitCount: 2.8,
    compileErrorCount: 12,
    wrongAnswerCount: 30,
    timeoutCount: 1,
    runtimeErrorCount: 2,
    hintUsedCount: 31
  },
  {
    levelId: "level-012",
    levelTitle: "成绩等级门",
    knowledgePoint: "if else if",
    passRate: 61,
    averageScore: 69,
    averageSubmitCount: 3.0,
    compileErrorCount: 13,
    wrongAnswerCount: 36,
    timeoutCount: 2,
    runtimeErrorCount: 1,
    hintUsedCount: 34
  },
  {
    levelId: "level-013",
    levelTitle: "闰年时钟",
    knowledgePoint: "逻辑运算",
    passRate: 55,
    averageScore: 64,
    averageSubmitCount: 3.3,
    compileErrorCount: 14,
    wrongAnswerCount: 42,
    timeoutCount: 2,
    runtimeErrorCount: 1,
    hintUsedCount: 38
  },
  {
    levelId: "level-014",
    levelTitle: "编号路线输出",
    knowledgePoint: "for 循环输出",
    passRate: 74,
    averageScore: 79,
    averageSubmitCount: 2.1,
    compileErrorCount: 9,
    wrongAnswerCount: 18,
    timeoutCount: 7,
    runtimeErrorCount: 1,
    hintUsedCount: 23
  },
  {
    levelId: "level-015",
    levelTitle: "前 n 项能量和",
    knowledgePoint: "循环累加",
    passRate: 70,
    averageScore: 76,
    averageSubmitCount: 2.4,
    compileErrorCount: 10,
    wrongAnswerCount: 24,
    timeoutCount: 6,
    runtimeErrorCount: 1,
    hintUsedCount: 27
  },
  {
    levelId: "level-016",
    levelTitle: "阶乘能量核心",
    knowledgePoint: "循环乘法",
    passRate: 63,
    averageScore: 70,
    averageSubmitCount: 2.9,
    compileErrorCount: 12,
    wrongAnswerCount: 32,
    timeoutCount: 8,
    runtimeErrorCount: 2,
    hintUsedCount: 35
  },
  {
    levelId: "level-017",
    levelTitle: "素数通行证",
    knowledgePoint: "循环与标记变量",
    passRate: 52,
    averageScore: 62,
    averageSubmitCount: 3.5,
    compileErrorCount: 14,
    wrongAnswerCount: 46,
    timeoutCount: 11,
    runtimeErrorCount: 2,
    hintUsedCount: 43
  },
  {
    levelId: "level-018",
    levelTitle: "数组能量总和",
    knowledgePoint: "数组求和",
    passRate: 66,
    averageScore: 72,
    averageSubmitCount: 2.7,
    compileErrorCount: 13,
    wrongAnswerCount: 27,
    timeoutCount: 5,
    runtimeErrorCount: 5,
    hintUsedCount: 32
  },
  {
    levelId: "level-019",
    levelTitle: "数组最小能量箱",
    knowledgePoint: "数组最小值",
    passRate: 58,
    averageScore: 67,
    averageSubmitCount: 3.1,
    compileErrorCount: 15,
    wrongAnswerCount: 35,
    timeoutCount: 5,
    runtimeErrorCount: 7,
    hintUsedCount: 37
  },
  {
    levelId: "level-020",
    levelTitle: "数组右移传送带",
    knowledgePoint: "数组与循环综合",
    passRate: 44,
    averageScore: 56,
    averageSubmitCount: 4.0,
    compileErrorCount: 17,
    wrongAnswerCount: 52,
    timeoutCount: 10,
    runtimeErrorCount: 11,
    hintUsedCount: 48
  }
];
