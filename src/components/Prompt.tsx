import React from "react";
import { PromptSpan } from "../styles/PromptStyles";
import ITheme from "../types/ThemeType";

interface PromptProps {
  prompt: string;
  unsetPosition?: boolean;
  ref?: React.RefObject<HTMLSpanElement>;
  pwd: string;
  dontRenderDollar?: boolean;
  smallAndFaded?: boolean;
  terminalTheme: ITheme;
}

/* Since functional components cannot recieve refs as props, we must
wrap the ref-recieving child component with a React.forwardRef call
which does the ref forwarding for us under the hood. */
const Prompt = React.forwardRef<HTMLSpanElement, PromptProps>(
  (
    {
      prompt,
      unsetPosition,
      pwd,
      dontRenderDollar,
      smallAndFaded,
      terminalTheme,
    },
    ref
  ) => {
    return (
      <PromptSpan
        $unsetPosition={unsetPosition}
        $smallAndFaded={smallAndFaded}
        ref={ref}
        $currTheme={terminalTheme}
      >
        {prompt}
        <span className="pwd">
          ~{pwd !== "" ? "/" : ""}
          {pwd}
          {dontRenderDollar ? null : "$"}
        </span>
      </PromptSpan>
    );
  }
);
export default Prompt;
