"use server";
import axiosInstance from "@/src/libs/AxiosInstance";

// Modified `getPosts` function to include pagination
export const getPosts = async (
  page = 1,
  limit = 5,
  searchTerm = "",
  category = "",
  sort = "-createdAt"
) => {
  try {
    if (!sort) {
      sort = "-createdAt";
    }
    let url = `/posts?sort=${sort}&page=${page}&limit=${limit}&searchTerm=${searchTerm}`;
    if (category) {
      url = `/posts?sort=${sort}&page=${page}&limit=${limit}&searchTerm=${searchTerm}&categories=${category}`;
    }

    // console.log({sort});
    const { data } = await axiosInstance.get(url);

    return {
      result: data?.data?.result, // Posts
      totalPage: data?.data?.meta?.totalPage, // Total number of pages
      nextPage: page < data?.data?.meta?.totalPage ? page + 1 : undefined, // Calculate the next page
    };
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const createPosts = async (payload: {
  content: string;
  categories: string[];
  isPremium: boolean;
}) => {
  try {
    // Ensure new post initializes downvotes
    const newPayload = {
      ...payload,
      upvotes: [],
      downvotes: [],
      upvoteCount: 0,
      downvoteCount: 0,
    };
    const { data } = await axiosInstance.post(`/posts`, newPayload);
    return data;
  } catch (error: any) {
    console.log({ error });
    throw new Error(error.response.data.message);
  }
};

export const upVotePost = async ({ postId }: { postId: string }) => {
  try {
    // console.log(postId);
    const { data } = await axiosInstance.post(`/posts/${postId}/upvote`);
    return data;
  } catch (error: any) {
    console.log({ error });
    throw new Error(error.response.data.message);
  }
};

export const downVotePost = async ({ postId }: { postId: string }) => {
  try {
    // console.log(postId);
    const { data } = await axiosInstance.post(`/posts/${postId}/downvote`);
    return data;
  } catch (error: any) {
    console.log({ error });
    throw new Error(error.response.data.message);
  }
};

export const getPostById = async (id: string) => {
  try {
    // console.log({sort});
    const { data } = await axiosInstance.get(`/posts/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
