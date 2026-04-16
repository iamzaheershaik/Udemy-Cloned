import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Services/firebase";
import { setUser } from "./Services/Action/auth.action";
import { AUTH_LOADING } from "./Services/Action/auth.action";

import "./App.css";

import HeaderAfterLogin from "./components/header/jsx/HeaderAfterLogin";
import AppRoutes from "./AppRoutes";

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch({ type: AUTH_LOADING });
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      dispatch(setUser(firebaseUser));
    });
    return () => unsubscribe();
  }, [dispatch]);

  // Show a loading spinner while Firebase checks auth state
  if (loading) {
    return (
      <div className="app-loading">
        <div className="app-loading-spinner" />
      </div>
    );
  }

  return (
    <div className="App">
      {user && <HeaderAfterLogin />}
      <AppRoutes />
    </div>
  );
}

export default App;