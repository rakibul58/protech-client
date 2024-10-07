import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import {
  forgetPassword,
  getVerified,
  loginUser,
  registerUser,
  resetPassword,
} from "../services/AuthService";
import { toast } from "sonner";

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("User registration successful.");
    },
    onError: (error) => {
      toast.error("Register Failed. Email might already exists.");
    },
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      toast.success("User login successful.");
    },
    onError: (error) => {
      toast.error("Login Failed. Please Provide Valid Email and Password.");
    },
  });
};

export const useUserForgetPassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_FORGET_PASSWORD"],
    mutationFn: async (payload) => await forgetPassword(payload),
    onSuccess: () => {
      toast.success("Reset Password Link sent successfully.");
    },
    onError: (error) => {
      toast.error("Something went wrong.");
    },
  });
};

export const useUserResetPassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_RESET_PASSWORD"],
    mutationFn: async (payload) => await resetPassword(payload),
    onSuccess: () => {
      toast.success("Password reset successfully.");
    },
    onError: (error) => {
      toast.error("Something went wrong.");
    },
  });
};

export const useGetVerified = () => {
  return useMutation<any, Error>({
    mutationKey: ["USER_VERIFICATION"],
    mutationFn: async () => await getVerified(),
    onSuccess: ({ data }) => {
      window.location.href = data.payment_url;
      toast.success("Verification initiated successfully.");
    },
    onError: (error) => {
      toast.error("Something went wrong.");
    },
  });
};
