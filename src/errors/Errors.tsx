import styled from "styled-components";

// TODO: Move all the errors into separate files
export const argsNotReqd = (base: string): React.JSX.Element => {
	return (
		<>
			"The {base} command doesn't take any arguments. Did you mean{" "}
			<Highlight>{base}</Highlight>
			?"
		</>
	);
};

export const commandNotFound = (base: string): React.JSX.Element => {
	return (
		<>
			bash: <Highlight>{base}</Highlight>: command not found
		</>
	);
};

export const redundantMkdir = (args: string): React.JSX.Element => {
	return (
		<>
			bash: mkdir: cannot create directory '<Highlight>{args}</Highlight>
			': File exists
		</>
	);
};

export const notADirectory = (args: string): React.JSX.Element => {
	return (
		<>
			bash: cd: not a directory: <Highlight>{args}</Highlight>
		</>
	);
};

export const noSuchFileOrDirectory = (
	args: string,
	base: string
): React.JSX.Element => {
	return (
		<>
			{base}: <Highlight>{args}</Highlight>: No such file or directory
		</>
	);
};

export const isADirectory = (args: string): React.JSX.Element => {
	return (
		<>
			bash: cat: <Highlight>{args}</Highlight>: Is a directory
		</>
	);
};

export const tooManyArgs = (base: string): React.JSX.Element => {
	return <>bash: {base}: too many arguments</>;
};

export const argsReqd = (
	base: string,
	suggestion: string
): React.JSX.Element => {
	return (
		<>
			"The {base} command requires one argument. Did you mean{" "}
			<Highlight>
				{base} {suggestion}
			</Highlight>
			?"
		</>
	);
};

const Highlight = styled.span`
	background-color: #373737;
	color: inherit;
	border-radius: 0.2rem;
	padding-inline: 0.5rem;
`;
