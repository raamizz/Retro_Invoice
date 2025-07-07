import axios from "axios";

const token =localStorage.getItem("refreshToken")
const instance = axios.create({
  baseURL: "http://192.168.0.172:5000", // or your backend URL
  
});

export default instance;  