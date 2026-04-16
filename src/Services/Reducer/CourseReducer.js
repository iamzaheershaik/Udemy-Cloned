const initialState = {
  courses: [],
  cart: [],
  myLearning: [],
  course: null,
  isCreated: false,
  isUpdated: false,
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_COURSE":
      return {
        ...state,
        isCreated: true,
      };

    case "GET_ALL_COURSE":
      return {
        ...state,
        courses: action.payload,
        isCreated: false,
        isUpdated: false,
      };

    case "GET_COURSE":
      return {
        ...state,
        course: action.payload,
      };

    case "UPDATE_COURSE":
      return {
        ...state,
        course: null,
        isUpdated: true,
      };

    case "GET_CART":
      return {
        ...state,
        cart: action.payload,
      };

    case "GET_MY_LEARNING":
      return {
        ...state,
        myLearning: action.payload,
      };

    case "ADD_FORM":
      return {
        ...state,
        courses: [...state.courses, action.payload],
      };

    default:
      return state;
  }
};

export default courseReducer;
