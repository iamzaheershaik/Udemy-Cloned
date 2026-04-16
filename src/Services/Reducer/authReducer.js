import {
  AUTH_LOADING,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_LOGOUT,
  AUTH_CLEAR_ERROR,
} from "../Action/auth.action";

const initialState = {
  user: null,
  loading: true, // starts true so we wait for onAuthStateChanged
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return { ...state, loading: true, error: null };

    case AUTH_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: null };

    case AUTH_ERROR:
      return { ...state, loading: false, error: action.payload };

    case AUTH_LOGOUT:
      return { ...state, user: null, loading: false, error: null };

    case AUTH_CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

export default authReducer;
