import React from "react";
import { TopBarContainer } from "../styles/TopBarStyles";
import Prompt from "./Prompt";

interface ITopBarProps {
  prompt: string;
  pwd: string;
}

// TODO: Add TopBar buttons callback functions
const TopBar = ({ prompt, pwd }: ITopBarProps) => {
  return (
    <>
      <TopBarContainer>
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
