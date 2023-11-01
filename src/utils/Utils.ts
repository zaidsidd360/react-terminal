import { SetStateAction } from "react";
import { IExchange } from "../types/GlobalTypes";
import { clearNoArgs, commandNotFound } from "../common/ErrorOutputs";
import { cat, changeDir, getPwd, listDir, mkdir, rm } from "./commandsRB";

export const processCommand = (
  base: string,
  argsArr: string[],
  commands: Record<string, (args: string) => React.JSX.Element | string>,
  inBuiltCommands: string[],
  setExchangeHistory: React.Dispatch<SetStateAction<IExchange[]>>,
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
  pwd: string,
  setPwd: React.Dispatch<React.SetStateAction<string>>,
  structure: any,
  setStructure: React.Dispatch<React.SetStateAction<any>>
) => {
  const args = argsArr.join(" ");
  const fullCommand = `${base} ${args}`;
  if (commands[base]) {
    const executor = commands[base];
    typeof executor === "function" &&
      setExchangeHistory((prev) => {
        return [
          ...prev,
          {
            command: fullCommand,
            output: executor(args),
            pwd: pwd,
          },
        ];
      });
  }
  // Handles built in commands
  else if (inBuiltCommands.includes(base)) {
    if (base === "clear") {
      if (args.length !== 0) {
        setExchangeHistory((prev) => {
          return [
            ...prev,
            {
              command: fullCommand,
              output: clearNoArgs(),
              pwd: pwd,
            },
          ];
        });
      } else setExchangeHistory([]); // Clears the terminal exchange history
    } else if (base === "echo") {
      setExchangeHistory((prev) => {
        return [
          ...prev,
          {
            command: fullCommand,
            output: args,
            pwd: pwd,
          },
        ];
      });
    } else if (base === "cd") {
      changeDir(
        pwd,
        setPwd,
        argsArr,
        structure,
        setExchangeHistory,
        fullCommand
      );
    } else if (base === "ls") {
      listDir(setExchangeHistory, argsArr, structure, pwd, fullCommand);
    } else if (base === "cat") {
      cat(setExchangeHistory, pwd, fullCommand, argsArr, structure);
    } else if (base === "pwd") {
      getPwd(pwd, setExchangeHistory);
    } else if (base === "mkdir") {
      mkdir(
        setExchangeHistory,
        pwd,
        argsArr,
        structure,
        fullCommand,
        setStructure
      );
    } else if (base === "rm") {
      rm(
        setExchangeHistory,
        argsArr,
        pwd,
        structure,
        setStructure,
        fullCommand
      );
    }
  }
  // Handles unidentified commands
  else
    setExchangeHistory((prev) => {
      return [
        ...prev,
        {
          command: fullCommand,
          output: commandNotFound(base),
          pwd: pwd,
        },
      ];
    });
  setInputValue("");
};
