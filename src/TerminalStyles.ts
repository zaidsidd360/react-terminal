import styled from "styled-components";

export const TerminalContainer = styled.div`
  border: 1px solid lightgray;
  width: 50vw;
  height: 50vh;
  border-radius: 0.7rem;
  overflow: hidden;
  box-shadow: 2px 2px 5px lightgray;

  header {
    display: flex;
    justify-content: left;
    align-items: center;
    background-image: linear-gradient(to bottom, #efefef, #d7d7d7);
    height: 10%;

    span {
      border-radius: 50%;
      height: 50%;
      aspect-ratio: 1;
      margin-inline: 0.5rem;
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
  }

  main {
    box-sizing: border-box;
    width: 100%;
    height: 90%;
    padding: 0.5rem;
    font-size: 1.2rem;

    div {
      position: relative;

      p {
        width: max-content;
        margin: 0 0.5rem 0;
        position: absolute;
        top: 0.25rem;
        left: 0;
        color: #00cd49;
      }

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
