import React, { useContext } from "react";
import Prompt from "./Prompt";
import styled from "styled-components";
import { IExchange, ITheme } from "../types/GlobalTypes";
import { TerminalContext } from "../contexts/TerminalContext";

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

const ExchangeContainer = styled.div`
  width: 100%;
  word-wrap: break-word;
  hyphens: auto;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  span {
    margin-block: 0.5rem;
  }

  #command {
    margin-left: 5px;
  }
`;

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

export default ExchangeHistory;
