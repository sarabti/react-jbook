import type { CellsState } from "../reducers";
import { useTypedSelector } from "./use-typed-selector";

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells as CellsState;
    const orderedCells = order.map((id: string) => data[id]);

    const showFunc = `
      import _React from 'react';
      import _ReactDOM from 'react-dom/client';
      var show = (value) => {
        const container = document.querySelector('#root');
        const root = _ReactDOM.createRoot(container);
        if (typeof value === 'object') {
          if (value.$$typeof && value.props) {
            root.render(value);
          } else {
            container.innerHTML = JSON.stringify(value, null, 2);
          }
        } else {
          container.innerHTML = value;
        }
      };
    `;
    const showFuncNoop = "var show = () => {}";
    const cumulativeCode = [];
    for (const c of orderedCells) {
      if (c.type === "code") {
        if (c.id === cellId) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNoop);
        }
        cumulativeCode.push(c.content);
      }
      if (c.id === cellId) {
        break;
      }
    }
    return cumulativeCode;
  }).join("\n");
};
