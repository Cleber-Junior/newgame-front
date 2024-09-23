import axios from "axios";

export const myApi = axios.create({
  baseURL: "http://localhost:8000/api",
  // clodURL: "https://newgame-da3be6e96e82.herokuapp.com/api",
});
