import { useContext, useEffect } from "react";
import IExchange from "../types/ExchangeType";
import { TerminalContext } from "../contexts/TerminalContext";

// Well this didn't work 💀
const useExchange = () => {
	const { setExchangeHistory } = useContext(TerminalContext)!;

	const appendExchange = (
		command: string,
		output: string,
		prompt: string,
		pwd?: string
	) => {
		const exchange: IExchange = {
			command: command,
			output: output,
			pwd: pwd || "",
			prompt: prompt,
		};
		setExchangeHistory((prev: IExchange[]) => [...prev, exchange]);
	};
	return appendExchange;
};

export default useExchange;
