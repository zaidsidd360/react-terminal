import React, { SetStateAction } from "react";
import IExchange, { ObjExchange } from "../types/Exchange";
import IUserCommands from "../types/Commands";
import {
	argsNotReqd,
	argsReqd,
	commandNotFound,
	invalidTheme,
	tooManyArgs,
} from "../errors/Errors";
import { cat, cd, getPwd, ls, mkdir, rm } from "./InBuiltCommandsProcessors";
import { appendError, appendOutput } from "../utils/helpers";
import ITheme from "../types/Theme";
import { themes } from "../themes";

type CommandOutput = string | React.JSX.Element;

type SyncCommandExecutor = () => CommandOutput;
type AsyncCommandExecutor = () => Promise<CommandOutput>;
type CommandExecutorWithArgs = (args: string) => CommandOutput;
type CommandExecutor =
	| CommandOutput
	| SyncCommandExecutor
	| AsyncCommandExecutor
	| CommandExecutorWithArgs;

// =============================
// HANDLES USER DEFINED COMMANDS
// =============================
const executeAsyncCommand = async (
	executor: AsyncCommandExecutor,
	setExchangeHistory: React.Dispatch<SetStateAction<IExchange[]>>,
	fullCommand: string,
	pwd: string,
	prompt: string,
	cliLoader: React.JSX.Element
) => {
	setExchangeHistory((prev) => [
		...prev,
		{ command: fullCommand, output: cliLoader, prompt: prompt, pwd: pwd },
	]);

	try {
		const resolvedVal = await executor();
		setExchangeHistory((prev) => {
			const last = prev.pop();
			(last as ObjExchange).output = resolvedVal;
			return [...prev, last!];
		});
	} catch (error) {
		// TODO: Create an error component for this
		const errorMessage = "An error occurred while executing the command.";
		setExchangeHistory((prev) => {
			const last = prev.pop();
			(last as ObjExchange).output = errorMessage;
			return [...prev, last!];
		});
	}
};

const executeSyncCommand = (
	executor: SyncCommandExecutor,
	setExchangeHistory: React.Dispatch<SetStateAction<IExchange[]>>,
	fullCommand: string,
	pwd: string,
	prompt: string
) => {
	appendOutput(setExchangeHistory, executor(), fullCommand, pwd, prompt);
};

const executeCommand = async (
	executor: CommandExecutor,
	setExchangeHistory: React.Dispatch<SetStateAction<IExchange[]>>,
	fullCommand: string,
	pwd: string,
	prompt: string,
	cliLoader: React.JSX.Element
) => {
	if (typeof executor === "function") {
		if (executor.constructor.name === "AsyncFunction") {
			await executeAsyncCommand(
				executor as AsyncCommandExecutor,
				setExchangeHistory,
				fullCommand,
				pwd,
				prompt,
				cliLoader
			);
		} else {
			executeSyncCommand(
				executor as SyncCommandExecutor,
				setExchangeHistory,
				fullCommand,
				pwd,
				prompt
			);
		}
	} else {
		appendOutput(setExchangeHistory, executor, fullCommand, pwd, prompt);
	}
};

export const processUserCommand = async (
	base: string,
	argsArr: string[],
	commands: IUserCommands,
	setExchangeHistory: React.Dispatch<SetStateAction<IExchange[]>>,
	pwd: string,
	prompt: string,
	cliLoader: React.JSX.Element
) => {
	const args = argsArr.join(" ");
	const fullCommand = `${base} ${args}`;
	if (commands[`${fullCommand}`]) {
		await executeCommand(
			commands[`${fullCommand}`] as CommandExecutor,
			setExchangeHistory,
			fullCommand,
			pwd,
			prompt,
			cliLoader
		);
	} else if (commands[base]) {
		const executor = commands[base];
		if (typeof executor === "function") {
			await executeCommand(
				() => (executor as CommandExecutorWithArgs)(args),
				setExchangeHistory,
				fullCommand,
				pwd,
				prompt,
				cliLoader
			);
		} else {
			await executeCommand(
				executor as CommandExecutor,
				setExchangeHistory,
				fullCommand,
				pwd,
				prompt,
				cliLoader
			);
		}
	} else {
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
