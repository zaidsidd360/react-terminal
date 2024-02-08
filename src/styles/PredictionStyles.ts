import styled from "styled-components";

interface PredictionSpanPropType {
	$caretPosition: {
		x: number;
		y: number;
	};
	$predictionColor: string;
}

const PredictionSpan = styled.span<PredictionSpanPropType>`
	/* text-shadow: 2px 2px 7px lightblue, -2px -2px 7px lightblue; */
	/* padding-inline: 5px; */
	/* background-color: red; */
	color: ${({ $predictionColor }) => $predictionColor};
	border-radius: 5px;
	position: fixed;
	top: ${(props) => props.$caretPosition.y + "px"};
	left: calc(${(props) => props.$caretPosition.x + "px"} + 1rem);
`;

export default PredictionSpan;
