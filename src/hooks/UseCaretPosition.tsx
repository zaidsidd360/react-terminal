import { useRef, useEffect } from "react";

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
			const selectionStart = textarea.selectionStart;
			const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
			const horizontalPosition =
				rect.left + promptWidth + 5 + selectionStart * 7.5;

			let lineNumberStart = 0;

			const verticalPosition = rect.top + lineNumberStart * lineHeight;

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
