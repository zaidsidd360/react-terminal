import styled from "styled-components";

export const TopBarContainer = styled.header`
  display: flex;
  justify-content: left;
  align-items: center;
  /* background-image: linear-gradient(to bottom, #efefef, #d7d7d7); */
  height: 8%;
  /* border-bottom: 1px solid lightgray; */
  background-color: #252a33;

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
`;
