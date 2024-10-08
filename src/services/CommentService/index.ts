"use server";
import axiosInstance from "@/src/libs/AxiosInstance";

export const getComments = async (id: string, page = 1, limit = 5) => {
  try {
    // console.log({sort});
    //     console.log(id);
    const { data } = await axiosInstance.get(
      `/comments/post/${id}?sort=-createdAt&page=${page}`
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

export const createComment = async (payload: {
  parent?: string | null;
  post: string;
  content: string;
}) => {
  try {
    const { data } = await axiosInstance.post(`/comments`, payload);

    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const updateComment = async (
  id: string,
  payload: { content: string }
) => {
  try {
    const { data } = await axiosInstance.put(`/comments/${id}`, payload);

    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const deleteComment = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/comments/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
