import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders the CodeBot landing page", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "CodeBot C 编程实验室" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("用 C 语言控制机器人闯关的编程教学游戏")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "开始学习" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "关卡列表" })).toBeInTheDocument();
  });
});
