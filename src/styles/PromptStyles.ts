import styled from "styled-components";
import ITheme from "../types/Theme";

interface PromptSpanProps {
	$unsetPosition?: boolean;
	$smallAndFaded?: boolean;
	$currTheme: ITheme;
}

export const PromptSpan = styled.span<PromptSpanProps>`
	width: max-content;
	margin: 0;
	position: ${({ $unsetPosition }) =>
		$unsetPosition ? "unset" : "absolute"};
	top: 0;
	left: 0;
	color: ${(props) =>
		props.$smallAndFaded ? "#6a778a" : `${props.$currTheme.promptColor}`};
	font-size: ${(props) => (props.$smallAndFaded ? "1rem" : "inherit")};

	.pwd {
		color: ${(props) =>
			props.$smallAndFaded ? "#6a778a" : `${props.$currTheme.pwdColor}`};
		margin-inline: 0;
		/* color: #4d9edc; */
		/* "#60ec8a" */
	}
`;
