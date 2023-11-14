export interface IExchange {
  command: string;
  output: string | React.JSX.Element;
  prompt: string;
  pwd: string;
}

export type IUserCommands = Record<
  string,
  string | React.JSX.Element | ((args: string) => React.JSX.Element | string)
>;
// &
//   Partial<Record<"echo" | "ls" | "mkdir" | "cd" | "cat" | "pwd" | "rm", never>>;
