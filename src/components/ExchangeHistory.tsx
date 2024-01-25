import { useContext } from "react";
import Prompt from "./Prompt";
import IExchange from "../types/ExchangeType";
import ITheme from "../types/ThemeType";
import { TerminalContext } from "../contexts/TerminalContext";
import { ExchangeContainer } from "../styles/ExchangeStyles";

const ExchangeHistory = ({ terminalTheme }: { terminalTheme: ITheme }) => {
  const { exchangeHistory } = useContext(TerminalContext)!;
  return (
    <>
      {exchangeHistory.map((exchange: IExchange, i: number) => {
        return (
          <Exchange key={i} exchange={exchange} terminalTheme={terminalTheme} />
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
  return (
    <>
      <ExchangeContainer>
        <Prompt
          prompt={exchange.prompt}
          pwd={exchange.pwd}
          unsetPosition
          terminalTheme={terminalTheme}
        />
        <span id="command">{exchange.command}</span>
        <br />
        <span>{exchange.output}</span>
      </ExchangeContainer>
    </>
  );
};

export default ExchangeHistory;
