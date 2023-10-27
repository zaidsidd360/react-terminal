import React, { ForwardedRef, LegacyRef, RefObject } from "react";
import { PromptSpan } from "../styles/PromptStyles";

interface PromptProps {
  prompt: string;
  unsetPosition?: boolean;
  ref: React.RefObject<HTMLSpanElement>;
}

/* Since functional components cannot recieve refs as props 
(because it breaks React's principle of prop-immutability), we must 
wrap the ref-recieving child component with a React.forwardRef call 
which does the ref forwarding for us under the hood. */
const Prompt = React.forwardRef<HTMLSpanElement, PromptProps>(
  ({ prompt, unsetPosition }, ref) => {
    return (
      <PromptSpan $unsetPosition={unsetPosition} ref={ref}>
        {prompt}
      </PromptSpan>
    );
  }
);
export default Prompt;
