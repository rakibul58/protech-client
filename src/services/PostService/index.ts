"use server";
import axiosInstance from "@/src/libs/AxiosInstance";

// Modified `getPosts` function to include pagination
export const getPosts = async (page = 1, limit = 5) => {
  try {
    const { data } = await axiosInstance.get(
      `/posts?sort=-createdAt&page=${page}&limit=${limit}`
    );

    return {
      result: data?.data?.result, // Posts
      totalPage: data?.data?.meta?.totalPage, // Total number of pages
      nextPage: page < data?.data?.meta?.totalPage ? page + 1 : undefined, // Calculate the next page
    };

  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
