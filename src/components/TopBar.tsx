import React from "react";
import { TopBarContainer } from "../styles/TopBarStyles";
import Prompt from "./Prompt";

interface ITopBarProps {
  prompt: string;
  pwd: string;
  topBarHeight: string;
  btn1Callback?: (args: any) => any;
  btn2Callback?: (args: any) => any;
  btn3Callback?: (args: any) => any;
}

const TopBar = (
  { prompt, pwd, topBarHeight, btn1Callback, btn2Callback, btn3Callback }:
    ITopBarProps,
) => {
  return (
    <>
      <TopBarContainer $topBarHeight={topBarHeight}>
        <span onClick={btn1Callback} id="btn-red" />
        <span onClick={btn2Callback} id="btn-yellow" />
        <span onClick={btn3Callback} id="btn-green" />
        <div>
          <Prompt
            prompt={prompt}
            pwd={pwd}
            unsetPosition
            dontRenderDollar
            smallAndFaded
          />
        </div>
      </TopBarContainer>
    </>
  );
};

export default TopBar;
