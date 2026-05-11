import db from "../firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";

export const COURSE_ERROR = "COURSE_ERROR";
export const COURSE_CLEAR_ERROR = "COURSE_CLEAR_ERROR";

export const addCourse = () => {
  return { type: "ADD_COURSE" };
};

export const getAllCourse = (data) => {
  return { type: "GET_ALL_COURSE", payload: data };
};

export const getCourse = (data) => {
  return { type: "GET_COURSE", payload: data };
};

export const updateCourse = (course) => {
  return { type: "UPDATE_COURSE", payload: course };
};

export const deleteCourse = (id) => {
  return { type: "DELETE_COURSE", payload: id };
};

export const getCart = (data) => {
  return { type: "GET_CART", payload: data };
};

export const getMyLearning = (data) => {
  return { type: "GET_MY_LEARNING", payload: data };
};

export const addForm = (course) => {
  return { type: "ADD_FORM", payload: course };
};

export const setCourseError = (error) => {
  return { type: COURSE_ERROR, payload: error };
};

export const clearCourseError = () => {
  return { type: COURSE_CLEAR_ERROR };
};

/* ============================================= */
/*      ASYNC ACTION CREATORS  (Firestore)       */
/* ============================================= */

// Helper: Convert Firestore QuerySnapshot to an array
const snapshotToArray = (snapshot) => {
  const arr = [];
  snapshot.forEach((docSnap) => {
    arr.push({ ...docSnap.data(), id: docSnap.id });
  });
  return arr;
};

const getUserId = (getState) => getState().auth?.user?.uid;

const getUserCollection = (uid, collectionName) => {
  return collection(db, "users", uid, collectionName);
};

const getUserDoc = (uid, collectionName, id) => {
  return doc(db, "users", uid, collectionName, String(id));
};


export const getAllCourseAsync = () => {
  return async (dispatch) => {
    try {
      const coursesCol = collection(db, "courses");
      const snapshot = await getDocs(coursesCol);
      const coursesArray = snapshotToArray(snapshot);
      dispatch(getAllCourse(coursesArray));
    } catch (error) {
      dispatch(setCourseError(error.message));
    }
  };
};


export const getCourseAsync = (id) => {
  return async (dispatch) => {
    try {
      const courseDoc = doc(db, "courses", id);
      const snapshot = await getDoc(courseDoc);
      if (snapshot.exists()) {
        const course = { ...snapshot.data(), id: snapshot.id };
        dispatch(getCourse(course));
        return course;
      } else {
        dispatch(getCourse(null));
        return null;
      }
    } catch (error) {
      dispatch(setCourseError(error.message));
    }
  };
};

// ADD NEW COURSE
export const addCourseAsync = (data) => {
  return async (dispatch) => {
    try {
      const coursesCol = collection(db, "courses");
      const docRef = await addDoc(coursesCol, data);
      await setDoc(doc(db, "courses", docRef.id), { ...data, id: docRef.id });
      dispatch(addCourse());
      dispatch(getAllCourseAsync());
      return docRef.id;
    } catch (error) {
      dispatch(setCourseError(error.message));
      throw error;
    }
  };
};

// UPDATE COURSE
export const updateCourseAsync = (data) => {
  return async (dispatch) => {
    try {
      const courseDoc = doc(db, "courses", data.id);
      await setDoc(courseDoc, data);
      dispatch(updateCourse(data));
      dispatch(getAllCourseAsync());
    } catch (error) {
      dispatch(setCourseError(error.message));
      throw error;
    }
  };
};

// DELETE COURSE
export const deleteCourseAsync = (id) => {
  return async (dispatch) => {
    try {
      const courseDoc = doc(db, "courses", id);
      await deleteDoc(courseDoc);
      dispatch(getAllCourseAsync());
    } catch (error) {
      dispatch(setCourseError(error.message));
      throw error;
    }
  };
};

/* ---------- CART ---------- */

// GET CART
export const getCartAsync = () => {
  return async (dispatch, getState) => {
    try {
      const uid = getUserId(getState);
      if (!uid) {
        dispatch(getCart([]));
        return;
      }
      const cartCol = getUserCollection(uid, "cart");
      const snapshot = await getDocs(cartCol);
      const cartArray = snapshotToArray(snapshot);
      dispatch(getCart(cartArray));
    } catch (error) {
      dispatch(setCourseError(error.message));
    }
  };
};

// ADD TO CART
export const addToCartAsync = (course) => {
  return async (dispatch, getState) => {
    try {
      const uid = getUserId(getState);
      if (!uid) throw new Error("Please log in to add courses to your cart.");
      const cartDoc = getUserDoc(uid, "cart", course.id);
      await setDoc(cartDoc, course);
      dispatch(getCartAsync());
    } catch (error) {
      dispatch(setCourseError(error.message));
      throw error;
    }
  };
};

// REMOVE FROM CART
export const removeFromCartAsync = (id) => {
  return async (dispatch, getState) => {
    try {
      const uid = getUserId(getState);
      if (!uid) throw new Error("Please log in to update your cart.");
      const cartDoc = getUserDoc(uid, "cart", id);
      await deleteDoc(cartDoc);
      dispatch(getCartAsync());
    } catch (error) {
      dispatch(setCourseError(error.message));
      throw error;
    }
  };
};



// GET MY LEARNING
export const getMyLearningAsync = () => {
  return async (dispatch, getState) => {
    try {
      const uid = getUserId(getState);
      if (!uid) {
        dispatch(getMyLearning([]));
        return;
      }
      const myLearningCol = getUserCollection(uid, "myLearning");
      const snapshot = await getDocs(myLearningCol);
      const learningArray = snapshotToArray(snapshot);
      dispatch(getMyLearning(learningArray));
    } catch (error) {
      dispatch(setCourseError(error.message));
    }
  };
};


export const purchaseCoursesAsync = (cartItems) => {
  return async (dispatch, getState) => {
    try {
      const uid = getUserId(getState);
      if (!uid) throw new Error("Please log in to purchase courses.");
      const batch = writeBatch(db);
      for (const item of cartItems) {
        const learningDoc = getUserDoc(uid, "myLearning", item.id);
        const cartDoc = getUserDoc(uid, "cart", item.id);
        batch.set(learningDoc, item);
        batch.delete(cartDoc);
      }
      await batch.commit();
      dispatch(getCartAsync());
      dispatch(getMyLearningAsync());
    } catch (error) {
      dispatch(setCourseError(error.message));
      throw error;
    }
  };
};
