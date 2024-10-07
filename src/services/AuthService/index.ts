"use server";

import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/libs/AxiosInstance";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/signup", userData);

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/signin", userData);

    // console.log({data});
    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    // console.log(error.response.data);
    throw new Error(error.response.data.message);
  }
};

export const logout = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    // console.log({decodedToken});

    return {
      _id: decodedToken._id,
      email: decodedToken.email,
      role: decodedToken.role,
      profileImg: decodedToken.profileImg,
      name: decodedToken.name,
      isVerified: decodedToken.isVerified,
    };
  }

  return decodedToken;
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;

    const res = await axiosInstance({
      url: "/auth/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        cookie: `refreshToken=${refreshToken}`,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error("Failed to get new access token");
  }
};

export const forgetPassword = async (payload: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/forget-password", payload);
    // console.log(payload);
    // console.log({data});
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const resetPassword = async (payload: FieldValues) => {
  try {
    const { data } = await axios.post(
      `${envConfig.baseApi}/auth/reset-password`,
      payload.data,
      {
        headers: {
          Authorization: `${payload.token}`, // Authorization header with Bearer token
        },
      }
    );

    // console.log(payload);
    // console.log({data});
    return data;
  } catch (error: any) {
    // console.log(error.response);
    throw new Error(error);
  }
};

export const getVerified = async () => {
  try {
    const { data } = await axiosInstance.post("/auth/initiate-payment");
    // console.log(payload);
    // console.log({data});
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
