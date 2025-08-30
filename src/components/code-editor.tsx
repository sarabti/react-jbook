import MonacoEditor from "@monaco-editor/react";

interface ICodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}
const CodeEditor: React.FC<ICodeEditorProps> = ({ initialValue, onChange }) => {
  const handleEditorChange = (value: string | undefined) =>
    onChange(value ?? "");

  return (
    <MonacoEditor
      value={initialValue}
      onChange={handleEditorChange}
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
  );
};

export default CodeEditor;
