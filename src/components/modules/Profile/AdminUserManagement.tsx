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
import { IUser } from "@/src/types";
import {
  useCreateAccount,
  useGetAllUsers,
  useUpdateAccount,
} from "@/src/hooks/auth.hook";
import EditUserModal from "../../UI/EditUserModal";
import CreateUserModal from "../../UI/CreateUserModal";

const AdminUserManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [editingUser, setEditingUser] = useState<Partial<IUser> | null>(null);
  const [isCreatingUser, setIsCreatingUser] = useState<boolean>(false);
  const limit = 5;
  const { mutate: createUser, isPending: createPending } = useCreateAccount();
  const { mutate: updateUser, isPending: updatePending } = useUpdateAccount();

  const { data: usersData, isPending } = useGetAllUsers(currentPage, limit);

  // Ensure usersData has a fallback structure to avoid errors
  const users = usersData?.result || [];
  const totalPage = usersData?.totalPage || 1;

  if (isPending || createPending || updatePending) return <AnalyticsSkeleton />;

  const handleBlockToggle = (userId: string, isBlocked: boolean) => {
    updateUser({ id: userId, payload: { isBlocked: !isBlocked } });
    // Toggle block status logic here
  };

  const handleDeleteUser = (userId: string) => {
    updateUser({ id: userId, payload: { isDeleted: true } });
    // Delete user logic here
  };

  const handleEditUser = (user: Partial<IUser>) => {
    setEditingUser(user);
  };

  const handleSaveUser = (id: string, updatedUser: Partial<IUser>) => {
    // Update user logic here
    updateUser({ id, payload: updatedUser });
    setEditingUser(null);
  };

  const handleCreateUser = (newUser: Partial<IUser>) => {
    // Create user logic here
    createUser(newUser);
    setIsCreatingUser(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 w-full">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-semibold text-center">
            User Management
          </h2>

          <button
            onClick={() => setIsCreatingUser(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded-md w-fit self-end"
          >
            Create New User
          </button>
        </div>

        <Table aria-label="User Management Table" className="w-full">
          <TableHeader>
            <TableColumn>Profile</TableColumn>
            <TableColumn>Name</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>Role</TableColumn>
            <TableColumn>Verified</TableColumn>
            <TableColumn>Blocked</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {users.map(
              (user: IUser) =>
                (
                  <TableRow key={user._id}>
                    <TableCell>
                      <img
                        src={user.profileImg}
                        alt={user.name}
                        className="size-8 rounded"
                      />
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.isVerified ? "Yes" : "No"}</TableCell>
                    <TableCell>{user.isBlocked ? "Yes" : "No"}</TableCell>
                    <TableCell className="flex gap-2 mt-1">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleBlockToggle(user._id, user.isBlocked)
                        }
                        className="text-yellow-500 hover:text-yellow-700"
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>

        <Pagination
          showControls
          total={totalPage}
          page={currentPage}
          onChange={(page: number) => setCurrentPage(page)}
          className="w-fit self-center"
        />
      </div>

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onSave={handleSaveUser}
          onClose={() => setEditingUser(null)}
        />
      )}
      {isCreatingUser && (
        <CreateUserModal
          onSave={handleCreateUser}
          onClose={() => setIsCreatingUser(false)}
        />
      )}
    </div>
  );
};

export default AdminUserManagement;
