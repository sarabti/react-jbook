import TextEditor from "./components/text-editor";
import { Provider } from "react-redux";
import { store } from "./state";
import CellList from "./components/cell-list";

function App() {
  return (
    <Provider store={store}>
      {/* <CodeCell /> */}
      <TextEditor />
    </Provider>
  );
}

export default App;
