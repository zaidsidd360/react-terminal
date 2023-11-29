import { useEffect, useState } from "react";
import { ITheme } from "../types/GlobalTypes";
import { themes } from "../common/Themes";

const useTheme = (theme: string | ITheme): ITheme => {
  const [terminalTheme, setTerminalTheme] = useState<ITheme>(themes.dark!);

  useEffect(() => {
    switch (theme) {
      case "light":
        setTerminalTheme(themes.light!);
        break;
      case "dark":
        setTerminalTheme(themes.dark!);
        break;
      case "hacker":
        setTerminalTheme(themes.hacker!);
        break;
      default:
        setTerminalTheme(theme as ITheme);
    }
  }, [theme]);

  return terminalTheme!;
};

export default useTheme;
