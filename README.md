# CodeBot C 编程实验室

CodeBot C 编程实验室是一个 Web 版 C 语言编程教学游戏。学生在网页中编写 C 语言代码，系统可以编译运行代码、根据关卡测试自动判题，并在出错时给出适合初学者阅读的中文诊断。项目还提供错题本和教师数据面板，方便课程展示和学习复盘。

## 项目背景

C 语言入门学习常见问题包括语法错误难理解、边界条件容易漏测、运行结果和题目要求不一致时不知道如何定位。CodeBot 通过“写代码控制机器人闯关”的形式，把输出结果、判题反馈、错误诊断和学习数据结合起来，让学生更直观地理解 C 程序的执行结果。

## 项目目标

- 提供一个可以在浏览器中完成 C 语言练习的教学实验环境。
- 用 20 个学习关卡覆盖输入输出、变量、条件判断、循环和数组基础知识。
- 支持 C 代码在线编译运行和基于测试点的自动判题。
- 用中文错误诊断降低初学者理解 gcc 报错的门槛。
- 用错题本记录提交失败的代码和诊断，方便复习。
- 用教师数据面板展示模拟学习数据，支持课程答辩展示。

## 核心功能

- 首页导航和项目能力展示
- 关卡列表和关卡详情
- Monaco Editor C 代码编辑器
- `POST /api/run-c` 在线编译运行 C 代码
- `POST /api/submit-level` 自动判题
- 中文错误诊断
- 错题本 localStorage 持久化
- 学习进度 localStorage 持久化
- 关卡知识讲解和参考答案折叠展示
- 教师数据面板 mock 统计

## 技术栈

- 前端：React + Vite + TypeScript
- 路由：React Router
- 代码编辑器：Monaco Editor
- 后端：Node.js + Express + TypeScript
- C 编译运行：gcc
- 测试：Vitest + Testing Library + Supertest
- 数据：本地 TypeScript 数据文件和前端 mock 数据
- 部署目标：Replit
- 代码管理：Git + GitHub

## 项目目录结构

```text
.
├── backend/
│   ├── src/
│   │   ├── data/
│   │   │   └── levels.ts
│   │   ├── routes/
│   │   │   ├── health.ts
│   │   │   ├── levels.ts
│   │   │   ├── runC.ts
│   │   │   └── submitLevel.ts
│   │   ├── services/
│   │   │   ├── cRunner.ts
│   │   │   ├── judge.ts
│   │   │   └── levels.ts
│   │   ├── types/
│   │   │   └── judge.ts
│   │   ├── utils/
│   │   │   ├── safeExec.ts
│   │   │   └── tempDir.ts
│   │   ├── app.ts
│   │   ├── server.ts
│   │   ├── app.test.ts
│   │   ├── runC.test.ts
│   │   └── submitLevel.test.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── code.ts
│   │   │   └── levels.ts
│   │   ├── components/
│   │   │   ├── ActionButtons.tsx
│   │   │   ├── CodeEditorPanel.tsx
│   │   │   ├── CodeEditorPlaceholder.tsx
│   │   │   ├── GameMap.tsx
│   │   │   ├── HintPanel.tsx
│   │   │   ├── LevelCard.tsx
│   │   │   └── ResultPanel.tsx
│   │   ├── data/
│   │   │   └── analytics.ts
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── LevelDetailPage.tsx
│   │   │   ├── LevelListPage.tsx
│   │   │   ├── MistakesPage.tsx
│   │   │   └── TeacherDashboardPage.tsx
│   │   ├── test/
│   │   │   └── setup.ts
│   │   ├── types/
│   │   │   └── level.ts
│   │   ├── utils/
│   │   │   ├── errorDiagnosis.ts
│   │   │   ├── errorDiagnosis.test.ts
│   │   │   └── mistakes.ts
│   │   ├── App.test.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── styles.css
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── package.json
├── package-lock.json
└── README.md
```

## 环境要求

- Node.js
- npm
- gcc

Windows 下检查 gcc：

```bash
gcc --version
```

如果提示找不到命令，需要安装 MinGW-w64、MSYS2 或其他提供 gcc 的工具链，并把 gcc 所在目录加入 `PATH`。

## 本地运行方法

安装依赖：

```bash
npm install
```

同时启动前端和后端：

```bash
npm run dev
```

