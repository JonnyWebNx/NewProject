import api from "../../util/AxiosInstance";
import { SignInFormData, SignUpFormData } from "../../interfaces";
import { ApiErrorHandler } from "../../utils/errorHandler";

export const signInUser = async (formData: SignInFormData) => {
  try {
    const response = await api.post("/auth/signIn", formData);

    // Get auth token and save it to local storage
    if (response.data.token) {
        const token = response.data.token;
        localStorage.setItem("token", token);
    }

    return response.data;
  } catch (error) {
    throw ApiErrorHandler.handle(error);
  }
};

export const signUpUser = async (formData: SignUpFormData) => {
  try {
    const response = await api.post("/auth/signUp", formData);

    return response.data;
  } catch (error) {
    throw ApiErrorHandler.handle(error);
  }
};
