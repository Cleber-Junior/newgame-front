import axios from "axios";

export const myApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
// baseURL: "https://newgame-2-2b11a14685c1.herokuapp.com/api",
});
