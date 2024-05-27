import styled from "styled-components";
import ITheme from "../@types/Theme";

interface TerminalContainerProps {
	$promptWidth: number;
	$showTopBar: boolean;
	$topBarHeight: string;
	$currTheme: ITheme;
	$height: string;
	$width: string;
	$borderRadius: string;
}

export const TerminalContainer = styled.div<TerminalContainerProps>`
	width: ${({ $width }) => $width};
	height: ${({ $height }) => $height};
	border-radius: ${({ $borderRadius }) => $borderRadius};
	overflow: hidden;

	.main-terminal {
		box-sizing: border-box;
		width: 100%;
		height: ${(props) =>
			props.$showTopBar ? `calc(100% - ${props.$topBarHeight})` : "100%"};
		padding: 0.5rem;
		font-size: 1rem;
		/* background-color: #252a33; */
		background-color: ${({ $currTheme }) => $currTheme.terminalBg};
		overflow-y: auto;
		/* color: white; */
		color: ${({ $currTheme }) => $currTheme.textColor};

		.input-prompt {
			position: relative;

			textarea {
				/* caret-color: transparent; */
				resize: none;
				width: 100%;
				border: none;
				text-indent: calc(
					${({ $promptWidth }) => $promptWidth + "px"} + 0.3rem
				);
				background-color: inherit;
				color: inherit;
				font-family: inherit;
				font-size: inherit;
				&:focus {
					outline: none;
				}
			}
		}

		.scroll-div {
			visibility: hidden;
		}

		&:hover {
			cursor: text;
		}

		&::-webkit-scrollbar {
			width: 0.7rem;
			&:hover {
				cursor: pointer;
			}
		}

		&::-webkit-scrollbar-thumb {
			background-color: rgba(255, 255, 255, 0.2);
		}
	}
`;
