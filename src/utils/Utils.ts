import { SetStateAction } from "react";
import { IExchange } from "../types/GlobalTypes";
import { clearNoArgs } from "../common/ErrorOutputs";

export const processCommand = (
  base: string,
  args: string,
  commands: Record<string, (args: string) => React.JSX.Element | string>,
  inBuiltCommands: string[],
  setExchangeHistory: React.Dispatch<SetStateAction<IExchange[]>>,
  setInputValue: React.Dispatch<React.SetStateAction<string>>
) => {
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
          },
        ];
      });
  }
  // Handles build in commands
  else if (inBuiltCommands.includes(base)) {
    if (base === "clear") {
      if (args.length !== 0) {
        setExchangeHistory((prev) => {
          return [
            ...prev,
            {
              command: fullCommand,
              output: clearNoArgs(),
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
          },
        ];
      });
    }
  }
  // Handles unidentified commands
  else
    setExchangeHistory((prev) => {
      return [
        ...prev,
        {
          command: fullCommand,
          output: `ERR: unidentified command ${fullCommand}`,
        },
      ];
    });
  setInputValue("");
};
