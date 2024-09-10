import styled from "styled-components";
import ITheme from "../types/Theme";

interface ITopBarContainerProps {
	$topBarHeight: string;
	$currTheme: ITheme;
}

export const TopBarContainer = styled.header<ITopBarContainerProps>`
	display: flex;
	justify-content: left;
	align-items: center;
	height: ${(props) => props.$topBarHeight};
	/* background-color: #252a33; */
	background-color: ${({ $currTheme }) => $currTheme.topBarBg};
	/* border-bottom: 1px solid #5d697e; */
	text-align: center;
	position: relative;

	div {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	span {
		border-radius: 50%;
		height: 45%;
		aspect-ratio: 1;
		margin-left: 0.5rem;
	}

	#btn-red {
		background-color: #ff5a5b;
	}

	#btn-yellow {
		background-color: #ffbb38;
	}

	#btn-green {
		background-color: #00cd49;
	}
`;
