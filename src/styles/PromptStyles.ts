import styled from "styled-components";

interface PromptSpanProps {
  $unsetPosition?: boolean;
  $smallAndFaded?: boolean;
}

export const PromptSpan = styled.span<PromptSpanProps>`
  width: max-content;
  margin: 0;
  position: ${(props) => (props.$unsetPosition ? "unset" : "absolute")};
  top: 0;
  left: 0;
  color: ${(props) => (props.$smallAndFaded ? "#6a778a" : "#60ec8a")};
  font-size: ${(props) => (props.$smallAndFaded ? "1rem" : "inherit")};

  .pwd {
    color: ${(props) => (props.$smallAndFaded ? "#6a778a" : "#4d9edc")};
    margin-inline: 0;
    /* color: #4d9edc; */
  }
`;
