export const processCommand = (
  input: string,
  commands: Record<string, (args: string) => React.JSX.Element | string>,
  setPrevCommandsAndOutputs: React.Dispatch<
    React.SetStateAction<
      {
        command: string;
        output: string | React.JSX.Element;
      }[]
    >
  >,
  setInput: (value: React.SetStateAction<string | undefined>) => void
) => {
  const [base, ...argsArr] = input.trim().split(" ");
  const args = argsArr.join(" ");
  if (commands[base!]) {
    const executor = commands[base!];
    typeof executor === "function" &&
      setPrevCommandsAndOutputs((prev) => [
        ...prev,
        {
          command: input,
          output: executor(args),
        },
      ]);
  } else
    setPrevCommandsAndOutputs((prev) => [
      ...prev,
      {
        command: input,
        output: `ERR: unidentified command ${input}`,
      },
    ]);
  setInput("");
};
