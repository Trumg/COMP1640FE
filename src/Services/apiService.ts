import axios, { AxiosError } from "axios";

const BASE_URL = "http://localhost:7279/api";

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/Auth/Login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw (error as AxiosError).response?.data;
    } else {
      throw error;
    }
  }
};

export const signup = async (
  username: string,
  password: string,
  email: string
) => {
  try {
    const response = await axios.post(`${BASE_URL}/Auth/Register`, {
      username,
      password,
      email,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw (error as AxiosError).response?.data;
    } else {
      throw error;
    }
  }
};
