"use server"
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
