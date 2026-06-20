# CodeBot C 编程实验室

CodeBot C 编程实验室是一个 Web 版 C 语言编程教学游戏。玩家在网页中编写 C 语言代码，系统后续会编译运行代码，并根据输出结果控制机器人动画、给出自动判题反馈。

当前阶段已实现前端真实运行和真实判题接口接入。用户可以在关卡详情页编辑 C 代码、输入自定义 stdin、运行程序并提交关卡判题。

## 技术栈

- 前端：React + Vite + TypeScript
- 后端：Node.js + Express + TypeScript
- 代码编辑器：Monaco Editor
- C 编译：gcc
- 数据：第一版使用本地 JSON 或 TypeScript 数据文件
- 部署目标：Replit
- 代码管理：Git + GitHub

## 目录结构

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
│   │   ├── app.test.ts
│   │   ├── app.ts
│   │   ├── runC.test.ts
│   │   ├── submitLevel.test.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── code.ts
│   │   │   └── levels.ts
│   │   ├── components/
│   │   │   ├── ActionButtons.tsx
│   │   │   ├── CodeEditorPlaceholder.tsx
│   │   │   ├── CodeEditorPanel.tsx
│   │   │   ├── GameMap.tsx
│   │   │   ├── HintPanel.tsx
│   │   │   ├── LevelCard.tsx
│   │   │   └── ResultPanel.tsx
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── LevelDetailPage.tsx
│   │   │   └── LevelListPage.tsx
│   │   ├── test/
│   │   │   └── setup.ts
│   │   ├── types/
│   │   │   └── level.ts
│   │   ├── App.test.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── .gitignore
├── package.json
└── README.md
```

## 安装

```bash
npm install
```

## 运行

同时启动前端和后端：

```bash
npm run dev
```

默认服务：

- 前端：Vite 会输出本地访问地址，通常是 `http://localhost:5173`
- 后端：`http://localhost:3001`

## 测试后端健康检查

启动服务后访问：

```bash
curl http://localhost:3001/api/health
```

预期返回：

```json
{
  "ok": true,
  "message": "CodeBot backend is running"
}
```

## 关卡接口

### 获取关卡列表

```bash
curl http://localhost:3001/api/levels
```

返回 5 个关卡摘要。列表接口只返回轻量字段：

- `id`
- `title`
- `chapter`
- `knowledgePoint`
- `difficulty`
- `description`

### 获取关卡详情

```bash
curl http://localhost:3001/api/levels/level-001
```

详情接口返回完整关卡数据，包括 `starterCode`、`hints`、`tests` 和 `animationRules`。

不存在的关卡会返回 404：

```bash
curl http://localhost:3001/api/levels/not-exist
```

```json
{
  "error": "Level not found"
}
```

## C 代码运行接口

本地需要先安装并配置 `gcc`。Windows 下可以用下面的命令检查：

```bash
gcc --version
```

如果命令不可用，需要安装 MinGW-w64、MSYS2 或其他提供 gcc 的工具链，并把 gcc 所在目录加入 `PATH`。

### 运行 C 代码

```bash
curl -X POST http://localhost:3001/api/run-c \
  -H "Content-Type: application/json" \
  -d "{\"code\":\"#include <stdio.h>\\nint main(){printf(\\\"Hello CodeBot\\\");return 0;}\",\"stdin\":\"\"}"
```

请求格式：

