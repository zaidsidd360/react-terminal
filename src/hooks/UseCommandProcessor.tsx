import IUserCommands from "../types/Commands";
import ITheme from "../types/Theme";
import {
	processInBuiltCommand,
	processUserCommand,
} from "../commands/CommandProcessor";
import { inBuiltCommands } from "../utils/constants";
import React from "react";

const useCommandProcessor = (
	commands: IUserCommands,
	setExchangeHistory: React.Dispatch<React.SetStateAction<any>>,
	pwd: string,
	prompt: string,
	cliLoader: React.JSX.Element,
	structure: any,
	setStructure: React.Dispatch<React.SetStateAction<any>>,
	setPwd: React.Dispatch<React.SetStateAction<string>>,
	setTerminalTheme: React.Dispatch<React.SetStateAction<ITheme>>
) => {
	const processCommand = async (inputValue: string) => {
		const [base, ...argsArr] = inputValue.trim().split(" ");
		// TODO: Disable inbuilt commands related to directory structure if directory structure is not present.
		if (inBuiltCommands.includes(base as string)) {
			processInBuiltCommand(
				base!,
				pwd,
				argsArr,
				setExchangeHistory,
				prompt,
				setPwd,
				structure,
				setStructure,
				setTerminalTheme
			);
		} else {
			await processUserCommand(
				base!,
				argsArr,
				commands,
				setExchangeHistory,
				pwd,
				prompt,
				cliLoader
			);
		}
	};

	return { processCommand };
};

export default useCommandProcessor;
