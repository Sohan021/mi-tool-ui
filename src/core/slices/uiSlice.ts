import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserState = {
  sideNav: boolean;
};

function GetInitialUiState(): UserState {
  return {
    sideNav: false,
  };
}

const uiSlice = createSlice({
  name: "userState",
  initialState: GetInitialUiState(),
  reducers: {
    setSideNavStatus: (state, action: PayloadAction<boolean>) => {
      state.sideNav = action.payload;
    },
  },
});

export const ReducerUi = uiSlice.reducer;
export const ActionsUi = uiSlice.actions;
