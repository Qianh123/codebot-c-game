# CodeBot C 编程实验室

CodeBot C 编程实验室是一个 Web 版 C 语言编程教学游戏。玩家在网页中编写 C 语言代码，系统后续会编译运行代码，并根据输出结果控制机器人动画、给出自动判题反馈。

当前阶段只搭建可运行的前后端工程骨架，不实现 C 代码编译、机器人关卡逻辑或自动判题系统。

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
│   │   ├── routes/
│   │   │   └── health.ts
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.test.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── CodeEditorPlaceholder.tsx
│   │   ├── pages/
│   │   │   └── HomePage.tsx
│   │   ├── test/
│   │   │   └── setup.ts
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

## 当前阶段已完成

- 创建 React + Vite + TypeScript 前端工程骨架
- 创建 Node.js + Express + TypeScript 后端工程骨架
- 首页展示项目名称、简介和基础导航按钮
- 预留 Monaco Editor 组件位置
- 提供 `GET /api/health` 健康检查接口
- 配置根目录 npm workspaces 和 `npm run dev`
- 添加基础测试，覆盖首页渲染和健康检查接口

## 下一阶段准备做什么

- 设计关卡数据结构
- 增加关卡列表页面和关卡详情页面
- 接入 Monaco Editor
- 设计 C 代码提交接口
- 后续在受控环境中接入 gcc 编译与运行
- 根据程序输出驱动机器人动画和判题反馈
