const initialState = {
  teachers: [],
  teacher: {},
};

const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_TEACHER":
      return { ...state, teachers: action.payload };

    case "GET_TEACHER":
      return { ...state, teacher: action.payload };

    default:
      return state;
  }
};

export default teacherReducer; 