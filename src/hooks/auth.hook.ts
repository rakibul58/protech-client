import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import {
  createAccount,
  followUser,
  forgetPassword,
  getAllUsers,
  getFollowers,
  getFollowing,
  getRecommended,
  getUserProfile,
  getVerified,
  loginUser,
  registerUser,
  resetPassword,
  unFollowUser,
  updateAccount,
  updateUserProfile,
} from "../services/AuthService";
import { toast } from "sonner";
import { IUser } from "../types";

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

export const useGetFollowers = (page = 1, limit = 5) => {
  return useQuery({
    queryKey: ["GET_FOLLOWER", page, limit],
    queryFn: async () => await getFollowers(page, limit),
  });
};

export const useGetFollowing = (page = 1, limit = 5) => {
  return useQuery({
    queryKey: ["GET_FOLLOWING", page, limit],
    queryFn: async () => await getFollowing(page, limit),
  });
};

export const useFollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { userId: string }>({
    mutationKey: ["USER_FOLLOW"],
    mutationFn: async ({ userId }) => await followUser({ userId }),
    onSuccess: () => {
      // window.location.href = data.payment_url;
      queryClient.invalidateQueries({
        queryKey: ["GET_RECOMMENDED"],
      });
      queryClient.invalidateQueries({
        queryKey: ["GET_FOLLOWING"],
      });
      queryClient.invalidateQueries({
        queryKey: ["GET_FOLLOWER"],
      });
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
      queryClient.invalidateQueries({
        queryKey: ["GET_RECOMMENDED"],
      });
      queryClient.invalidateQueries({
        queryKey: ["GET_FOLLOWING"],
      });
      queryClient.invalidateQueries({
        queryKey: ["GET_FOLLOWER"],
      });
      // toast.success("Verification initiated successfully.");
    },
    onError: (error) => {
      toast.error("Something went wrong.");
    },
  });
};

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["GET_USER_PROFILE"],
    queryFn: async () => {
      const hookData = await getUserProfile();
      // console.log({hookData});
      return hookData;
    },
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    Error,
    { name?: string; phone?: string; preferences?: string; profileImg?: string }
  >({
    mutationKey: ["UPDATE_PROFILE"],
    mutationFn: async (payload) => await updateUserProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_USER_PROFILE"] });
      toast.success("Profile updated successfully.");
    },
    onError: (error) => {
      toast.error("Something went wrong.");
    },
  });
};

export const useGetAllUsers = (page = 1, limit = 5) => {
  return useQuery({
    queryKey: ["GET_ALL_USERS", page, limit],
    queryFn: async () => await getAllUsers(page, limit),
  });
};

export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, Partial<IUser>>({
    mutationKey: ["CREATE_ACCOUNT"],
    mutationFn: async (payload) => await createAccount(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_USERS"] });
      toast.success("User Created successfully.");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to add user!");
    },
  });
};

export const useUpdateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { id: string; payload: Partial<IUser> }>({
    mutationKey: ["UPDATE_ACCOUNT"],
    mutationFn: async ({ id, payload }) => await updateAccount(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_USERS"] });
      toast.success("Account updated successfully.");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to update user!");
    },
  });
};
