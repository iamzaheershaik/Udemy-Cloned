import { combineReducers } from "redux";
import courseReducer from "./CourseReducer";
import teacherReducer from "./teacherReducer";

const rootReducer = combineReducers({
    course: courseReducer,
    teacher: teacherReducer,
});

export default rootReducer;