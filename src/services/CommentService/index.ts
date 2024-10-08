"use server";

import axiosInstance from "@/src/libs/AxiosInstance";

export const getComments = async (id: string, page = 1, limit = 5) => {
  try {
    // console.log({sort});
    console.log(id);
    const { data } = await axiosInstance.get(
      `/comments/post/${id}?sort=-createdAt&page=${page}`
    );

//     console.log({
//       result: data?.data?.result, // Posts
//       totalPage: data?.data?.meta?.totalPage, // Total number of pages
//       nextPage: page < data?.data?.meta?.totalPage ? page + 1 : undefined, // Calculate the next page
//     });

    return {
      result: data?.data?.result, // Posts
      totalPage: data?.data?.meta?.totalPage, // Total number of pages
      nextPage: page < data?.data?.meta?.totalPage ? page + 1 : undefined, // Calculate the next page
    };
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
