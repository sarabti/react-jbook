import { Provider } from "react-redux";
import { store } from "./state";
import CellList from "./components/cell-list";
import CodeCell from "./components/code-cell";

function App() {
  return (
    <Provider store={store}>
      <div>
        <CodeCell cell={{ id: "1", type: "code", content: "" }} />
        <CellList />
      </div>
    </Provider>
  );
}

export default App;
