import { useEffect, useRef, useState } from "react";

const usePrediction = (options: string[], inputValue: string) => {
	const [autocompleteValue, setAutocompleteValue] = useState("");
	const timeoutRef = useRef<number | null>(null);

	const handleInputChange = () => {
		clearTimeout(timeoutRef.current!);

		timeoutRef.current = setTimeout(() => {
			const input = inputValue.toLowerCase();

			let closestMatch: string | undefined = "";
			if (input.length > 0) {
				// Find the closest match
				closestMatch = options.find((option: string) =>
					option.startsWith(inputValue)
				);
			}

			setAutocompleteValue(closestMatch || "");
		}, 50);
	};

	useEffect(() => {
		handleInputChange();
		return () => {
			clearTimeout(timeoutRef.current!);
		};
	}, [options, inputValue]);

	return autocompleteValue;
};

export default usePrediction;
