import { SetStateAction } from "react";
import { IExchange } from "../types/GlobalTypes";
import { appendError, extractPath, getDirectoryByPath } from "../utils/Utils";
import { isADirectory, noSuchFileOrDirectory, redundantMkdir } from "./Errors";

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
      noSuchFileOrDirectory(fileName!, fullCommand.split(" ")[0] as string),
      fullCommand,
      pwd
    );
  } else if (!dir[fileName!].hasOwnProperty("content")) {
    return appendError(
      setExchangeHistory,
      isADirectory(fileName!),
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
      redundantMkdir(newDirectory!),
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
  const { err } = getDirectoryByPath(
    structure,
    fullPath,
    fullCommand.split(" ")[0]
  );

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
      noSuchFileOrDirectory(file!, fullCommand.split(" ")[0] as string),
      fullCommand,
      pwd
    );
  }
};
