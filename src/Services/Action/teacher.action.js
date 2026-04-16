import db from "../firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

/* ============================================= */
/*           SYNC ACTION CREATORS                */
/* ============================================= */

export const addTeacher = () => {
  return { type: "ADD_TEACHER" };
};

export const getAllTeacher = (data) => {
  return { type: "GET_ALL_TEACHER", payload: data };
};

export const getTeacher = (data) => {
  return { type: "GET_TEACHER", payload: data };
};

export const updateTeacher = (teacher) => {
  return { type: "UPDATE_TEACHER", payload: teacher };
};

export const deleteTeacher = (id) => {
  return { type: "DELETE_TEACHER", payload: id };
};

/* ============================================= */
/*       ASYNC ACTION CREATORS (Firestore)       */
/* ============================================= */

// Helper: Convert Firestore QuerySnapshot to an array
const snapshotToArray = (snapshot) => {
  const arr = [];
  snapshot.forEach((docSnap) => {
    arr.push({ ...docSnap.data(), id: docSnap.id });
  });
  return arr;
};

// GET ALL TEACHERS
export const getAllTeacherAsync = () => {
  return async (dispatch) => {
    try {
      const teachersCol = collection(db, "teachers");
      const snapshot = await getDocs(teachersCol);
      const teachersArray = snapshotToArray(snapshot);
      dispatch(getAllTeacher(teachersArray));
    } catch (error) {
      console.log("Error fetching teachers:", error);
    }
  };
};

// GET SINGLE TEACHER
export const getTeacherAsync = (id) => {
  return async (dispatch) => {
    try {
      const teacherDoc = doc(db, "teachers", id);
      const snapshot = await getDoc(teacherDoc);
      if (snapshot.exists()) {
        dispatch(getTeacher({ ...snapshot.data(), id: snapshot.id }));
      }
    } catch (error) {
      console.log("Error fetching teacher:", error);
    }
  };
};

// ADD NEW TEACHER
export const addTeacherAsync = (data) => {
  return async (dispatch) => {
    try {
      const teachersCol = collection(db, "teachers");
      const docRef = await addDoc(teachersCol, data);
      await setDoc(doc(db, "teachers", docRef.id), { ...data, id: docRef.id });
      dispatch(addTeacher());
      dispatch(getAllTeacherAsync());
    } catch (error) {
      console.log("Error adding teacher:", error);
    }
  };
};

// DELETE TEACHER
export const deleteTeacherAsync = (id) => {
  return async (dispatch) => {
    try {
      const teacherDoc = doc(db, "teachers", id);
      await deleteDoc(teacherDoc);
      dispatch(getAllTeacherAsync());
    } catch (error) {
      console.log("Error deleting teacher:", error);
    }
  };
};

// UPDATE TEACHER
export const updateTeacherAsync = (data) => {
  return async (dispatch) => {
    try {
      const teacherDoc = doc(db, "teachers", data.id);
      await setDoc(teacherDoc, data);
      dispatch(updateTeacher(data));
      dispatch(getAllTeacherAsync());
    } catch (error) {
      console.log("Error updating teacher:", error);
    }
  };
};