```json
{
  "code": "C语言代码",
  "stdin": "输入内容"
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

编译错误返回：

```json
{
  "status": "compile_error",
  "stdout": "",
  "stderr": "gcc 编译错误信息",
  "timeMs": 0
}
```

运行超时返回：

```json
{
  "status": "timeout",
  "stdout": "",
  "stderr": "Program timed out",
  "timeMs": 2000
}
```

运行错误返回：

```json
{
  "status": "runtime_error",
  "stdout": "",
  "stderr": "运行错误信息",
  "timeMs": 123
}
```

### 当前安全限制

当前运行环境是课程演示级运行环境，不是生产级沙箱。它已经实现：

- 每次请求使用独立临时目录
- 用户代码写入系统临时目录，不写入项目源码目录
- Windows 下生成 `.exe` 可执行文件，其他平台使用普通可执行文件名
- gcc 编译超时限制
- 程序运行 2 秒超时限制
- stdout 和 stderr 输出长度限制
- `finally` 清理临时目录
- 捕获编译、运行和进程错误，避免后端进程崩溃

它还不能替代真正的隔离沙箱。生产环境应使用容器、权限隔离、资源配额、系统调用限制和网络隔离。

## 关卡自动判题接口

### 提交关卡代码

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

全部通过返回：

```json
{
  "passed": true,
  "score": 100,
  "errorType": null,
  "message": "全部测试通过",
  "results": [
    {
      "name": "电量充足",
      "hidden": false,
      "passed": true,
      "input": "80",
      "expectedOutput": "open",
      "actualOutput": "open",
      "status": "success"
    }
  ]
}
```

部分测试失败返回：

```json
{
  "passed": false,
  "score": 67,
  "errorType": "wrong_answer",
  "message": "部分测试未通过",
  "results": [
    {
      "name": "隐藏测试：边界值 60",
      "hidden": true,
      "passed": false,
      "input": "60",
      "expectedOutput": "open",
      "actualOutput": "close",
      "status": "success"
    }
  ]
}
```

编译错误返回：

```json
{
  "passed": false,
  "score": 0,
  "errorType": "compile_error",
  "message": "代码编译失败",
  "results": [],
  "stderr": "gcc 错误信息"
}
```

运行超时返回：

```json
{
  "passed": false,
  "score": 0,
  "errorType": "timeout",
  "message": "程序运行超时，可能存在死循环",
  "results": []
}
```

### 判题流程

1. 根据 `levelId` 查找关卡。
2. 校验 `code` 是否为空。
3. 读取该关卡的 `tests`。
4. 按顺序对每个测试点调用已有 C runner。
5. 编译错误、超时或运行错误会立即停止后续测试。
6. 运行成功后比较 `stdout` 和 `expectedOutput`。
7. 当前输出比较规则是两边都执行 `trim()` 后比较。
8. 分数按通过测试数占总测试数计算，并四舍五入。
9. hidden 测试点当前仍会返回完整数据，后续前端可按需隐藏。

## 前端运行与判题

关卡详情页 `/levels/:id` 已经接入真实后端接口：

- 点击“运行”会调用 `POST /api/run-c`，发送当前编辑器代码和“自定义输入”文本框中的 stdin。
- “自定义输入”默认填入当前关卡的 `sampleInput`，用户可以在运行前自行修改。
- 运行结果会显示 `status`、`stdout`、`stderr` 和 `timeMs`。
- 点击“提交”会调用 `POST /api/submit-level`，发送当前 `levelId` 和编辑器代码。
- 提交判题结果会显示是否通过、得分、判题消息、错误类型和每个测试点结果。
- 测试点结果包括测试名、是否通过、输入、期望输出、实际输出和运行状态。
- hidden 测试点当前允许在前端展示完整输入输出，后续阶段可以根据教学需要隐藏细节。

常见错误提示面向 C 语言初学者：

- `compile_error`：代码编译失败，请检查语法，例如分号、括号、变量名。
- `timeout`：程序运行超时，可能存在死循环。
- `wrong_answer`：程序能运行，但输出结果和题目要求不一致。
- `runtime_error`：程序运行时出错。
- `network_error`：无法连接后端，请确认 `npm run dev` 正在运行。

## 页面路径

- `/`：首页
- `/levels`：关卡列表页
- `/levels/:id`：关卡详情页，例如 `/levels/level-001`

## 当前阶段已完成

- 创建 React + Vite + TypeScript 前端工程骨架
- 创建 Node.js + Express + TypeScript 后端工程骨架
- 首页展示项目名称、简介和基础导航按钮
- 集成 Monaco Editor 代码编辑器
- 提供 `GET /api/health` 健康检查接口
- 提供 `GET /api/levels` 关卡列表接口
- 提供 `GET /api/levels/:id` 关卡详情接口
- 创建 5 个 MVP C 语言学习关卡
- 增加首页、关卡列表页和关卡详情页路由
- 前端通过后端接口获取关卡数据
- 集成 Monaco Editor，在关卡详情页编辑 starterCode
- 增加运行、提交、重置、提示按钮
- 增加基础 2D GameMap 状态区域
- 提供 `POST /api/run-c` C 代码编译运行接口
- 为 C 代码运行实现临时目录、编译/运行超时、输出限制和清理
- 提供 `POST /api/submit-level` 关卡自动判题接口
- 基于关卡 `tests` 顺序运行 C 代码并计算得分
- 前端运行按钮已接入 `/api/run-c`
- 前端提交按钮已接入 `/api/submit-level`
- 关卡详情页已增加自定义输入框，并将 stdin 传给 C 程序
- 前端已展示运行结果和提交判题结果
- 配置根目录 npm workspaces 和 `npm run dev`
- 添加基础测试，覆盖首页渲染、关卡接口、关卡页面、真实运行和提交交互、C 代码运行接口和自动判题接口

## 下一阶段准备做什么

- 错误诊断系统
- 错题本
- 根据程序输出进一步驱动机器人动画和判题反馈
