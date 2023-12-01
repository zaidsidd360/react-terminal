import { ITheme } from "../types/GlobalTypes";

export const themes: Record<string, ITheme> = {
  light: {
    terminalBg: "#ededee",
    topBarBg: "#ededee",
    promptColor: "#40f71b",
    workingDirColor: "#1b8df7",
    textColor: "#191c1e",
  },
  dark: {
    terminalBg: "#191c1e",
    topBarBg: "#191c1e",
    promptColor: "#5bbce9",
    workingDirColor: "lightgreen",
    textColor: "#ededed",
  },
  hacker: {
    terminalBg: "black",
    topBarBg: "black",
    promptColor: "#191c1e",
    workingDirColor: "green",
    textColor: "green",
  },
};
