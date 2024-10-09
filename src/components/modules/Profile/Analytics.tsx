"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { ChartData } from "chart.js";
import { useGetMyPosts } from "@/src/hooks/post.hook";
import AnalyticsSkeleton from "./AnalyticsSkeleton";

// Register the Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Dynamically import Bar and Pie components to avoid SSR issues
const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
  ssr: false,
});
const Pie = dynamic(() => import("react-chartjs-2").then((mod) => mod.Pie), {
  ssr: false,
});

const Analytics = () => {
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: [{ label: "", data: [], backgroundColor: "" }],
  });
  const [engagementData, setEngagementData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: [{ label: "", data: [], backgroundColor: [] }],
  });
  const [premiumData, setPremiumData] = useState<ChartData<"pie">>({
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }],
  });
  const { data: myPosts, isPending } = useGetMyPosts(1,"", "", "", 1000);

  useEffect(() => {
    if (myPosts?.result) {
      setData(myPosts.result);
    }
  }, [myPosts]);

  // console.log({myPosts});

  useEffect(() => {
    if (data.length > 0) {
      const categoryCounts = data.reduce((acc: any, post: any) => {
        post.categories.forEach((category: any) => {
          acc[category] = (acc[category] || 0) + 1;
        });
        return acc;
      }, {});

      const totalUpvotes = data.reduce(
        (acc: number, post: any) => acc + post.upvoteCount,
        0
      );
      const totalDownvotes = data.reduce(
        (acc: number, post: any) => acc + post.downvoteCount,
        0
      );

      const premiumCounts = data.reduce(
        (acc: any, post: any) => {
          acc[post.isPremium ? "Premium" : "Non-Premium"]++;
          return acc;
        },
        { Premium: 0, "Non-Premium": 0 }
      );

      setCategoryData({
        labels: Object.keys(categoryCounts),
        datasets: [
          {
            label: "Posts by Category",
            data: Object.values(categoryCounts),
            backgroundColor: "skyblue",
          },
        ],
      });

      setEngagementData({
        labels: ["Upvotes", "Downvotes"],
        datasets: [
          {
            label: "Engagement",
            data: [totalUpvotes, totalDownvotes],
            backgroundColor: ["green", "red"],
          },
        ],
      });

      setPremiumData({
        labels: Object.keys(premiumCounts),
        datasets: [
          {
            data: Object.values(premiumCounts),
            backgroundColor: ["orange", "lightblue"],
          },
        ],
      });
    }
  }, [data]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  if (isPending || data.length === 0) return <AnalyticsSkeleton />;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 w-full">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col sm:flex-row items-center sm:items-start flex-wrap gap-6">
        <div style={{ width: "100%", height: "300px" }}>
          <h3>Post Categories</h3>
          <Bar data={categoryData} options={chartOptions} />
        </div>
        <div style={{ width: "100%", height: "300px" }}>
          <h3>Engagement (Upvotes vs Downvotes)</h3>
          <Bar data={engagementData} options={chartOptions} />
        </div>
        <div style={{ width: "100%", height: "300px" }}>
          <h3>Premium vs Non-Premium Posts</h3>
          <Pie data={premiumData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
