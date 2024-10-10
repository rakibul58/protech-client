"use client";
import { Line, Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { useGetActivity } from "@/src/hooks/activity.hook";
import AnalyticsSkeleton from "./AnalyticsSkeleton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DateGroup {
  day: number;
  month: number;
  year: number;
}

interface ActivityLog {
  _id: DateGroup;
  count: number;
}

interface Post {
  _id: DateGroup;
  count: number;
}

interface Payment {
  _id: DateGroup;
  totalAmount: number;
  transactionCount: number;
}

const AdminAnalyticsCharts = () => {
  const { data = { activityLogs: [], posts: [], payments: [] }, isPending } = useGetActivity();
  
  const [activityData, setActivityData] = useState<any>({});
  const [postsData, setPostsData] = useState<any>({});
  const [paymentsData, setPaymentsData] = useState<any>({});

  useEffect(() => {
    const days = (data?.activityLogs || []).map(
      (log: ActivityLog) => `${log._id.day}-${log._id.month}-${log._id.year}`
    );

    setActivityData({
      labels: days,
      datasets: [
        {
          label: "Logins",
          data: (data?.activityLogs || []).map((log: ActivityLog) => log.count),
          borderColor: "blue",
          backgroundColor: "rgba(0, 123, 255, 0.3)",
          fill: true,
          tension: 0.4,
        },
      ],
    });

    setPostsData({
      labels: days,
      datasets: [
        {
          label: "Posts",
          data: (data?.posts || []).map((post: Post) => post.count),
          backgroundColor: "skyblue",
          borderColor: "blue",
          borderWidth: 1,
        },
      ],
    });

    setPaymentsData({
      labels: days,
      datasets: [
        {
          type: "bar" as const,
          label: "Transactions",
          data: (data?.payments || []).map((payment: Payment) => payment.transactionCount),
          backgroundColor: "orange",
        },
        {
          type: "line" as const,
          label: "Total Amount",
          data: (data?.payments || []).map((payment: Payment) => payment.totalAmount),
          borderColor: "green",
          backgroundColor: "rgba(0, 255, 0, 0.3)",
          fill: true,
          tension: 0.4,
        },
      ],
    });
  }, [data]);

  const chartOptions: ChartOptions<"line" | "bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  if (isPending) return <AnalyticsSkeleton />;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-gray-800 dark:text-gray-200">
        Analytics for Last 30 Days
      </h2>

      <div className="flex flex-col gap-8">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full">
          <h3 className="text-lg font-medium text-center mb-4 text-gray-700 dark:text-gray-300">
            Daily Activity Logs
          </h3>
          {activityData?.labels && <Line data={activityData} options={chartOptions} />}
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full">
          <h3 className="text-lg font-medium text-center mb-4 text-gray-700 dark:text-gray-300">
            Daily Posts
          </h3>
          {postsData?.labels && <Bar data={postsData} options={chartOptions} />}
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full">
          <h3 className="text-lg font-medium text-center mb-4 text-gray-700 dark:text-gray-300">
            Daily Payments
          </h3>
          {paymentsData?.labels && <Bar data={paymentsData} options={chartOptions} />}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsCharts;
