import { apiCall } from "../../modules/serverCall";

export const getDepartments = () => (dispatch) => {
  dispatch({
    type: GET_DEPARTMENT_BEGIN,
  });
  return apiCall({
    method: "GET",
    url: `/department/all`,
  })
    .then((res) => {
      dispatch({
        type: GET_DEPARTMENT_SUCCESS,
        payload: res,
      });
      return res;
    })
    .catch((error) => {
      dispatch({
        type: GET_DEPARTMENT_FAIL,
        payload: { error },
      });
      return error;
    });
};
 

export const GET_DEPARTMENT_BEGIN = "GET_DEPARTMENT_BEGIN";
export const GET_DEPARTMENT_SUCCESS = "GET_DEPARTMENT_SUCCESS";
export const GET_DEPARTMENT_FAIL = "GET_DEPARTMENT_FAIL";
 