默认服务：

- 前端：Vite 输出的本地地址，通常是 `http://localhost:5173`
- 后端：`http://localhost:3001`

后端端口读取 `process.env.PORT`，没有设置时使用 `3001`。

## 测试命令

```bash
npm test
```

该命令会运行前端和后端 workspace 中的测试。

## 构建命令

```bash
npm run build
```

该命令会执行前端 TypeScript 检查和 Vite 构建，并编译后端 TypeScript。

## Replit 部署检查

当前项目结构适合在 Replit 上作为 Node.js 项目运行：

- 根目录使用 npm workspaces。
- `npm install` 可安装前后端依赖。
- `npm run dev` 会同时启动前端和后端。
- 后端监听 `process.env.PORT` 或默认 `3001`。
- 项目没有依赖本地绝对路径。

Replit 环境必须提供 gcc，`/api/run-c` 和 `/api/submit-level` 才能编译运行 C 代码。部署前建议在 Replit Shell 中执行：

```bash
gcc --version
```

如果 Replit 环境没有 gcc，需要先安装或换用支持 gcc 的运行环境。不要在没有 gcc 的环境中把 C 运行接口当作可用功能展示。

## 页面路径说明

- `/`：首页，展示项目简介、核心功能和主要入口。
- `/levels`：关卡列表页，展示 5 个 C 语言学习关卡。
- `/levels/:id`：关卡详情页，例如 `/levels/level-003`。
- `/mistakes`：错题本页面，展示提交失败记录。
- `/teacher-dashboard`：教师数据面板页面，展示 mock 学习统计。

## 后端接口说明

### GET /api/health

健康检查接口。

```bash
curl http://localhost:3001/api/health
```

返回：

```json
{
  "ok": true,
  "message": "CodeBot backend is running"
}
```

### GET /api/levels

获取关卡列表。列表接口返回轻量字段，不返回完整 `tests` 和 `starterCode`。

```bash
curl http://localhost:3001/api/levels
```

主要字段：

- `id`
- `title`
- `chapter`
- `knowledgePoint`
- `difficulty`
- `description`

### GET /api/levels/:id

获取关卡详情。

```bash
curl http://localhost:3001/api/levels/level-001
```

详情字段包含：

- 关卡基础信息
- `inputFormat`
- `outputFormat`
- `sampleInput`
- `sampleOutput`
- `starterCode`
- `hints`
- `tests`
- `animationRules`

不存在的关卡返回 404：

```json
{
  "error": "Level not found"
}
```

### POST /api/run-c

编译并运行一段 C 语言代码。

请求示例：

```bash
curl -X POST http://localhost:3001/api/run-c \
  -H "Content-Type: application/json" \
  -d "{\"code\":\"#include <stdio.h>\\nint main(){printf(\\\"Hello CodeBot\\\");return 0;}\",\"stdin\":\"\"}"
```

请求格式：

```json
{
  "code": "C语言代码",
  "stdin": "标准输入内容"
}
```

成功返回：

```json
{
  "status": "success",
  "stdout": "Hello CodeBot",
  "stderr": "",
  "timeMs": 123
}
```

常见状态：

- `success`
- `compile_error`
- `timeout`
- `runtime_error`

### POST /api/submit-level

提交某个关卡的 C 代码并自动判题。

请求示例：

```bash
curl -X POST http://localhost:3001/api/submit-level \
  -H "Content-Type: application/json" \
  -d "{\"levelId\":\"level-003\",\"code\":\"#include <stdio.h>\\nint main(){int energy;scanf(\\\"%d\\\",&energy);if(energy>=60){printf(\\\"open\\\");}else{printf(\\\"close\\\");}return 0;}\"}"
```

请求格式：

```json
{
  "levelId": "level-003",
  "code": "用户提交的 C 语言代码"
}
```

返回字段：

- `passed`
- `score`
- `errorType`
- `message`
- `results`
- `stderr`，仅部分错误场景返回

## 关卡说明

当前项目包含 20 个学习关卡，每个关卡都包含任务说明、starterCode、提示、样例和至少 4 个测试点：

