interface IFile {
	content: string | JSX.Element;
}

interface IDirectory {
	[key: string]: IFile | IDirectory;
}

export type DirectoryStructure = IDirectory;
