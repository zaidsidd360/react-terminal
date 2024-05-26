import { createContext, SetStateAction, useEffect, useState } from "react";
import IExchange from "../@types/Exchange";

export interface ITerminalContext {
	exchangeHistory: IExchange[];
	setExchangeHistory: React.Dispatch<SetStateAction<IExchange[]>>;
	commandHistory: string[];
	setCommandHistory: React.Dispatch<SetStateAction<string[]>>;
	historyPointer: number;
	setHistoryPointer: React.Dispatch<SetStateAction<number>>;
	pwd: string;
	setPwd: React.Dispatch<SetStateAction<string>>;
	welcomeMessageCallback: (message: string | React.JSX.Element) => void;
}

export const TerminalContext = createContext<ITerminalContext | null>(null);

const TerminalContextProvider = (props: { children: React.ReactNode }) => {
	const [exchangeHistory, setExchangeHistory] = useState<IExchange[]>([]);

	const [commandHistory, setCommandHistory] = useState<string[]>([]);

	const [historyPointer, setHistoryPointer] = useState<number>(
		commandHistory.length
	);

	const [pwd, setPwd] = useState<string>("");

	const welcomeMessageCallback = (message: string | React.JSX.Element) => {
		if (!!message) setExchangeHistory([message]);
	};

	useEffect(() => {
		setHistoryPointer(commandHistory.length);
	}, [commandHistory]);

	return (
		<TerminalContext.Provider
			value={{
				exchangeHistory,
				setExchangeHistory,
				commandHistory,
				setCommandHistory,
				historyPointer,
				setHistoryPointer,
				pwd,
				setPwd,
				welcomeMessageCallback,
			}}
		>
			{props.children}
		</TerminalContext.Provider>
	);
};

export default TerminalContextProvider;
