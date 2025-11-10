import type { Middleware } from "@reduxjs/toolkit";
import type { RootState } from "../reducers";
import { ActionType } from "../action-types";
import { saveCells } from "../action-creators";

export const persistMiddlware: Middleware<unknown, RootState> = (storeAPI) => {
  let timer: ReturnType<typeof setTimeout>;
  
  return (next) => (action) => {
    next(action);

    if (
      [
        ActionType.MOVE_CELL,
        ActionType.UPDATE_CELL,
        ActionType.INSERT_CELL_AFTER,
        ActionType.DELETE_CELL,
      ].includes((action as { type: ActionType }).type)
    ) {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        // ✅ correct way: dispatch thunk using storeAPI
        storeAPI.dispatch(saveCells() as any);
      }, 250);
    }
  };
};
