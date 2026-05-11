const initialState = {
  teachers: [],
  teacher: null,
  error: null,
};

const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_TEACHER":
      return { ...state, teachers: action.payload, error: null };

    case "GET_TEACHER":
      return { ...state, teacher: action.payload, error: null };

    case "ADD_TEACHER":
      return { ...state, error: null };

    case "UPDATE_TEACHER":
      return { ...state, teacher: action.payload, error: null };

    case "DELETE_TEACHER":
      return {
        ...state,
        teachers: state.teachers.filter((teacher) => teacher.id !== action.payload),
        teacher: state.teacher?.id === action.payload ? null : state.teacher,
        error: null,
      };

    case "TEACHER_ERROR":
      return { ...state, error: action.payload };

    case "TEACHER_CLEAR_ERROR":
      return { ...state, error: null };

    default:
      return state;
  }
};

export default teacherReducer; 
