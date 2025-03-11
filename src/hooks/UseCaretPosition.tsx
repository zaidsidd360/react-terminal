import React, { useRef, useEffect } from "react";

// A giant waste of time
function useCaretPosition(
	textareaRef: React.RefObject<HTMLTextAreaElement>,
	promptWidth: number,
	inputValue: string
) {
	const caretPosition = useRef({ x: 0, y: 0 });

	useEffect(() => {
		const handleCaretChange = () => {
			const textarea = textareaRef.current;
			if (!textarea) return;

			const rect = textarea.getBoundingClientRect();
			const selectionStart = textarea.selectionEnd;
			const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
			const fontSize = parseFloat(getComputedStyle(textarea).fontSize);
			const horizontalPosition =
				rect.left + promptWidth + (selectionStart * fontSize) / 2 - 5;

			const verticalPosition = rect.top;

			caretPosition.current = {
				x: horizontalPosition,
				y: verticalPosition,
			};
		};

		textareaRef.current?.addEventListener("input", handleCaretChange);

		return () => {
			textareaRef.current?.removeEventListener(
				"input",
				handleCaretChange
			);
		};
	}, [textareaRef, inputValue]);

	return caretPosition.current;
}

export default useCaretPosition;
