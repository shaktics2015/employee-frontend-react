import { combineReducers } from "redux";
import department from "./departmentReducer";
import employee from "./employeeReducer";

export default combineReducers({
  department,
  employee
 });
