import { ITheme } from "../types/GlobalTypes";

export const themes: Record<string, ITheme> = {
  light: {
    terminalBg: "white",
    topBarBg: "white",
    promptColor: "limegreen",
    workingDirColor: "blue",
    textColor: "black",
  },
  dark: {
    terminalBg: "#151515",
    topBarBg: "#151515",
    promptColor: "yellow",
    workingDirColor: "lightblue",
    textColor: "white",
  },
  // hacker: {}
};
