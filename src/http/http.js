import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
const http = axios.create({
  baseURL: "https://ab.netweb.link",
  //baseURL: "http://localhost:8088",
});

http.interceptors.request.use(
  (config) => {
    nprogress.start();
    let user = window.sessionStorage.getItem("user");
    console.log(JSON.parse(user));
    if (user) {
      let token = JSON.parse(user).token;
      console.log(token);
      config.headers.token = token;
    }
    return config;
  },
  (err) => {
    console.log(err);
  }
);
http.interceptors.response.use(
  (response) => {
    nprogress.done();
    return response.data;
  },
  (err) => {
    console.log(err);
  }
);
export default http;
