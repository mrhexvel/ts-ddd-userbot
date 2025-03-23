import { createLogger, format, transports } from "winston";
import chalk from "chalk";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";

function createLogDirIfNotExist(dirPath: string): void {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
}

const logDir = join(__dirname, "logs");

createLogDirIfNotExist(logDir);

const customFormat = format.printf(({ timestamp, level, message }) => {
  const colorizedLevel =
    level === "info"
      ? chalk.blue(level.toUpperCase())
      : level === "warn"
      ? chalk.yellow(level.toUpperCase())
      : level === "error"
      ? chalk.red(level.toUpperCase())
      : chalk.gray(level.toUpperCase());

  return `[${chalk.gray(timestamp)}] ${colorizedLevel}: ${message}`;
});

export const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), customFormat),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: join(logDir, "error.log"),
      level: "error",
    }),
    new transports.File({ filename: join(logDir, "combined.log") }),
  ],
});
