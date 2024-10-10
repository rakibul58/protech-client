"use server";
import axiosInstance from "@/src/libs/AxiosInstance";

export const getMonthlyActivity = async () => {
  try {
    // console.log({sort});
    const { data } = await axiosInstance.get("/activity-logs/monthly");
    //     console.log(data.data);
    return data.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getAllPayments = async (
  page = 1,
  limit = 5
) => {
  try {
    const url = `/activity-logs/payment?sort=-createdAt&page=${page}&limit=${limit}`;

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
