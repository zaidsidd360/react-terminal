import React, { ForwardedRef, LegacyRef, RefObject } from "react";
import { PromptSpan } from "../styles/PromptStyles";

interface PromptProps {
  prompt: string;
  unsetPosition?: boolean;
  ref?: React.RefObject<HTMLSpanElement>;
  pwd: string;
  dontRenderDollar?: boolean;
  smallAndFaded?: boolean;
}

/* Since functional components cannot recieve refs as props 
(because it breaks React's principle of prop-immutability), we must 
wrap the ref-recieving child component with a React.forwardRef call 
which does the ref forwarding for us under the hood. */
const Prompt = React.forwardRef<HTMLSpanElement, PromptProps>(
  ({ prompt, unsetPosition, pwd, dontRenderDollar, smallAndFaded }, ref) => {
    return (
      <PromptSpan
        $unsetPosition={unsetPosition}
        $smallAndFaded={smallAndFaded}
        ref={ref}
      >
        <>
          {prompt}
          <span className="pwd">
            ~{pwd !== "" ? "/" : ""}
            {pwd}
          </span>
          {dontRenderDollar ? null : "$"}
        </>
      </PromptSpan>
    );
  }
);
export default Prompt;
