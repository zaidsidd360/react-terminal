import React from "react";
import Prompt from "./Prompt";
import styled from "styled-components";
import { IExchange } from "../types/GlobalTypes";

const Exchange = ({ exchange, prompt }: any) => {
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

const ExchangeHistory = ({
  exchangeHistory,
  prompt,
}: {
  exchangeHistory: IExchange[];
  prompt: string;
}) => {
  return (
    <div>
      {exchangeHistory.map((exchange, i) => {
        return <Exchange key={i} exchange={exchange} prompt={prompt} />;
      })}
    </div>
  );
};

const CommandsAndOutputsContainer = styled.div`
  p {
    margin-block: 0;
  }
`;

export default ExchangeHistory;
