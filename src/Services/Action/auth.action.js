import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

// Action Types
export const AUTH_LOADING = "AUTH_LOADING";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_ERROR = "AUTH_ERROR";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const AUTH_CLEAR_ERROR = "AUTH_CLEAR_ERROR";

// Helper to extract user data
const extractUser = (user) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName || "",
  photoURL: user.photoURL || "",
});

// Sign Up with Email & Password
export const signUpWithEmail = (name, email, password) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name });
    // Re-read user after profile update
    dispatch({ type: AUTH_SUCCESS, payload: extractUser(auth.currentUser) });
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error.message });
  }
};

// Login with Email & Password
export const loginWithEmail = (email, password) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    dispatch({ type: AUTH_SUCCESS, payload: extractUser(result.user) });
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error.message });
  }
};

// Google Sign In
export const signInWithGoogle = () => async (dispatch) => {
  // Do NOT dispatch AUTH_LOADING here — it causes App.jsx to show a
  // full-screen spinner, which unmounts the auth page and kills the popup.
  try {
    const result = await signInWithPopup(auth, googleProvider);
    dispatch({ type: AUTH_SUCCESS, payload: extractUser(result.user) });
  } catch (error) {
    // Ignore popup-closed-by-user errors (user just dismissed the popup)
    if (error.code === "auth/popup-closed-by-user" || error.code === "auth/cancelled-popup-request") {
      return;
    }
    dispatch({ type: AUTH_ERROR, payload: error.message });
  }
};

// Logout
export const logout = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch({ type: AUTH_LOGOUT });
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error.message });
  }
};

// Set user from onAuthStateChanged listener
export const setUser = (user) => ({
  type: AUTH_SUCCESS,
  payload: user ? extractUser(user) : null,
});

// Clear error
export const clearAuthError = () => ({
  type: AUTH_CLEAR_ERROR,
});
