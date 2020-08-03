import { combineReducers } from "redux";
import department from "./departmentReducer";
import employee from "./employeeReducer";
import saveEmployee from "./saveEmployeeReducer";

export default combineReducers({
  department,
  employee,
  saveEmployee
 });
