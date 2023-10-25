import React from "react";
import { PromptSpan } from "../styles/PromptStyles";

const Prompt = ({ prompt }: { prompt: string }) => {
  return <PromptSpan>{prompt}</PromptSpan>;
};

export default Prompt;
