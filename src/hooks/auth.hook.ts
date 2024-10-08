import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import {
  followUser,
  forgetPassword,
  getRecommended,
  getVerified,
  loginUser,
  registerUser,
  resetPassword,
  unFollowUser,
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

export const useGetRecommended = () => {
  return useInfiniteQuery({
    queryKey: ["GET_RECOMMENDED"],
    queryFn: async ({ pageParam = 1 }) => await getRecommended(pageParam, 5),
    getNextPageParam: (lastPage) => lastPage.nextPage, // Determine if there's a next page
    initialPageParam: 1, // Set the initial page to 1
  });
};

export const useFollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { userId: string }>({
    mutationKey: ["USER_FOLLOW"],
    mutationFn: async ({ userId }) => await followUser({ userId }),
    onSuccess: () => {
      // window.location.href = data.payment_url;
      queryClient.invalidateQueries({ queryKey: ["GET_RECOMMENDED"] });
      // toast.success("Verification initiated successfully.");
    },
    onError: (error) => {
      toast.error("Something went wrong.");
    },
  });
};

export const useUnFollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { userId: string }>({
    mutationKey: ["USER_UNFOLLOW"],
    mutationFn: async ({ userId }) => await unFollowUser({ userId }),
    onSuccess: () => {
      // window.location.href = data.payment_url;
      queryClient.invalidateQueries({ queryKey: ["GET_RECOMMENDED"] });
      // toast.success("Verification initiated successfully.");
    },
    onError: (error) => {
      toast.error("Something went wrong.");
    },
  });
};
