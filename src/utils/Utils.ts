import { SetStateAction } from "react";
import { IExchange } from "../types/GlobalTypes";

export const processCommand = (
  input: string,
  commands: Record<string, (args: string) => React.JSX.Element | string>,
  setExchangeHistory: React.Dispatch<SetStateAction<IExchange[]>>,
  setInput: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  const [base, ...argsArr] = input.trim().split(" ");
  const args = argsArr.join(" ");
  if (commands[base!]) {
    const executor = commands[base!];
    typeof executor === "function" &&
      setExchangeHistory((prev) => {
        return [
          ...prev,
          {
            command: input,
            output: executor(args),
          },
        ];
      });
  } else
    setExchangeHistory((prev) => {
      return [
        ...prev,
        {
          command: input,
          output: `ERR: unidentified command ${input}`,
        },
      ];
    });
  setInput("");
};
