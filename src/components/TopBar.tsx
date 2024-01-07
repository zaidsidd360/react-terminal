import React from "react";
import { TopBarContainer } from "../styles/TopBarStyles";
import Prompt from "./Prompt";
import ITheme from "../types/ThemeType";

interface ITopBarProps {
  prompt: string;
  pwd: string;
  topBarHeight: string;
  terminalTheme: ITheme;
  showTopBarPrompt: boolean;
  btn1Callback?: (args: any) => any;
  btn2Callback?: (args: any) => any;
  btn3Callback?: (args: any) => any;
}

const TopBar = ({
  prompt,
  pwd,
  topBarHeight,
  terminalTheme,
  showTopBarPrompt,
  btn1Callback,
  btn2Callback,
  btn3Callback,
}: ITopBarProps) => {
  return (
    <>
      <TopBarContainer $topBarHeight={topBarHeight} $currTheme={terminalTheme}>
        <span onClick={btn1Callback} id="btn-red" />
        <span onClick={btn2Callback} id="btn-yellow" />
        <span onClick={btn3Callback} id="btn-green" />
        {showTopBarPrompt && (
          <div>
            <Prompt
              prompt={prompt}
              pwd={pwd}
              unsetPosition
              dontRenderDollar
              smallAndFaded
              terminalTheme={terminalTheme}
            />
          </div>
        )}
      </TopBarContainer>
    </>
  );
};

export default TopBar;
