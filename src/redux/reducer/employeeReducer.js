import {
    GET_EMPLOYEE_BEGIN,
    GET_EMPLOYEE_SUCCESS,
    GET_EMPLOYEE_FAIL,
  } from "../action/employeeAction";
  
  const initialState = {
    loading: false,
    data: null,
    error: null,
  }; 
  export default (state = initialState, action) => {
    switch (action.type) {
      case GET_EMPLOYEE_BEGIN:
        return {
          loading: true,
          error: null,
        };
      case GET_EMPLOYEE_SUCCESS:
        return {
          loading: false,
          data: action.payload.data,
        };
      case GET_EMPLOYEE_FAIL:
        return {
          loading: false,
          error: action.payload.error.response.data,
        };
      default:
        return state;
    }
  };
  