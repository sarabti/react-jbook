import "./code-editor.css";
import MonacoEditor, { type OnMount } from "@monaco-editor/react";
import prettier from "prettier";
import parserBabel from "prettier/plugins/babel";
import parserEstree from "prettier/plugins/estree";
import { useRef } from "react";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import MonacoJSXHighlighter from "monaco-jsx-highlighter";

interface ICodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<ICodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>(null);

  const onEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Minimal Babel setup for React JSX parsing:
    const babelParse = (code: string) =>
      parse(code, {
        sourceType: "module",
        plugins: ["jsx"], // Make sure JSX plugin is enabled
      });

    // Instantiate the highlighter
    const monacoJSXHighlighter = new MonacoJSXHighlighter(
      monaco,
      babelParse,
      traverse,
      editor
    );

    // Activate highlighting (debounceTime default: 100ms)
    monacoJSXHighlighter.highlightOnDidChangeModelContent(100);

    // Activate JSX commenting
    monacoJSXHighlighter.addJSXCommentCommand();
  };

  const handleEditorChange = (value: string | undefined) =>
    onChange(value ?? "");

  const onFormatClick = async () => {
    const unformatted = editorRef.current.getModel().getValue();

    const formatted = (
      await prettier.format(unformatted, {
        parser: "babel",
        plugins: [parserBabel, parserEstree],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
    ).replace(/\n$/, "");

    editorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        value={initialValue}
        onChange={handleEditorChange}
        onMount={onEditorMount}
        theme="vs-dark"
        language="javascript"
        height="100%"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
