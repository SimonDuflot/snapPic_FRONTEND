import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    email: "",
    pics: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addEmailToStore: (state, action) => {
      state.value.email = action.payload;
    },
    addPhoto: (state, action) => {
      state.value.pics.push(action.payload);
    },
    removePhoto: (state, action) => {
      state.value.pics = state.value.pics.filter(
        (el) => el.pics !== action.payload
      );
    },
  },
});

export const { addEmailToStore, addPhoto, removePhoto } = userSlice.actions;
export default userSlice.reducer;
