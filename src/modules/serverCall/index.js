import axios from "axios";

const JSON_SERVER_URL = "http://localhost:8080/api/";

export const apiCall = (config) => {

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      if (!error.response) {
        error.response = {
          data: "network error",
          status: 500,
        };
      }
      return Promise.reject(error);
    }
  );
  config.baseURL = JSON_SERVER_URL;
  return axios(config);
};
