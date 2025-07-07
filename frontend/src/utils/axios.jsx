import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.0.172:5000", // or your backend URL
  // You can add more defaults here
});

export default instance; 