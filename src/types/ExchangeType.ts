type IExchange =
	| {
			command: string;
			output: string | React.JSX.Element;
			prompt: string;
			pwd: string;
	  }
	| string;

export default IExchange;
