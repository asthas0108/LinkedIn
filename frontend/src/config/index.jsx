import axios from "axios";

export const BASE_URL = "https://connectify-a2ya.onrender.com";

export const clientServer = axios.create({
    baseURL: BASE_URL,
});