// redux
import { createSlice, createSelector } from "@reduxjs/toolkit";

// type
import { actionType } from "../types/type";

type uiStateType = {
   createPostModal: { text?: string; photo?: string; needDiscard?: boolean; rows?: number };
};

// slice
const uiControllerSlice = createSlice({
   name: "uiController",
   initialState: { createPostModal: { text: "", photo: "", needDiscard: false, rows: 5 } } as uiStateType,
   reducers: {
      createPostModalWriteState: (state: uiStateType, action: actionType<uiStateType["createPostModal"]>) => {
         state.createPostModal.text = action.payload?.text;
         state.createPostModal.rows = action.payload?.rows;
         state.createPostModal.photo = action.payload?.photo;
         state.createPostModal.needDiscard = action.payload?.needDiscard;
      },
      createPostModalClearState: (state: uiStateType, action: actionType<undefined>) => {
         state.createPostModal = { text: "", photo: "", needDiscard: false, rows: 5 };
      },
   },
});

// commands
const createPostModalWriteStateCommand = (state: uiStateType["createPostModal"]) => (dispatch: any) => {
   return dispatch(uiControllerSlice.actions.createPostModalWriteState(state));
};
const createPostModalClearStateCommand = () => {
   return uiControllerSlice.actions.createPostModalClearState();
};

// selectors
const createPostModalReadStateSelector = createSelector(
   (state: any) => state.ui.controller,
   (controller: any) => controller.createPostModal
);

// exports
// type
export type { uiStateType };
// commands
export { createPostModalWriteStateCommand, createPostModalClearStateCommand };
// selector
export { createPostModalReadStateSelector };
// reducer
export default uiControllerSlice.reducer;
