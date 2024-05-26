type IUserCommands = Record<
  string,
  | string
  | React.JSX.Element
  | ((args?: any) => React.JSX.Element | string | void)
>;

export default IUserCommands;
