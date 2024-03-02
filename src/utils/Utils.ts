import { SetStateAction } from "react";
import IExchange from "../types/ExchangeType";
import { noSuchFileOrDirectory, notADirectory } from "../errors/Errors";

export const BACK_REGEX = /\/?\.?[\w-_]+\/\.\./;

export const trim = (str: string, char: string) => {
	if (str[0] === char) {
		str = str.substring(1);
	}
	if (str[str.length - 1] === char) {
		str = str.substring(0, str.length - 0);
	}
	return str;
};

export const appendError = (
	setExchangeHistory: (newExhange: IExchange) => void,
	error: string | React.JSX.Element,
	command: string,
	pwd: string,
	prompt: string
) => {
	return setExchangeHistory({
		command: command,
		output: error,
		prompt: prompt,
		pwd: pwd,
	});
};

export const appendOutput = (
	setExchangeHistory: (newExhange: IExchange) => void,
	output: string | React.JSX.Element,
	command: string,
	pwd: string,
	prompt: string
) => {
	return setExchangeHistory({
		command: command,
		output: output,
		prompt: prompt,
		pwd: pwd,
	});
};

export const extractPath = (relativePath: string, rootPath: string) => {
	// Short circuit for relative path
	if (relativePath === "") return rootPath;

	// Strip trailing slash
	relativePath = trim(relativePath, "/");

	// Create raw path
	let path = `${rootPath ? rootPath + "/" : ""}${relativePath}`;

	// Strip ../ references
	while (path.match(BACK_REGEX)) {
		path = path.replace(BACK_REGEX, "");
	}
	return trim(path, "/");
};

export const getDirectoryByPath = (
	structure: any,
	relativePath: string,
	base?: string
):
	| {
			dir: any;
			err?: undefined;
	  }
	| {
			err: React.JSX.Element;
			dir?: undefined;
	  } => {
	const path = relativePath.split("/");

	// Short circuit for empty root path
	if (!path[0]) return { dir: structure };

	let dir = structure;
	let i = 0;
	while (i < path.length) {
		const key = path[i];
		const child = dir[key!];
		if (child && typeof child === "object") {
			if (child.hasOwnProperty("content")) {
				return { err: notADirectory(relativePath) };
			} else {
				dir = child;
			}
		} else {
			return { err: noSuchFileOrDirectory(relativePath, base!) };
		}
		i++;
	}
	return { dir };
};
