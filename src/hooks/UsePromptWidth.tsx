import { useState, useEffect, useRef } from "react";
import IExchange from "../types/Exchange";

const usePromptWidth = (prompt: string, pwd: string) => {
	const [promptWidth, setPromptWidth] = useState<number>();
	const promptRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		setPromptWidth(promptRef.current?.getBoundingClientRect().width);
	}, [prompt, pwd]);

	return { promptWidth, promptRef };
};

export default usePromptWidth;
