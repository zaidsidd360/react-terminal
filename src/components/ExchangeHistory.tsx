import { useContext } from "react";
import Prompt from "./Prompt";
import IExchange from "../types/ExchangeType";
import ITheme from "../types/ThemeType";
import { TerminalContext } from "../contexts/TerminalContext";
import { ExchangeContainer } from "../styles/ExchangeStyles";

const ExchangeHistory = ({
	terminalTheme,
}: {
	terminalTheme: ITheme;
}): React.JSX.Element => {
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

const Exchange = ({ exchange, terminalTheme }: IExchangeProps) => {
	if (typeof exchange !== "string") {
		const currExchange = exchange as {
			command: string;
			output: string | React.JSX.Element;
			prompt: string;
			pwd: string;
		};
		return (
			<>
				<ExchangeContainer>
					<Prompt
						prompt={currExchange.prompt}
						pwd={currExchange.pwd}
						unsetPosition
						terminalTheme={terminalTheme}
					/>
					<span id="command">{currExchange.command}</span>
					<br />
					<span>{currExchange.output}</span>
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
