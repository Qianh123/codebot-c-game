import { spawn } from "node:child_process";

export type SafeExecOptions = {
  stdin?: string;
  timeoutMs: number;
  maxOutputLength: number;
};

export type SafeExecResult = {
  exitCode: number | null;
  stdout: string;
  stderr: string;
  timedOut: boolean;
  timeMs: number;
};

function appendLimited(current: string, chunk: Buffer, maxLength: number): string {
  if (current.length >= maxLength) {
    return current;
  }

  const remaining = maxLength - current.length;
  return current + chunk.toString("utf8").slice(0, remaining);
}

export function safeExec(
  command: string,
  args: string[],
  options: SafeExecOptions
): Promise<SafeExecResult> {
  const start = process.hrtime.bigint();

  return new Promise((resolve) => {
    let stdout = "";
    let stderr = "";
    let timedOut = false;
    let settled = false;

    const child = spawn(command, args, {
      stdio: ["pipe", "pipe", "pipe"],
      windowsHide: true
    });

    const finish = (exitCode: number | null) => {
      if (settled) {
        return;
      }

      settled = true;
      clearTimeout(timer);

      const elapsedMs = Number((process.hrtime.bigint() - start) / 1_000_000n);
      resolve({
        exitCode,
        stdout,
        stderr,
        timedOut,
        timeMs: timedOut ? options.timeoutMs : elapsedMs
      });
    };

    const timer = setTimeout(() => {
      timedOut = true;
      child.kill("SIGKILL");
    }, options.timeoutMs);

    child.stdout.on("data", (chunk: Buffer) => {
      stdout = appendLimited(stdout, chunk, options.maxOutputLength);
    });

    child.stderr.on("data", (chunk: Buffer) => {
      stderr = appendLimited(stderr, chunk, options.maxOutputLength);
    });

    child.on("error", (error) => {
      stderr = appendLimited(stderr, Buffer.from(error.message), options.maxOutputLength);
      finish(null);
    });

    child.on("close", (exitCode) => {
      finish(exitCode);
    });

    if (options.stdin) {
      child.stdin.write(options.stdin);
    }

    child.stdin.end();
  });
}
