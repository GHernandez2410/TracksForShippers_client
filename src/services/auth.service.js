import axios from "axios";

const API_URL = "http://localhost:8000/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "register/", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login/", {
      username,
      password,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response));
      }

      return response;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
