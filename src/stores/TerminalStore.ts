import { create } from "zustand";
import IExchange from "../types/ExchangeType";

interface TerminalState {
	exchangeHistory: IExchange[];
	setExchangeHistory: (newExhange: IExchange) => void;
	commandHistory: string[];
	setCommandHistory: (newCommand: string) => void;
	pwd: string;
	setPwd: (newPwd: string) => void;

	// PUT historyPointer INSIDE THE InputField.

	// historyPointer: number;
	// setHistoryPointer: React.Dispatch<SetStateAction<number>>;
	// welcomeMessageCallback: (message: string | React.JSX.Element) => void;
}

export const useTerminalStore = create<TerminalState>((set) => ({
	exchangeHistory: [],
	setExchangeHistory: (newExchange) =>
		set((state) => ({
			exchangeHistory: [...state.exchangeHistory, newExchange],
		})),
	commandHistory: [],
	setCommandHistory: (newCommand) =>
		set((state) => ({
			exchangeHistory: [...state.commandHistory, newCommand],
		})),
	pwd: "",
	setPwd: (newPwd) => set({ pwd: newPwd }),
}));
