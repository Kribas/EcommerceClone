import instance from "../api/axios";
import { SignInUserType, SignUpUserType } from "../types/AuthUserTypes";

export const signUpUserFn = async (user: SignUpUserType) => {
  const response = await instance.post("/register", user);
  return response.data;
};

export const signInUserFn = async (user: SignInUserType) => {
  const response = await instance.post("/login", user);
  return response.data;
};