| 关卡 | 标题 | 知识点 | 任务 |
| --- | --- | --- | --- |
| level-001 | 启动 CodeBot | printf 输出 | 输出 `Hello CodeBot` |
| level-002 | 输入电量 | int、scanf、printf | 输入一个整数并输出 |
| level-003 | 能量门 | if else、>= | `energy >= 60` 输出 `open`，否则输出 `close` |
| level-004 | 重复移动 | for 循环 | 输入 n，输出 n 行 `move` |
| level-005 | 仓库最大能量箱 | 数组、循环、最大值 | 输入 5 个整数，输出最大值 |
| level-006 | 双数能量合并 | int、scanf、printf、加法 | 输入两个整数，输出它们的和 |
| level-007 | 圆形能量场面积 | double、格式化输出 | 输入半径，输出圆面积并保留两位小数 |
| level-008 | 读取指令字符 | char、scanf、printf | 输入一个字符并原样输出 |
| level-009 | 奇偶能量判断 | `%`、if else | 输入整数，判断 `odd` 或 `even` |
| level-010 | 正负能量检测 | if else if | 输入整数，输出 `positive`、`negative` 或 `zero` |
| level-011 | 三路最大能量 | 多条件最大值 | 输入三个整数，输出最大值 |
| level-012 | 成绩等级门 | if else if、区间判断 | 输入成绩，输出 A、B、C、D 或 F |
| level-013 | 闰年时钟 | 逻辑运算、闰年规则 | 输入年份，判断 `leap` 或 `common` |
| level-014 | 编号路线输出 | for 循环 | 输入 n，输出 1 到 n |
| level-015 | 前 n 项能量和 | 循环累加 | 输入 n，输出 1 到 n 的和 |
| level-016 | 阶乘能量核心 | 循环乘法 | 输入 n，输出 n 的阶乘 |
| level-017 | 素数通行证 | 循环、取模、标记变量 | 输入整数，判断 `prime` 或 `not prime` |
| level-018 | 数组能量总和 | 数组、循环、求和 | 输入 5 个整数，输出总和 |
| level-019 | 数组最小能量箱 | 数组、循环、最小值 | 输入 5 个整数，输出最小值 |
| level-020 | 数组右移传送带 | 数组、取模、循环移动 | 输入 5 个整数和 m，输出右移 m 位后的数组 |

新增关卡的数据集中维护在 `backend/src/data/levels.ts`，前端通过 `/api/levels` 和 `/api/levels/:id` 获取关卡，不在页面中写死完整关卡内容。

## 关卡知识讲解说明

第十二阶段新增了每关知识点讲解系统。当前已为 `level-001` 到 `level-010` 补充完整讲解内容，覆盖：

- 知识点概念说明
- 核心语法格式
- 程序执行步骤
- 初学者常见错误
- 参考答案代码
- 变式练习

讲解数据维护在关卡详情的 `explanation` 字段中，结构如下：

```ts
explanation: {
  concept: string;
  syntax: string;
  executionSteps: string[];
  commonMistakes: string[];
  referenceSolution: string;
  extraPractice: string[];
}
```

关卡详情页会在练习区下方显示“知识讲解”。参考答案默认隐藏，点击“显示参考答案”后展开，再次点击可以收起。这样可以先鼓励学生独立完成，再在卡住时查看答案对照。

## 判题流程

1. 根据 `levelId` 查找关卡。
2. 校验提交的 `code`。
3. 读取该关卡的 `tests`。
4. 对每个测试点调用 C runner 编译运行代码。
5. 如果出现编译错误、运行超时或运行错误，停止后续测试并返回对应错误类型。
6. 如果运行成功，对比 `stdout` 和 `expectedOutput`。
7. 当前比较规则是对两边执行 `trim()` 后比较。
8. 按通过测试数计算分数：`通过数 / 总测试数 * 100`，四舍五入。
9. 当前阶段 hidden 测试仍会返回完整输入输出，前端用于教学展示。

## 错误诊断说明

前端根据后端返回的错误类型、`stderr`、用户代码和判题结果生成中文诊断。支持：

- `compile_error`
- `timeout`
- `runtime_error`
- `wrong_answer`
- `network_error`
- `invalid_request`
- `level_not_found`

常见 C 语言错误识别：

