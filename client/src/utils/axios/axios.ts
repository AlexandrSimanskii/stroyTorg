import axios from "axios";

const instance = axios.create({
  baseURL: "http://185.185.70.117:3004",
});
export default instance;