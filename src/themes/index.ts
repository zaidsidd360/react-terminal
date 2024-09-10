import ITheme from "../types/Theme";

export const themes: Record<string, ITheme> = {
	light: {
		terminalBg: "#ededee",
		topBarBg: "#ededee",
		promptColor: "#8cde7b",
		pwdColor: "#76a6d2",
		textColor: "#191c1e",
		predictionColor: "#bababa",
	},
	dark: {
		terminalBg: "#191c1e",
		topBarBg: "#191c1e",
		promptColor: "#5bbce9",
		pwdColor: "lightgreen",
		textColor: "#ededed",
		predictionColor: "#333639",
	},
	hacker: {
		terminalBg: "black",
		topBarBg: "black",
		promptColor: "#196620",
		pwdColor: "green",
		textColor: "green",
		predictionColor: "#0f2f15",
	},
	// Add more themes here
};
