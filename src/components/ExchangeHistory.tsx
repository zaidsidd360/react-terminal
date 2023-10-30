import React, { useContext } from "react";
import Prompt from "./Prompt";
import styled from "styled-components";
import { IExchange } from "../types/GlobalTypes";
import { TerminalContext } from "../contexts/TerminalContext";

interface IExchangeProps {
  exchange: IExchange;
  prompt: string;
}

const Exchange = ({ exchange, prompt }: IExchangeProps) => {
  return (
    <>
      <ExchangeContainer>
        <Prompt prompt={prompt} unsetPosition />
        <span id="command">{exchange.command}</span>
      </ExchangeContainer>
      <span>{exchange.output}</span>
    </>
  );
};

const ExchangeContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  span {
    margin-block: 0.5rem;
  }

  #command {
    margin-left: 5px;
  }
`;

interface IExchangeHistoryProps {
  prompt: string;
}

const ExchangeHistory = ({ prompt }: IExchangeHistoryProps) => {
  const { exchangeHistory } = useContext(TerminalContext)!;
  return (
    <div>
      {exchangeHistory.map((exchange: IExchange, i: number) => {
        return <Exchange key={i} exchange={exchange} prompt={prompt} />;
      })}
    </div>
  );
};

export default ExchangeHistory;
