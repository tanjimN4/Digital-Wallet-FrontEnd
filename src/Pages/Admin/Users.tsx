import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import Swal from "sweetalert2";
import "animate.css";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  useBlockUserMutation,
  useUnblockUserMutation,
  useUpdateAgentStatusMutation,
  useUpdateRoleMutation,
  useUsersQuery,
} from "@/redux/features/auth/admin.api";
import { authApi } from "@/redux/features/auth/auth.api";
import type { IUser } from "@/types";


const Users = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 10;

  const { data, isLoading, error } = useUsersQuery({ page: currentPage, limit });
  const [blocked] = useBlockUserMutation();
  const [unblocked] = useUnblockUserMutation();
  const [updateRole] = useUpdateRoleMutation()
  const [updateAgentStatus] = useUpdateAgentStatusMutation();

  const users = data?.data || [];
  console.log(users);
  
  const totalPage = data?.meta?.totalPage || 1;

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    return users.filter(
      (user: IUser) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, users]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPage) setCurrentPage(page);
  };

  const handleBlockAndUnBlock = async (userId: string, userStatus: string) => {
    const result = await Swal.fire({
      title: `Are you sure you want to ${userStatus === "ACTIVE" ? "block" : "unblock"} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showClass: {
        popup: `
        animate__animated
        animate__fadeInUp
        animate__faster
      `
      },
      hideClass: {
        popup: `
        animate__animated
        animate__fadeOutDown
        animate__faster
      `
      }
    });

    if (result.isConfirmed) {
      try {
        if (userStatus === "ACTIVE") {
          await blocked(userId).unwrap();
          toast.success("User blocked successfully");
        } else {
          await unblocked(userId).unwrap();
          toast.success("User unblocked successfully");
        }
        dispatch(authApi.util.invalidateTags(["USER", "Users"]));
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong!");
      }
    }
  };

  // Role change
  const handleRoleChange = async (id: string, newRole: string) => {
    const result = await Swal.fire({
      title: `Are you sure you want to set this user's role to "${newRole}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showClass: {
        popup: "animate__animated animate__fadeInUp animate__faster",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutDown animate__faster",
      },
    });

    if (result.isConfirmed) {
      try {
        await updateRole({ id,role:newRole}).unwrap();
        toast.success("Role updated successfully");
        dispatch(authApi.util.invalidateTags(["USER", "Users"]));
      } catch (error) {
        console.error(error);
        toast.error("Failed to update role");
      }
    }
  };
  // Utility function to handle agent status update
  const handleAgentStatusUpdate = async (user: IUser, selectedStatus?: "APPROVED" | "REJECTED") => {
    if (!user?._id) return toast.error("User ID is missing!");

    // Determine status if not explicitly passed (for button toggle)
    const agentApprovalStatus =
      selectedStatus ??
      (user.agentApprovalStatus === "APPROVED" ? "REJECTED" : "APPROVED");

    const result = await Swal.fire({
      title: `Are you sure you want to ${agentApprovalStatus === "APPROVED" ? "approve" : "reject"} this agent?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showClass: {
        popup: "animate__animated animate__fadeInUp animate__faster",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutDown animate__faster",
      },
    });

    if (!result.isConfirmed) return;

    try {
      const paylod = { _id: user._id, agentApprovalStatus }
      console.log(paylod);

      await updateAgentStatus(paylod).unwrap();
      toast.success(`Agent status updated to ${agentApprovalStatus}`);
      dispatch(authApi.util.invalidateTags(["USER", "Users"]));
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  if (isLoading) return <div className="text-center mt-10">Loading users...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">Error loading users!</div>;

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4 shadow rounded-2xl">
      {/* Search */}
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded w-64 focus:outline-none focus:ring"
        />
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full min-w-[700px]">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Balance</TableHead>
              <TableHead className="text-center">Role</TableHead>
              <TableHead className="text-center">Agent Approval</TableHead>
              <TableHead className="text-center">Block/Unblock</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredUsers.map((user: any) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell className="truncate max-w-[220px]">{user.email}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${user.isBlocked === "BLOCKED"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                      }`}
                  >
                    {user.isBlocked === "BLOCKED" ? "Blocked" : "Active"}
                  </span>
                </TableCell>
                <TableCell className="text-center">{user.wallet?.balance?.toLocaleString() || 0}</TableCell>

                {/* Role Column */}
                <TableCell className="text-center">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="border rounded px-2 py-1 bg-blue-500"
                  >
                    <option value="USER">User</option>
                    <option value="AGENT">Agent</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </TableCell>

                {/* Agent Approval Column */}
                <TableCell className="text-center">
                  {user.role === "AGENT" ? (
                    user.agentApprovalStatus === "PENDING" ? (
                      <select
                        defaultValue=""
                        className="border rounded px-2 py-1 text-sm bg-blue-500 text-white"
                        onChange={(e) => handleAgentStatusUpdate(user, e.target.value as "APPROVED" | "REJECTED")}
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="APPROVED">Approve</option>
                        <option value="REJECT">Reject</option>
                      </select>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleAgentStatusUpdate(user)}
                        className={
                          user.agentApprovalStatus === "APPROVED"
                            ? "bg-destructive text-white"
                            : "bg-emerald-500 text-white"
                        }
                      >
                        {user.agentApprovalStatus === "APPROVED" ? "Reject" : "Approve"}
                      </Button>
                    )
                  ) : (
                    "-"
                  )}
                </TableCell>


                {/* Block/Unblock Column */}
                <TableCell className="text-center">
                  <Button
                    onClick={() => handleBlockAndUnBlock(user._id, user.isBlocked)}
                    className={`${user.isBlocked === "ACTIVE"
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                      : "bg-destructive text-white hover:bg-destructive/90"
                      }`}
                  >
                    {user.isBlocked === "ACTIVE" ? "Block" : "Unblock"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPage > 1 && (
        <div className="flex justify-end mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page} onClick={() => handlePageChange(page)}>
                  <PaginationLink isActive={currentPage === page}>{page}</PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={currentPage === totalPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default Users;
