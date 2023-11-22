import React from "react";
import { TopBarContainer } from "../styles/TopBarStyles";
import Prompt from "./Prompt";

interface ITopBarProps {
  prompt: string;
  pwd: string;
  topBarHeight: string;
}

// TODO: Add TopBar buttons callback functions
const TopBar = ({ prompt, pwd, topBarHeight }: ITopBarProps) => {
  return (
    <>
      <TopBarContainer $topBarHeight={topBarHeight}>
        <span id="btn-red" />
        <span id="btn-yellow" />
        <span id="btn-green" />
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
