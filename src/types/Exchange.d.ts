import React from "react";

export type ObjExchange = {
  command: string;
  output: string | React.JSX.Element;
  prompt: string;
  pwd: string;
}

type IExchange =
	| ObjExchange
	| string
	| React.JSX.Element;

export default IExchange;
