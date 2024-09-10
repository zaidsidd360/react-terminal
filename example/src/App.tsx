import { useState } from "react";
import { Terminal, TerminalContextProvider } from "../../src/index";
import "./App.css";

function App() {
	const [showTerminal, setShowTerminal] = useState(true);

	const fetchDadJoke = async () => {
		try {
			const response = await fetch("https://icanhazdadjoke.com/", {
				headers: {
					Accept: "application/json",
				},
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			return data.joke;
			console.log(data);
		} catch (error: unknown) {
			console.error("Error:", error);
			if (error instanceof Error) {
				return "Error: " + error.message;
			} else {
				return "An unknown error occurred";
			}
		}
	};

	const commands = {
		bat: (args: string) => {
			if (args === "sum.js")
				return (
					<div>
						<span style={{ color: "lightblue" }}>const</span>{" "}
						<span style={{ color: "yellow" }}>sum = </span>(a, b) =
						{">"} {"{"} <br /> &nbsp;&nbsp;&nbsp;&nbsp;{" "}
						<span style={{ color: "pink" }}>return</span> a + b{" "}
						<br />
						<span>{"}"}</span>
					</div>
				);
		},
		gii: (
			<>
				<div>hii</div>
			</>
		),
		"foo bar": async () => {
			// await new Promise((resolve) => setTimeout(resolve, 10000));
			const joke = await fetchDadJoke();
			return joke;
		},
		thisIsAVeryBigCommand: "noooo",
		hello: "Yoooooooooo",
		kbCat: (
			<img
				src="https://c.tenor.com/rMxNr07CxSMAAAAC/tenor.gif"
				alt="cat"
			/>
		),
	};

	const structure = {
		".hidden": {
			file1: {
				content:
					"The is the content for file1 in the <.hidden> directory.",
			},
			file2: {
				content:
					"The is the content for file2 in the <.hidden> directory.",
			},
			dir2: {
				file: {
					content:
						"The is the content for <file> in the <.hidden/dir2> directory.",
				},
			},
			".secrets": { content: "I'm still afraid of the dark..." },
		},
		public: {
			file1: {
				content: (
					<div>
						"This is the content for file1 in the {"<public>"}{" "}
						directory" <br /> Helloo
					</div>
				),
				// "The is the content for file1 in the <public> directory."
			},
			file2: {
				content:
					"The is the content for file2 in the <public> directory.",
			},
			"script.js": {
				content: (
					<pre>
						<code>
							{`
        const recursivePrint = (name, index) => {
            if(index === 5) return;
            console.log(name)
            recursivePrint(name, index + 1)
        }
      `}
						</code>
					</pre>
				),
			},
		},
		"README.md": {
			content:
				"✌⊂(✰‿✰)つ✌ Thanks for checking out the tool! There is a lot that you can do with react-bash and I'm excited to see all of the fun commands and projects build on top of it!",
		},
	};

	const btn1Callback = () => {
		alert("Hello this is from the button 1");
	};

	const btn2Callback = () => {
		alert("Hello this is from the button 2");
	};

	const btn3Callback = () => {
		// appendExchange("command", "outttputtt", "yooo");
		alert("Hello this is from the button 3");
	};

	return (
		<TerminalContextProvider>
			<div className="main-container">
				{showTerminal ? (
					<Terminal
						btn2Callback={btn2Callback}
						btn3Callback={btn3Callback}
						btn1Callback={btn1Callback}
						commands={commands}
						showTopBar={true}
						directoryStructure={structure}
						prompt="zaid@F571LH:"
						topBarHeight="8%"
						theme={"dark"}
						commandPrediction
					/>
				) : (
					"Click on Show Terminal"
				)}
			</div>
			This button is to test whether the component retains its state upon
			unmount and remount.
			<button
				onClick={() => {
					setShowTerminal(!showTerminal);
				}}
			>
				{showTerminal ? "Hide Terminal" : "Show Terminal"}
			</button>
		</TerminalContextProvider>
	);
}

export default App;
