import { SetStateAction } from "react";
import { IExchange } from "../types/GlobalTypes";
import { noSuchFileOrDirectory, notADirectory } from "../common/Errors";

export const BACK_REGEX = /\/?\.?[\w-_]+\/\.\./;

export function trim(str: string, char: string) {
  if (str[0] === char) {
    str = str.substring(1);
  }
  if (str[str.length - 1] === char) {
    str = str.substring(0, str.length - 1);
  }
  return str;
}

export function appendError(
  setExchangeHistory: React.Dispatch<SetStateAction<IExchange[]>>,
  error: string | React.JSX.Element,
  command: string,
  pwd: string
) {
  return setExchangeHistory((prev) => {
    return [
      ...prev,
      {
        command: command,
        output: error,
        pwd: pwd,
      },
    ];
  });
}

export function appendOutput(
  setExchangeHistory: React.Dispatch<SetStateAction<IExchange[]>>,
  output: string | React.JSX.Element,
  command: string,
  pwd: string
) {
  return setExchangeHistory((prev) => {
    return [
      ...prev,
      {
        command: command,
        output: output,
        pwd: pwd,
      },
    ];
  });
}

export function extractPath(relativePath: string, rootPath: string) {
  // Short circuit for relative path
  if (relativePath === "") return rootPath;

  // Strip trailing slash
  relativePath = trim(relativePath, "/");

  // Create raw path
  let path = `${rootPath ? rootPath + "/" : ""}${relativePath}`;

  // Strip ../ references
  while (path.match(BACK_REGEX)) {
    path = path.replace(BACK_REGEX, "");
  }
  return trim(path, "/");
}

export function getDirectoryByPath(
  structure: any,
  relativePath: string,
  base?: string
) {
  const path = relativePath.split("/");

  // Short circuit for empty root path
  if (!path[0]) return { dir: structure };

  let dir = structure;
  let i = 0;
  while (i < path.length) {
    const key = path[i];
    const child = dir[key!];
    if (child && typeof child === "object") {
      if (child.hasOwnProperty("content")) {
        return { err: notADirectory(relativePath) };
      } else {
        dir = child;
      }
    } else {
      return { err: noSuchFileOrDirectory(relativePath, base!) };
    }
    i++;
  }
  return { dir };
}
