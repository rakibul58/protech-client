import { useQuery } from "@tanstack/react-query";
import {
  getAllPayments,
  getMonthlyActivity,
} from "../services/ActivityService";

export const useGetActivity = () => {
  return useQuery({
    queryKey: ["GET_USER_ACTIVITY"],
    queryFn: async () => {
      const hookData = await getMonthlyActivity();
      // console.log({hookData});
      return hookData;
    },
  });
};

export const useGetAllPayments = (page = 1, limit = 5) => {
  return useQuery({
    queryKey: ["GET_ALL_PAYMENTS", page, limit],
    queryFn: async () => await getAllPayments(page, limit),
  });
};
