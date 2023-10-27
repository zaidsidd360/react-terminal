import styled from "styled-components";

interface PromptSpanProps {
  $unsetPosition?: boolean;
}

export const PromptSpan = styled.span<PromptSpanProps>`
  width: max-content;
  margin: 0;
  position: ${(props) => (props.$unsetPosition ? "unset" : "absolute")};
  top: 0;
  left: 0;
  color: #70f0fe;
`;
