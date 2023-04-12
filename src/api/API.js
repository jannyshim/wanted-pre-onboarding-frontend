import axios from "axios";

export const BASE_URL = "https://www.pre-onboarding-selection-task.shop";

export const axiosAuthInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});
