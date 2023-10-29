import { SetStateAction, createContext, useState } from "react";
import { IExchange } from "../types/GlobalTypes";

export interface ITerminalContext {
  exchangeHistory: IExchange[];
  setExchangeHistory: React.Dispatch<SetStateAction<IExchange[]>>;
}

export const TerminalContext = createContext<ITerminalContext | null>(null);

const TerminalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [exchangeHistory, setExchangeHistory] = useState<IExchange[]>([]);

  return (
    <TerminalContext.Provider value={{ exchangeHistory, setExchangeHistory }}>
      {children}
    </TerminalContext.Provider>
  );
};

export default TerminalContextProvider;
