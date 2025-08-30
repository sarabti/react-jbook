import "./code-editor.css";
import MonacoEditor, { type OnMount } from "@monaco-editor/react";
import prettier from 'prettier';
import parserBabel from "prettier/plugins/babel";
import parserEstree from "prettier/plugins/estree";
import { useRef } from "react";

interface ICodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}
const CodeEditor: React.FC<ICodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>(null);

  const setEditorRef: OnMount = (editor) => editorRef.current = editor

  const handleEditorChange = (value: string | undefined) =>
    onChange(value ?? "");

  const onFormatClick = async () => {
    const unformatted = editorRef.current.getModel().getValue();

    const formatted = (await prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parserBabel, parserEstree],
        useTabs: false,
        semi: true,
        singleQuote: true,
      }))
      .replace(/\n$/, '');

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
        onMount={setEditorRef}
        theme="vs-dark"
        language="javascript"
        height="500px"
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
