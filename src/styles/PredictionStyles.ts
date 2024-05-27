import styled from "styled-components";

interface PredictionSpanPropType {
	$caretPosition: {
		x: number;
		y: number;
	};
	$predictionColor: string;
}

const PredictionSpan = styled.span<PredictionSpanPropType>`
	color: ${({ $predictionColor }) => $predictionColor};
	position: absolute;
	top: ${(props) => props.$caretPosition.y + "px"};
	left: calc(${(props) => props.$caretPosition.x - 15 + "px"});
`;

export default PredictionSpan;
