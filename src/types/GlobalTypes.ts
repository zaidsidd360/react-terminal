export interface IExchange {
  command: string;
  output: string | React.JSX.Element;
  prompt: string;
  pwd: string;
}

export type IUserCommands = Record<
  string,
  | string
  | React.JSX.Element
  | ((args: string) => React.JSX.Element | string | void)
  | (() => void)
> &
  Partial<Record<"echo" | "ls" | "mkdir" | "cd" | "cat" | "pwd" | "rm", never>>;

export interface IMultiStepCommand {
  prompt: string;
  default: string;
  onSubmit: (value: any) => string | undefined;
}
