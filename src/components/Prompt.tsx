import React, { ForwardedRef, LegacyRef, RefObject } from "react";
import { PromptSpan } from "../styles/PromptStyles";

interface PromptProps {
  prompt: string;
  unsetPosition?: boolean;
  ref: React.RefObject<HTMLSpanElement>;
  pwd: string;
  isMultiStepOn?: boolean;
}

/* Since functional components cannot recieve refs as props 
(because it breaks React's principle of prop-immutability), we must 
wrap the ref-recieving child component with a React.forwardRef call 
which does the ref forwarding for us under the hood. */
const Prompt = React.forwardRef<HTMLSpanElement, PromptProps>(
  ({ prompt, unsetPosition, pwd, isMultiStepOn }, ref) => {
    return (
      <PromptSpan $unsetPosition={unsetPosition} ref={ref}>
        {isMultiStepOn ? (
          <>{prompt}</>
        ) : (
          <>
            {prompt}
            <span className="pwd">
              ~{pwd !== "" ? "/" : ""}
              {pwd}
            </span>
            $
          </>
        )}
      </PromptSpan>
    );
  }
);
export default Prompt;
