import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoading: false,
  generatedText: '',
  quiz: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setGeneratedText: (state, action) => {
      state.generatedText = action.payload;
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    }
  } 
}); 

export const { setUser, setLoading, logout, setGeneratedText,setQuiz } = userSlice.actions;
export default userSlice.reducer;
