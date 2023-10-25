import React from "react";
import { TopBarContainer } from "../styles/TopBarStyles";

const TopBar = () => {
  return (
    <>
      <TopBarContainer>
        <span id="btn-red" />
        <span id="btn-yellow" />
        <span id="btn-green" />
      </TopBarContainer>
    </>
  );
};

export default TopBar;
