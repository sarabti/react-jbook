import TextEditor from "./components/text-editor";
import { Provider } from "react-redux";
import { store } from "./state";

function App() {
  return (
    <Provider store={store}>
      {/* <CodeCell /> */}
      <TextEditor />
    </Provider>
  );
}

export default App;
