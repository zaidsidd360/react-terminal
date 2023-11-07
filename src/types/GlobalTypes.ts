export interface IExchange {
  command: string;
  output: string | React.JSX.Element;
  prompt: string;
  pwd: string;
}

export interface IMultiStepCommand {
  prompt: string;
  default: string;
  onSubmit: (value: any) => string | undefined;
}
