import { SetStateAction, createContext, useEffect, useState } from "react";
import { IExchange } from "../types/GlobalTypes";

export interface ITerminalContext {
  exchangeHistory: IExchange[];
  setExchangeHistory: React.Dispatch<SetStateAction<IExchange[]>>;
  commandHistory: string[];
  setCommandHistory: React.Dispatch<SetStateAction<string[]>>;
  historyPointer: number;
  setHistoryPointer: React.Dispatch<SetStateAction<number>>;
  pwd: string;
  setPwd: React.Dispatch<SetStateAction<string>>;
}

export const TerminalContext = createContext<ITerminalContext | null>(null);

const TerminalContextProvider = (props: { children: React.ReactNode }) => {
  const [exchangeHistory, setExchangeHistory] = useState<IExchange[]>([]);

  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  const [historyPointer, setHistoryPointer] = useState<number>(
    commandHistory.length
  );

  const [pwd, setPwd] = useState<string>("");

  useEffect(() => {
    setHistoryPointer(commandHistory.length);
  }, [commandHistory]);

  return (
    <TerminalContext.Provider
      value={{
        exchangeHistory,
        setExchangeHistory,
        commandHistory,
        setCommandHistory,
        historyPointer,
        setHistoryPointer,
        pwd,
        setPwd,
      }}
    >
      {props.children}
    </TerminalContext.Provider>
  );
};

export default TerminalContextProvider;
