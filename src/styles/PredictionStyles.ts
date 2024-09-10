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
	/* This fixed the issue of prediction span having a weird behavior where commands such as "foo bar" were predicted "bar" instead of " bar" when the caret was at the end of "foo" */
	white-space: pre;
`;

export default PredictionSpan;
