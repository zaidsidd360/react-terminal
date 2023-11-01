import styled from "styled-components";

export const clearNoArgs = () => {
  return (
    <>
      "The clear command doesn't take any arguments. Did you mean{" "}
      <Command>clear</Command>
      ?"
    </>
  );
};

export const commandNotFound = (command: string) => {
  return (
    <>
      <Command>{command}</Command>: command not found
    </>
  );
};

const Command = styled.span`
  background-color: rgba(255, 255, 255, 0.5);
  color: black;
  border-radius: 0.2rem;
  padding-inline: 0.5rem;
`;
