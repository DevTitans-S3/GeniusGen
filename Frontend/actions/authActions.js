import { setLoading, setUser, logout, setGeneratedText,setQuiz } from '../features/userSlice';
import { axiosInstance } from '../utils/index';
import {toast} from 'react-toastify'

export const register = (userData, navigate) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axiosInstance.post('/api/v1/auth/register', userData);
    dispatch(setUser(response.data.user));
    navigate('/signin');
    toast.success('Account created successfully!');
    } catch (error) {
    console.log(error.response.data.msg);
    toast.error(error.response.data.msg);
  } finally {
    dispatch(setLoading(false)); // Set loading to false after operation completes
  }
};

export const login = (userData, navigate) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axiosInstance.post('/api/v1/auth/login', userData);
    dispatch(setUser(response.data.user));
    navigate('/product');
    toast.success('User logged in successfully!');
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.msg);
  } finally {
    dispatch(setLoading(false)); // Set loading to false after operation completes
  }
};

export const logoutUser = (navigate) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await axiosInstance.get('/api/v1/auth/logout');
    // navigate('/'); 
    dispatch(logout());
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setLoading(false)); // Set loading to false after operation completes
  }
};

export const generateText = (textInput) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axiosInstance.post(`/api/v1/search?Topic=${textInput}`);
    if(response.data.text === 'null'){
      dispatch(setGeneratedText(''))
      toast.error('Please Search related to Programming or Computer Science');
    }else{
      dispatch(setGeneratedText(response.data.text));
    }
    // console.log(response.data.text);
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setLoading(false)); 
  }
};


export const generateQuiz = (histId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axiosInstance.get(`/api/v1/quiz/${histId}`);
    // console.log(response.data);
    dispatch(setQuiz(response.data));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setLoading(false)); 
  }
};


export const regenerateText = (histId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axiosInstance.post(`/api/v1/history/regenerate/${histId}`);
    dispatch(setGeneratedText(response.data.text));
    // console.log(response.data.text);
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setLoading(false)); 
  }
};

