import styled from "styled-components";

interface TerminalContainerProps {
  $promptWidth: number;
}

export const TerminalContainer = styled.div<TerminalContainerProps>`
  border: 1px solid lightgray;
  width: 50vw;
  height: 50vh;
  border-radius: 0.7rem;
  overflow: hidden;
  box-shadow: 2px 2px 50px lightgray, -2px -2px 50px lightgray;

  main {
    box-sizing: border-box;
    width: 100%;
    height: 90%;
    padding: 0.5rem;
    font-size: 1.5rem;
    background-color: #262626;
    overflow-y: auto;
    color: white;

    div {
      position: relative;

      textarea {
        resize: none;
        width: 100%;
        border: none;
        text-indent: ${(props) => props.$promptWidth + 5 + "px"};
        background-color: inherit;
        color: inherit;
        font-family: inherit;
        font-size: inherit;
        &:focus {
          outline: none;
        }
      }
      /* #caret {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 90;
        content: "";
        width: 15px;
        height: 1.7rem;
        background-color: red;
      } */
    }
    &:hover {
      cursor: text;
    }
  }
`;
