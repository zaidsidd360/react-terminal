import React from "react";

interface IFile {
	content: string | React.JSX.Element;
}

interface IDirectory {
	[key: string]: IFile | IDirectory;
}

export type DirectoryStructure = IDirectory;
