import {
    SAVE_EMPLOYEE_BEGIN,
    SAVE_EMPLOYEE_SUCCESS,
    SAVE_EMPLOYEE_FAIL,
  } from "../action/employeeAction";
  
  const initialState = {
    loading: false,
    data: null,
    error: null,
  }; 
  export default (state = initialState, action) => {
    switch (action.type) {
      case SAVE_EMPLOYEE_BEGIN:
        return {
          loading: true,
          error: null,
        };
      case SAVE_EMPLOYEE_SUCCESS:
        return {
          loading: false,
          data: action.payload.data,
        };
      case SAVE_EMPLOYEE_FAIL:
        return {
          loading: false,
          error: action.payload.error.response.data,
        };
      default:
        return state;
    }
  };
  