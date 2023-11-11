import styled from "styled-components";

interface TerminalContainerProps {
  $promptWidth: number;
}

export const TerminalContainer = styled.div<TerminalContainerProps>`
  /* border: 1px solid lightgray; */
  width: 40vw;
  height: 50vh;
  border-radius: 0.3rem;
  overflow: hidden;
  box-shadow: 2px 2px 50px lightgray, -2px -2px 50px lightgray;
  position: absolute;
  /* z-index: 999;
  width: 100%;
  height: 100%; */

  .main-terminal {
    box-sizing: border-box;
    width: 100%;
    height: 92%;
    padding: 0.5rem;
    font-size: 1.2rem;
    background-color: #252a33;
    overflow-y: auto;
    color: white;

    .input-prompt {
      position: relative;

      textarea {
        /* caret-color: transparent; */
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