- `scanf("%d", x)`：提示普通变量通常需要写成 `scanf("%d", &x)`。
- `if (x = 0)`：提示 `=` 是赋值，`==` 才是判断相等。
- gcc 输出包含 `expected ';'`：提示可能缺少分号。
- `cmd == "start"`：提示 C 字符串不能直接用 `==` 比较内容，应使用 `strcmp`。
- 访问 `a[5]`：提示 5 个元素数组的合法下标是 0 到 4。
- `while(1)` 或 `for(;;)` 且超时：提示存在明显无限循环，需要设置退出条件。

## 错题本说明

错题本页面路径是 `/mistakes`。

错题本使用浏览器 `localStorage` 保存提交失败记录，不使用数据库。普通运行失败不会写入错题本，只有提交失败才记录。

记录字段包括：

- 关卡 ID
- 关卡标题
- 知识点
- 提交代码
- 错误类型
- 错误说明
- 中文诊断
- 得分
- 时间

保存规则：

- 每次提交失败新增一条记录。
- 新记录排在最前面。
- 最多保存 50 条。
- 刷新页面后仍然存在。
- 支持删除单条记录和清空全部记录。

## 学习进度说明

学习进度使用浏览器 `localStorage` 保存，不需要账号、不接数据库。系统会记录每个关卡的个人学习状态：

- 是否已通过
- 历史最高分
- 提交次数
- 最近提交时间
- 最近一次提交代码

每次提交关卡后都会更新进度。如果本次分数高于历史最高分，会更新 `bestScore`；如果本次判题通过，会标记该关卡已完成；最近一次提交的代码会保存为 `lastCode`。

学习进度会用于：

- 首页显示总关卡数、已完成关卡数、当前完成率和最近学习关卡。
- 首页提供“继续学习”入口，跳转到最近学习的关卡。
- 关卡列表显示每个关卡的“未开始 / 练习中 / 已通过”、最高分和提交次数。
- 进入关卡详情时，如果存在上次提交代码，会默认恢复上次代码；仍然可以点击“重置”恢复 starterCode。

注意：清理浏览器数据、更换浏览器或更换设备会导致 localStorage 中的学习进度丢失。

首页提供“清空学习进度”按钮，点击前会弹出确认提示。该操作只清空学习进度，不会删除错题本记录。

## 教师数据面板说明

教师数据面板页面路径是 `/teacher-dashboard`。

当前使用前端 mock 数据，不连接真实数据库。展示内容包括：

- 学生人数
- 总提交次数
- 平均通过率
- 最薄弱知识点
- 20 个关卡通过率
- 错误类型分布
- 知识点掌握情况
- 教学建议

教学建议会根据 mock 数据中的最常见错误类型生成。例如当前 `wrong_answer` 较多，因此建议重点讲解输出格式、条件判断和边界值。

## 安全限制说明

`/api/run-c` 会编译并运行用户提交的 C 代码。当前实现已经包含一些基础限制：

- 每次请求使用独立临时目录。
- 用户代码写入系统临时目录，不写入项目源码目录。
- gcc 编译超时限制。
- 程序运行超时限制。
- stdout 和 stderr 长度限制。
- `finally` 清理临时目录。
- 捕获编译、运行和进程错误，避免后端进程崩溃。

但这仍然只是课程演示级运行环境，不是生产级在线判题沙箱。它不能替代容器隔离、权限隔离、系统调用限制、网络隔离、CPU 和内存配额等生产安全措施。不要把当前实现用于公开互联网环境运行不可信代码。

## 答辩展示流程

1. 打开首页，介绍项目目标和核心功能。
2. 进入关卡列表，展示 20 个 C 语言学习关卡。
3. 进入 `level-003` 能量门关卡，展示 Monaco Editor 和任务说明。
4. 点击运行，展示 C 代码运行结果。
5. 点击提交，展示自动判题结果。
6. 故意提交 `energy > 60` 的错误代码，展示隐藏边界测试失败。
7. 展示错误诊断区域，说明系统如何帮助初学者理解错误。
8. 打开错题本，展示提交失败记录、代码和诊断。
9. 打开教师数据面板，展示学习数据统计和教学建议。

## 后续扩展方向

- Replit 部署配置进一步固化。
- 更完整的机器人动画反馈。
- 为 `level-011` 到 `level-020` 补全同质量知识讲解。
- 更丰富的关卡内容和章节体系。
- 更细粒度的错误诊断规则。
- 后端沙箱隔离方案。
- 教师端真实班级数据统计。
- 用户体系和学习进度持久化。
