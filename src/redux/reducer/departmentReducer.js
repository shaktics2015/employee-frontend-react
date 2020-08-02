import {
  GET_DEPARTMENT_BEGIN,
  GET_DEPARTMENT_SUCCESS,
  GET_DEPARTMENT_FAIL,
} from "../action/departmentAction";

const initialState = {
  loading: false,
  data: null,
  error: null,
}; 
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DEPARTMENT_BEGIN:
      return {
        loading: true,
        error: null,
      };
    case GET_DEPARTMENT_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
      };
    case GET_DEPARTMENT_FAIL:
      return {
        loading: false,
        error: action.payload.error.response.data,
      };
    default:
      return state;
  }
};
