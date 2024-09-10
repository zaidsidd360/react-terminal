import { useEffect, useState } from "react";
import ITheme from "../types/Theme";
import { themes } from "../themes";

const useTheme = (
	theme: string | ITheme
): [ITheme, React.Dispatch<React.SetStateAction<ITheme>>] => {
	const [terminalTheme, setTerminalTheme] = useState<ITheme>(themes.dark!);

	useEffect(() => {
		if (typeof theme === "string") {
			return setTerminalTheme(themes[theme] as ITheme);
		}
		setTerminalTheme(theme as ITheme);
	}, [theme]);

	return [terminalTheme!, setTerminalTheme];
};

export default useTheme;
