import axios from "axios";

export const myApi = axios.create({
  // baseURL: "http://127.0.0.1:8000/api",
  baseURL: "https://newgame-da3be6e96e82.herokuapp.com/api",
});
