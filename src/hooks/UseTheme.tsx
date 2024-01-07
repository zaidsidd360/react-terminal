import { useEffect, useState } from "react";
import ITheme from "../types/ThemeType";
import { themes } from "../common/Themes";

const useTheme = (theme: string | ITheme): ITheme => {
  const [terminalTheme, setTerminalTheme] = useState<ITheme>(themes.dark!);

  useEffect(() => {
    if (typeof theme === "string") {
      return setTerminalTheme(themes[theme] as ITheme);
    }
    setTerminalTheme(theme as ITheme);
  }, [theme]);

  return terminalTheme!;
};

export default useTheme;
