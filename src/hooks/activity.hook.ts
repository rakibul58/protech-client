import { useQuery } from "@tanstack/react-query";
import { getMonthlyActivity } from "../services/ActivityService";

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
