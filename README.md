# 🖥️ React Terminal

A sleek and customizable terminal emulator component for React applications.

<!-- ![Terminal Demo](https://your-demo-gif-url.gif) -->

## 🚀 Features

- 🎨 Customizable themes (7+ built-in themes)
- 🔍 Command prediction (with tab autocomplete)
- 📂 Built-in file system simulation
- ⌨️ Built-in commands (ls, cd, cat, etc.)
- 🔧 Extensible with custom commands (async commands supported)
- ⏮️ Command history navigation
- 🔄 Async command loading animation

## 📦 Installation

```bash
npm install react-terminal
```

## 🛠️ Usage

```jsx
// App.tsx
import { Terminal, TerminalContextProvider } from 'react-terminal';

// !Don't forget to wrap your app's entry point with TerminalContextProvider!
function App() {
  return (
      <TerminalContextProvider>
        {/* Rest of your components */}
      </TerminalContextProvider>
  );
}

// SomeComponent.tsx
import { Terminal } from 'react-terminal';

function SomeComponent() {
  return (
    <Terminal
      prompt="user@anon:"
      theme="dark"
      welcomeMessage="Welcome to React Terminal Emulator!"
    />
  )
}
```

## 🎛️ Props

| Name                  | Description                               | Type                       | Default        |
|-----------------------|-------------------------------------------|----------------------------|----------------|
| `prompt`              | The prompt string displayed before each command | `string`              | `"user@anon:"` |
| `commands`            | Custom commands object                    | `IUserCommands`           | `{}`           |
| `directoryStructure`  | Initial directory structure               | `IDirectoryStructure`                  | `{}`           |
| `height`              | Height of the terminal                    | `string` CSS units        | `"100%"`       |
| `width`               | Width of the terminal                     | `string` CSS units         | `"100%"`       |
| `borderRadius`        | Border radius of the terminal             | `string` CSS units         | `"0.7rem"`     |
| `commandPrediction`   | Enable command prediction                 | `boolean`                  | `false`        |
| `showTopBar`          | Show the top bar of the terminal          | `boolean`                  | `true`         |
| `topBarHeight`        | Height of the top bar                     | `string` CSS units         | `"8%"`         |
| `theme`               | Terminal theme                            | `"dark"` \| `"light"` \| `"hacker"` \| `"sunset"` \| `"nordica"` \| `"pastelDream"` \| `"monokai"` \| `"solarized"` \| `ITheme` | `"dark"` |
| `welcomeMessage`      | Welcome message displayed on start        | `string \| React.JSX.Element` | `""`        |
| `showTopBarPrompt`    | Show prompt in the top bar                | `boolean`                  | `true`         |
| `autoCompleteAnimation` | Enable autocomplete animation (WIP)     | `boolean`                  | `false`        |
| `btn1Callback`        | Callback for the first top bar button     | `(args: any) => any`       | `undefined`    |
| `btn2Callback`        | Callback for the second top bar button    | `(args: any) => any`       | `undefined`    |
| `btn3Callback`        | Callback for the third top bar button     | `(args: any) => any`       | `undefined`    |
| `asyncCommandLoader`  | Loader style for async commands           | `string` See them in action [here](https://jsfiddle.net/sindresorhus/2eLtsbey/embedded/result/)                 | `"aesthetic2"` |
| `asyncCommandLoaderSpeed` | Speed multiplier for async command loader | `number` range(0, 1)               | `0.5`          |

<details>
  <summary>
    <strong>🔍 Complicated Types</strong>
  </summary>
IUserCommands

```ts
type IUserCommands = Record<
  string,
  | string
  | React.JSX.Element
  | ((args?: any) => React.JSX.Element | string | void | Promise<string | void>)
>;
```

This type defines a record where each key represents a command, and the value can be a simple string, a React element, or a function that returns a string, a React element, or a Promise.

IDirectoryStructure

```ts
interface IFile {
  content: string | JSX.Element;
}

interface IDirectory {
  [key: string]: IFile | IDirectory;
}

type DirectoryStructure = IDirectory;
```

IDirectoryStructure represents the structure of the terminal's file system. It consists of a recursive structure of directories and files. Each directory contains files or other directories. A file has a content field, which can be a string or a React element.

ITheme

```ts
export default interface ITheme {
  terminalBg: string;
  topBarBg: string;
  promptColor: string;
  pwdColor: string;
  textColor: string;
  predictionColor: string;
}
```

ITheme allows customization of various terminal colors. Each property corresponds to a CSS color value:

- terminalBg: Background color of the terminal.
- topBarBg: Background color of the top bar.
- promptColor: Color of the prompt string.
- pwdColor: Color of the present working directory display.
- textColor: Default text color.
- predictionColor: Color of the command prediction text.

</details>

## 🌈 Themes

The terminal comes with several built-in themes:

- 🌞 Light
- 🌚 Dark
- 👨‍💻 Hacker
- 🌅 Sunset
- ❄️ Nordica
- 🍬 Pastel Dream
- 🎨 Monokai
- 🌊 Solarized

You can also create custom themes by passing an `ITheme` object.

## 🔧 Custom Commands

You can add custom commands to the terminal:

```jsx
const customCommands = {
  hello: "Hello, World!",
  greet: (name) => `Hello, ${name}!`,
  asyncTask: async () => {
    await someAsyncOperation();
    return "Task completed!";
  },
};

<Terminal commands={customCommands} />
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-repo/issues).

## 📄 License

This project is [MIT](https://opensource.org/licenses/MIT) licensed.

README is incomplete, will be updated soon.

Component is almost ready to be published to npm. Until then, to run and test the project locally:

```bash
git clone https://github.com/zaidsidd360/react-terminal.git
```

```bash
cd react-terminal
```

```bash
npm i
```

or

```bash
yarn
```

then

```bash
cd example
```

repeat `npm i` or `yarn`
and finally,

```bash
npm run dev
```

or

```bash
yarn dev
```
