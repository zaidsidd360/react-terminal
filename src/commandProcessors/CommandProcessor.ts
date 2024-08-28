import { SetStateAction } from "react";
import IExchange from "../@types/Exchange";
import IUserCommands from "../@types/Commands";
import {
	argsNotReqd,
	argsReqd,
	commandNotFound,
	invalidTheme,
	tooManyArgs,
} from "../errors/Errors";
import { cat, cd, getPwd, ls, mkdir, rm } from "./InBuiltCommandsProcessors";
import { appendError, appendOutput } from "../utils/Utils";
import ITheme from "../@types/Theme";
import { themes } from "../themes/Themes";

// =============================
// HANDLES USER DEFINED COMMANDS
// =============================
export const processUserCommand = (
	base: string,
	argsArr: string[],
	commands: IUserCommands,
	setExchangeHistory: React.Dispatch<SetStateAction<IExchange[]>>,
	pwd: string,
	prompt: string
) => {
	const args = argsArr.join(" ");
	const fullCommand = `${base} ${args}`;
	if (commands[`${fullCommand}`]) {
		const executor = commands[`${fullCommand}`];
		if (typeof executor === "function") {
			appendOutput(
				setExchangeHistory,
				executor() as string | React.JSX.Element,
				fullCommand,
				pwd,
				prompt
			);
		} else {
			appendOutput(
				setExchangeHistory,
				executor as string | React.JSX.Element,
				fullCommand,
				pwd,
				prompt
			);
		}
	} else if (commands[base]) {
		const executor = commands[base];
		if (typeof executor === "function") {
			appendOutput(
				setExchangeHistory,
				executor(args) as string | React.JSX.Element,
				fullCommand,
				pwd,
				prompt
			);
		} else {
			appendOutput(
				setExchangeHistory,
				executor as string | React.JSX.Element,
				fullCommand,
				pwd,
				prompt
			);
		}
	}
	// =============================
	// HANDLES UNIDENTIFIED COMMANDS
	// =============================
	else {
		appendOutput(
			setExchangeHistory,
			commandNotFound(base),
			fullCommand,
			pwd,
			prompt
		);
	}
};

// =========================
// HANDLES BUILT IN COMMANDS
// =========================
export const processInBuiltCommand = (
	base: string,
	pwd: string,
	argsArr: string[],
	setExchangeHistory: React.Dispatch<SetStateAction<IExchange[]>>,
	prompt: string,
	setPwd: React.Dispatch<React.SetStateAction<string>>,
	structure: any,
	setStructure: React.Dispatch<React.SetStateAction<any>>,
	setTerminalTheme: React.Dispatch<React.SetStateAction<ITheme>>
) => {
	const args = argsArr.join(" ");
	const fullCommand = `${base} ${args}`;
	switch (base) {
		// Handle clear //
		case "clear":
			{
				if (args.length !== 0) {
					appendError(
						setExchangeHistory,
						argsNotReqd(base),
						fullCommand,
						pwd,
						prompt
					);
				} else setExchangeHistory([]); // Clears the terminal exchange history
			}
			break;
		// Handle echo //
		case "echo":
			{
				// TODO: Handle case for strings passed with "" & ''.
				appendOutput(
					setExchangeHistory,
					args,
					fullCommand,
					pwd,
					prompt
				);
			}
			break;
		// Handle cd //
		case "cd":
			{
				if (argsArr.length > 1) {
					appendError(
						setExchangeHistory,
						tooManyArgs(base),
						fullCommand,
						pwd,
						prompt
					);
				} else if (argsArr.length < 1) {
					appendOutput(
						setExchangeHistory,
						args,
						fullCommand,
						pwd,
						prompt
					);
				} else {
					cd(
						pwd,
						prompt,
						setPwd,
						argsArr,
						structure,
						setExchangeHistory,
						fullCommand
					);
				}
			}
			break;
		// Handle ls //
		case "ls":
			{
				if (argsArr.length > 1) {
					appendError(
						setExchangeHistory,
						tooManyArgs(base),
						fullCommand,
						pwd,
						prompt
					);
				} else {
					ls(
						setExchangeHistory,
						argsArr,
						structure,
						pwd,
						prompt,
						fullCommand
					);
				}
			}
			break;
		// Handle cat //
		case "cat":
			{
				if (argsArr.length > 1) {
					appendError(
						setExchangeHistory,
						tooManyArgs(base),
						fullCommand,
						pwd,
						prompt
					);
				} else if (argsArr.length < 1) {
					appendError(
						setExchangeHistory,
						argsReqd(base, "YOUR-FILE-NAME"),
						fullCommand,
						pwd,
						prompt
					);
				} else {
					cat(
						setExchangeHistory,
						pwd,
						prompt,
						fullCommand,
						argsArr,
						structure
					);
				}
			}
			break;
		// Handle pwd //
		case "pwd":
			{
				if (argsArr.length !== 0) {
					appendError(
						setExchangeHistory,
						argsNotReqd(base),
						fullCommand,
						pwd,
						prompt
					);
				} else getPwd(pwd, prompt, setExchangeHistory);
			}
			break;
		// Handle mkdir //
		case "mkdir":
			{
				if (argsArr.length > 1) {
					appendError(
						setExchangeHistory,
						tooManyArgs(base),
						fullCommand,
						pwd,
						prompt
					);
				} else if (argsArr.length < 1) {
					appendError(
						setExchangeHistory,
						argsReqd(base, "NEW-DIR-NAME"),
						fullCommand,
						pwd,
						prompt
					);
				} else {
					mkdir(
						setExchangeHistory,
						pwd,
						prompt,
						argsArr,
						structure,
						fullCommand,
						setStructure
					);
				}
			}
			break;
		// Handle rm //
		case "rm":
			{
				if (argsArr.length > 1) {
					appendError(
						setExchangeHistory,
						tooManyArgs(base),
						fullCommand,
						pwd,
						prompt
					);
				} else if (argsArr.length < 1) {
					appendError(
						setExchangeHistory,
						argsReqd(base, "YOUR-FILE/DIR"),
						fullCommand,
						pwd,
						prompt
					);
				} else {
					rm(
						setExchangeHistory,
						argsArr,
						pwd,
						prompt,
						structure,
						setStructure,
						fullCommand
					);
				}
			}
			break;
		// Handle date //
		case "date":
			{
				if (argsArr.length !== 0) {
					appendError(
						setExchangeHistory,
						tooManyArgs(base),
						fullCommand,
						pwd,
						prompt
					);
				} else {
					const date = new Date();
					appendOutput(
						setExchangeHistory,
						date.toString(),
						fullCommand,
						pwd,
						prompt
					);
				}
			}
			break;
		// Handle setTheme //
		case "setTheme": {
			if (argsArr.length > 1) {
				appendError(
					setExchangeHistory,
					tooManyArgs(base),
					fullCommand,
					pwd,
					prompt
				);
			} else if (!argsArr[0]) {
				appendError(
					setExchangeHistory,
					argsReqd(base, "dark"),
					fullCommand,
					pwd,
					prompt
				);
			} else if (!Object.keys(themes).includes(argsArr[0])) {
				appendError(
					setExchangeHistory,
					invalidTheme(argsArr[0]),
					fullCommand,
					pwd,
					prompt
				);
			} else setTerminalTheme(themes[argsArr[0]] as ITheme);
		}
	}
};
