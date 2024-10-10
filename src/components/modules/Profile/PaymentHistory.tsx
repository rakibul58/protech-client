"use client";

import { useState } from "react";
import AnalyticsSkeleton from "./AnalyticsSkeleton";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Pagination } from "@nextui-org/pagination";
import { useGetAllPayments } from "@/src/hooks/activity.hook";
import { IPayment } from "@/src/types";

const PaymentHistory: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 5;

  // Assuming useGetPayments fetches payment data
  const { data: paymentsData, isPending } = useGetAllPayments(
    currentPage,
    limit
  );

  if (isPending) return <AnalyticsSkeleton />;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 w-full">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-center">Payment History</h2>

        <Table aria-label="Payment History Table" className="w-full">
          <TableHeader>
            <TableColumn>User</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>Amount</TableColumn>
            <TableColumn>Transaction ID</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Date</TableColumn>
          </TableHeader>
          <TableBody>
            {paymentsData?.result.map((payment: IPayment) => (
              <TableRow key={payment._id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img
                      src={payment.user.profileImg}
                      alt={payment.user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{payment.user.name}</span>
                  </div>
                </TableCell>
                <TableCell>{payment.user.email}</TableCell>
                <TableCell>${payment.amount}</TableCell>
                <TableCell>{payment.transactionId}</TableCell>
                <TableCell>{payment.status}</TableCell>
                <TableCell>
                  {new Date(payment.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <Pagination
          showControls
          total={paymentsData?.totalPage || 1}
          boundaries={1}
          page={currentPage}
          onChange={(page: number) => setCurrentPage(page)}
          className="w-fit self-center"
        />
      </div>
    </div>
  );
};

export default PaymentHistory;
