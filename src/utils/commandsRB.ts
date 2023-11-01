import { SetStateAction } from "react";
import { IExchange } from "../types/GlobalTypes";

export const BACK_REGEX = /\/?\.?[\w-_]+\/\.\./;

export const Errors = {
  COMMAND_NOT_FOUND: "-bash: $1: command not found",
  FILE_EXISTS: "mkdir: $1: File exists",
  NO_SUCH_FILE: "-bash: cd: $1: No such file or directory",
  NOT_A_DIRECTORY: "-bash: cd: $1: Not a directory",
  IS_A_DIRECTORY: "cat: $1: Is a directory",
};

export function trim(str: string, char: string) {
  if (str[0] === char) {
    str = str.substring(1);
  }
  if (str[str.length - 1] === char) {
    str = str.substring(0, str.length - 1);
  }
  return str;
}

// export function isFile(entry: any) {
//   return entry.content !== undefined;
// }

export const listDir = (
  setExchangeHistory: React.Dispatch<SetStateAction<IExchange[]>>,
  argsArr: string[],
  structure: any,
  pwd: string,
  fullCommand: string
) => {
  const path = "";
  const fullPath = extractPath(path, pwd);
  const { err, dir } = getDirectoryByPath(structure, fullPath);

  if (err) {
    return appendError(setExchangeHistory, err, fullCommand, pwd);
  } else {
    let flags = { a: false, l: false };
    argsArr.forEach((val) => {
      if (val.toLowerCase() === "-a") flags.a = true;
      else if (val.toLowerCase() === "-l") flags.l = true;
    });
    let content = Object.keys(dir);
    if (!flags.a) {
      content = content.filter((name) => name[0] !== ".");
    }
    return setExchangeHistory((prev) => {
      return [
        ...prev,
        {
          command: fullCommand,
          output: content.join(" "),
          pwd: pwd,
        },
      ];
    });
  }
};

export const cat = (
  setExchangeHistory: React.Dispatch<SetStateAction<IExchange[]>>,
  pwd: string,
  fullCommand: string,
  argsArr: string[],
  structure: any
) => {
  const path = argsArr[0];
  const relativePath = path?.split("/");
  const fileName = relativePath?.pop();
  const fullPath = extractPath((relativePath as string[]).join("/"), pwd);
  const { err, dir } = getDirectoryByPath(structure, fullPath);
  if (err) {
    return appendError(setExchangeHistory, err, fullCommand, pwd);
  } else if (!dir[fileName!]) {
    return appendError(
      setExchangeHistory,
      Errors.NO_SUCH_FILE,
      fullCommand,
      pwd
    );
  } else if (!dir[fileName!].hasOwnProperty("content")) {
    return appendError(
      setExchangeHistory,
      Errors.IS_A_DIRECTORY,
      fullCommand,
      pwd
    );
  } else {
    const content = dir[fileName!].content.replace(/\n$/, "");
    return setExchangeHistory((prev) => {
      return [
        ...prev,
        {
          command: fullCommand,
          output: content,
          pwd: pwd,
        },
      ];
    });
  }
};

export const mkdir = (
  setExchangeHistory: React.Dispatch<SetStateAction<IExchange[]>>,
  pwd: string,
  argsArr: string[],
  structure: any,
  fullCommand: string,
  setStructure: React.Dispatch<React.SetStateAction<any>>
) => {
  const path = argsArr[0];
  const relativePath = (path as string).split("/");
  const newDirectory = relativePath.pop();
  const fullPath = extractPath(relativePath.join("/"), pwd);
  const deepCopy = JSON.parse(JSON.stringify(structure));
  const { dir } = getDirectoryByPath(deepCopy, fullPath);

  if (dir[newDirectory!]) {
    return appendError(
      setExchangeHistory,
      Errors.FILE_EXISTS,
      fullCommand,
      pwd
    );
  } else {
    dir[newDirectory!] = {};
    setExchangeHistory((prev) => {
      return [
        ...prev,
        {
          command: fullCommand,
          output: "",
          pwd: pwd,
        },
      ];
    });
    return setStructure(deepCopy);
  }
};

export function appendError(
  setExchangeHistory: React.Dispatch<SetStateAction<IExchange[]>>,
  error: string,
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

export function getDirectoryByPath(structure: any, relativePath: string) {
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
        return { err: Errors.NOT_A_DIRECTORY.replace("$1", relativePath) };
      } else {
        dir = child;
      }
    } else {
      return { err: Errors.NO_SUCH_FILE.replace("$1", relativePath) };
    }
    i++;
  }
  return { dir };
}

export const changeDir = (
  pwd: string,
  setPwd: React.Dispatch<React.SetStateAction<string>>,
  args: string[],
  structure: any,
  setExchangeHistory: React.Dispatch<SetStateAction<IExchange[]>>,
  fullCommand: string
) => {
  const path = args[0];
  if (!path || path === "/") {
    return setPwd("");
  }
  const fullPath = extractPath(path, pwd);
  const { err } = getDirectoryByPath(structure, fullPath);

  if (err) {
    return appendError(setExchangeHistory, err, fullCommand, pwd);
  } else {
    setExchangeHistory((prev) => {
      return [
        ...prev,
        {
          command: fullCommand,
          output: "",
          pwd: pwd,
        },
      ];
    });
    return setPwd(fullPath);
  }
};

export const getPwd = (
  pwd: string,
  setExchangeHistory: React.Dispatch<SetStateAction<IExchange[]>>
) => {
  const directory = `/${pwd}`;
  return setExchangeHistory((prev) => {
    return [
      ...prev,
      {
        command: "pwd",
        output: directory,
        pwd: pwd,
      },
    ];
  });
};

export const rm = (
  setExchangeHistory: React.Dispatch<SetStateAction<IExchange[]>>,
  argsArr: string[],
  pwd: string,
  structure: any,
  setStructure: React.Dispatch<React.SetStateAction<any>>,
  fullCommand: string
) => {
  const path = argsArr[0];
  const relativePath = path!.split("/");
  const file = relativePath.pop();
  const fullPath = extractPath(relativePath.join("/"), pwd);
  const deepCopy = JSON.parse(JSON.stringify(structure));
  const { dir } = getDirectoryByPath(deepCopy, fullPath);

  if (dir[file!]) {
    // folder deletion requires the recursive flags `-r` or `-R`
    // if (!isFile(dir[file]) && !(flags.r || flags.R)) {
    //   return appendError(state, Errors.IS_A_DIRECTORY, path);
    // }
    delete dir[file!];
    setExchangeHistory((prev) => {
      return [
        ...prev,
        {
          command: fullCommand,
          output: "",
          pwd: pwd,
        },
      ];
    });
    return setStructure(deepCopy);
  } else {
    return appendError(
      setExchangeHistory,
      Errors.NO_SUCH_FILE,
      fullCommand,
      pwd
    );
  }
};
