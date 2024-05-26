type IExchange =
	| {
			command: string;
			output: string | React.JSX.Element;
			prompt: string;
			pwd: string;
	  }
	| string
	| React.JSX.Element;

export default IExchange;
