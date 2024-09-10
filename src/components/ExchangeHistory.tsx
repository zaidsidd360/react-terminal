import { useContext } from "react";
import Prompt from "./Prompt";
import IExchange from "../types/Exchange";
import ITheme from "../types/Theme";
import { TerminalContext } from "../contexts/TerminalContext";
import { ExchangeContainer } from "../styles/ExchangeStyles";

const ExchangeHistory = ({ terminalTheme }: { terminalTheme: ITheme }) => {
	const { exchangeHistory } = useContext(TerminalContext)!;
	return (
		<>
			{exchangeHistory.map((exchange: IExchange, i: number) => {
				return (
					<Exchange
						key={i}
						exchange={exchange}
						terminalTheme={terminalTheme}
					/>
				);
			})}
		</>
	);
};

interface IExchangeProps {
	exchange: IExchange;
	terminalTheme: ITheme;
}

const isExchangeObject = (
	exchange: IExchange
): exchange is {
	command: string;
	output: string | React.JSX.Element;
	prompt: string;
	pwd: string;
} => {
	return typeof exchange !== "string";
};

const Exchange = ({ exchange, terminalTheme }: IExchangeProps) => {
	if (isExchangeObject(exchange)) {
		const { prompt, pwd, command, output } = exchange;
		return (
			<>
				<ExchangeContainer>
					<Prompt
						prompt={prompt as string}
						pwd={pwd}
						unsetPosition
						terminalTheme={terminalTheme}
					/>
					<span id="command">{command}</span>
					<br />
					<span>{output}</span>
				</ExchangeContainer>
			</>
		);
	} else
		return (
			<>
				<span>{exchange}</span>
			</>
		);
};

export default ExchangeHistory;
