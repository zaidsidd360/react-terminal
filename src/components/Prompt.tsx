import React from "react";
import { PromptSpan } from "../styles/PromptStyles";
import ITheme from "../types/Theme";

interface PromptProps {
	prompt: string;
	unsetPosition?: boolean;
	ref?: React.RefObject<HTMLSpanElement>;
	pwd: string;
	dontRenderDollar?: boolean;
	smallAndFaded?: boolean;
	terminalTheme: ITheme;
	isCommandActive?: boolean;
}

const Prompt = React.forwardRef<HTMLSpanElement, PromptProps>(
	(
		{
			prompt,
			unsetPosition,
			pwd,
			dontRenderDollar,
			smallAndFaded,
			terminalTheme,
			isCommandActive,
		},
		ref
	) => {
		return (
			<PromptSpan
				$unsetPosition={unsetPosition}
				$smallAndFaded={smallAndFaded}
				ref={ref}
				$currTheme={terminalTheme}
				$isCommandActive={isCommandActive ?? false}
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
