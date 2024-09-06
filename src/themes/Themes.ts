import ITheme from "../@types/Theme";

export const themes: Record<string, ITheme> = {
	light: {
		terminalBg: "#f5f5f7",
		topBarBg: "#e8e8ed",
		promptColor: "#4caf50",
		pwdColor: "#3498db",
		textColor: "#2c3e50",
		predictionColor: "#bdc3c7",
	},
	dark: {
		terminalBg: "#1e1e2e",
		topBarBg: "#181825",
		promptColor: "#89dceb",
		pwdColor: "#a6e3a1",
		textColor: "#cdd6f4",
		predictionColor: "#45475a",
	},
	hacker: {
		terminalBg: "black",
		topBarBg: "black",
		promptColor: "#196620",
		pwdColor: "green",
		textColor: "green",
		predictionColor: "#0f2f15",
	},
	sunset: {
		terminalBg: "#2c2137",
		topBarBg: "#2c2137",
		promptColor: "#ff9a8c",
		pwdColor: "#ffd700",
		textColor: "#f0e3ff",
		predictionColor: "#4a3b55",
	},
	nordica: {
		terminalBg: "#2e3440",
		topBarBg: "#2e3440",
		promptColor: "#88c0d0",
		pwdColor: "#ebcb8b",
		textColor: "#d8dee9",
		predictionColor: "#434c5e",
	},
	pastelDream: {
		terminalBg: "#f0e6ef",
		topBarBg: "#f0e6ef",
		promptColor: "#7c9885",
		pwdColor: "#aa6f73",
		textColor: "#5d576b",
		predictionColor: "#d6cbd3",
	},
	monokai: {
		terminalBg: "#272822",
		topBarBg: "#272822",
		promptColor: "#a6e22e",
		pwdColor: "#66d9ef",
		textColor: "#f8f8f2",
		predictionColor: "#49483e",
	},
	solarized: {
		terminalBg: "#002b36",
		topBarBg: "#002b36",
		promptColor: "#859900",
		pwdColor: "#2aa198",
		textColor: "#839496",
		predictionColor: "#073642",
	},
	// Add more themes here
};
