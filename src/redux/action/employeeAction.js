import { apiCall } from "../../modules/serverCall";

export const getEmployees = () => (dispatch) => {
  dispatch({
    type: GET_EMPLOYEE_BEGIN,
  });
  return apiCall({
    method: "GET",
    url: `/employee/all`,
  })
    .then((res) => {
      dispatch({
        type: GET_EMPLOYEE_SUCCESS,
        payload: res,
      });
      return res;
    })
    .catch((error) => {
      dispatch({
        type: GET_EMPLOYEE_FAIL,
        payload: { error },
      });
      return error;
    });
};
 

export const GET_EMPLOYEE_BEGIN = "GET_EMPLOYEE_BEGIN";
export const GET_EMPLOYEE_SUCCESS = "GET_EMPLOYEE_SUCCESS";
export const GET_EMPLOYEE_FAIL = "GET_EMPLOYEE_FAIL";
 
