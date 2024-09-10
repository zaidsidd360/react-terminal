declare module "use-caret-position" {
	interface useCaretPositionReturnType {
		x: number;
		y: number;
		getPosition: (inputRef: React.MutableRefObject) => void;
	}

	function useCaretPosition(
		inputRef: React.MutableRefObject
	): useCaretPositionReturnType;

	export default useCaretPosition;
}
