import styled from "styled-components";

export const TerminalContainer = styled.div`
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
    font-size: 1.2rem;
    background-color: #fefefe;
    overflow-y: scroll;

    div {
      position: relative;

      textarea {
        resize: none;
        font-size: 1.2rem;
        width: 100%;
        border: none;
        text-indent: 12.5rem;
        &:focus {
          outline: none;
        }
      }
    }
    &:hover {
      cursor: text;
    }
  }
`;
