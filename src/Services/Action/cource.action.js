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


export const getAllCourseAsync = () => {
  return async (dispatch) => {
    try {
      const coursesCol = collection(db, "courses");
      const snapshot = await getDocs(coursesCol);
      const coursesArray = snapshotToArray(snapshot);
      console.log("Fetched courses:", coursesArray);
      dispatch(getAllCourse(coursesArray));
    } catch (error) {
      console.log("Error fetching courses:", error);
    }
  };
};


export const getCourseAsync = (id) => {
  return async (dispatch) => {
    try {
      const courseDoc = doc(db, "courses", id);
      const snapshot = await getDoc(courseDoc);
      if (snapshot.exists()) {
        dispatch(getCourse({ ...snapshot.data(), id: snapshot.id }));
      }
    } catch (error) {
      console.log("Error fetching course:", error);
    }
  };
};

// ADD NEW COURSE
export const addCourseAsync = (data) => {
  return async (dispatch) => {
    try {
      const coursesCol = collection(db, "courses");
      const docRef = await addDoc(coursesCol, data);
      console.log("Course added with ID:", docRef.id);
      // Update the document to include its own ID as a field
      await setDoc(doc(db, "courses", docRef.id), { ...data, id: docRef.id });
      dispatch(addCourse());
      dispatch(getAllCourseAsync());
    } catch (error) {
      console.log("Error adding course:", error);
    }
  };
};

// UPDATE COURSE
export const updateCourseAsync = (data) => {
  return async (dispatch) => {
    try {
      const courseDoc = doc(db, "courses", data.id);
      await setDoc(courseDoc, data);
      console.log("Course updated:", data);
      dispatch(updateCourse(data));
      dispatch(getAllCourseAsync());
    } catch (error) {
      console.log("Error updating course:", error);
    }
  };
};

// DELETE COURSE
export const deleteCourseAsync = (id) => {
  return async (dispatch) => {
    try {
      const courseDoc = doc(db, "courses", id);
      await deleteDoc(courseDoc);
      console.log("Course deleted:", id);
      dispatch(getAllCourseAsync());
    } catch (error) {
      console.log("Error deleting course:", error);
    }
  };
};

/* ---------- CART ---------- */

// GET CART
export const getCartAsync = () => {
  return async (dispatch) => {
    try {
      const cartCol = collection(db, "cart");
      const snapshot = await getDocs(cartCol);
      const cartArray = snapshotToArray(snapshot);
      dispatch(getCart(cartArray));
    } catch (error) {
      console.log("Error fetching cart:", error);
    }
  };
};

// ADD TO CART
export const addToCartAsync = (course) => {
  return async (dispatch) => {
    try {
      const cartDoc = doc(db, "cart", course.id);
      await setDoc(cartDoc, course);
      dispatch(getCartAsync());
    } catch (error) {
      console.log("Error adding to cart:", error);
    }
  };
};

// REMOVE FROM CART
export const removeFromCartAsync = (id) => {
  return async (dispatch) => {
    try {
      const cartDoc = doc(db, "cart", id);
      await deleteDoc(cartDoc);
      dispatch(getCartAsync());
    } catch (error) {
      console.log("Error removing from cart:", error);
    }
  };
};



// GET MY LEARNING
export const getMyLearningAsync = () => {
  return async (dispatch) => {
    try {
      const myLearningCol = collection(db, "myLearning");
      const snapshot = await getDocs(myLearningCol);
      const learningArray = snapshotToArray(snapshot);
      dispatch(getMyLearning(learningArray));
    } catch (error) {
      console.log("Error fetching My Learning:", error);
    }
  };
};


export const purchaseCoursesAsync = (cartItems) => {
  return async (dispatch) => {
    try {
      for (const item of cartItems) {
        const learningDoc = doc(db, "myLearning", item.id);
        await setDoc(learningDoc, item);

        const cartDoc = doc(db, "cart", item.id);
        await deleteDoc(cartDoc);
      }
      dispatch(getCartAsync());
      dispatch(getMyLearningAsync());
    } catch (error) {
      console.log("Error purchasing courses:", error);
    }
  };
};