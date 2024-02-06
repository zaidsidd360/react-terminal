import { useEffect, useRef, useState } from "react";

const useAutoComplete = (options: string[], inputValue: string) => {
	const [autocompleteValue, setAutocompleteValue] = useState("");
	const timeoutRef = useRef<number | null>(null);

	const handleInputChange = () => {
		clearTimeout(timeoutRef.current!); // Clear any existing timeout

		timeoutRef.current = setTimeout(() => {
			const input = inputValue.toLowerCase();

			let closestMatch: string | undefined = "";
			if (input.length > 0) {
				// Find the closest match
				closestMatch = options.find(
					(option: string) =>
						option.toLowerCase() === input ||
						option.toLowerCase().startsWith(input.toLowerCase())
				);
			}

			setAutocompleteValue(closestMatch || "");
		}, 200);
	};

	useEffect(() => {
		handleInputChange();
		return () => {
			clearTimeout(timeoutRef.current!);
		};
	}, [options, inputValue]);

	return autocompleteValue;
};

export default useAutoComplete;
