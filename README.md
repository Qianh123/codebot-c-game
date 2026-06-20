# CodeBot C 编程实验室

CodeBot C 编程实验室是一个 Web 版 C 语言编程教学游戏。玩家在网页中编写 C 语言代码，系统后续会编译运行代码，并根据输出结果控制机器人动画、给出自动判题反馈。

当前阶段实现关卡数据、基础接口、页面路由和关卡详情展示，不实现 C 代码编译运行或自动判题系统。

## 技术栈

- 前端：React + Vite + TypeScript
- 后端：Node.js + Express + TypeScript
- 代码编辑器：后续接入 Monaco Editor，本阶段预留组件位置
- C 编译：后续接入 gcc，本阶段只保留后端结构
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
│   │   │   └── levels.ts
│   │   ├── services/
│   │   │   └── levels.ts
│   │   ├── utils/
│   │   ├── app.test.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── levels.ts
│   │   ├── components/
│   │   │   ├── CodeEditorPlaceholder.tsx
│   │   │   └── LevelCard.tsx
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

## 页面路径

- `/`：首页
- `/levels`：关卡列表页
- `/levels/:id`：关卡详情页，例如 `/levels/level-001`

## 当前阶段已完成

- 创建 React + Vite + TypeScript 前端工程骨架
- 创建 Node.js + Express + TypeScript 后端工程骨架
- 首页展示项目名称、简介和基础导航按钮
- 预留 Monaco Editor 组件位置
- 提供 `GET /api/health` 健康检查接口
- 提供 `GET /api/levels` 关卡列表接口
- 提供 `GET /api/levels/:id` 关卡详情接口
- 创建 5 个 MVP C 语言学习关卡
- 增加首页、关卡列表页和关卡详情页路由
- 前端通过后端接口获取关卡数据
- 配置根目录 npm workspaces 和 `npm run dev`
- 添加基础测试，覆盖首页渲染、关卡接口和关卡页面

## 下一阶段准备做什么

- 接入 Monaco Editor
- 设计 C 代码提交接口
- 后续在受控环境中接入 gcc 编译与运行
- 根据程序输出驱动机器人动画和判题反馈
