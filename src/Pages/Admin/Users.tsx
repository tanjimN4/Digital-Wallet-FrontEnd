import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    useBlockUserMutation,
    useUnblockUserMutation,
    useUsersQuery,
} from "@/redux/features/auth/admin.api";
import { authApi } from "@/redux/features/auth/auth.api";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const Users = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data, isLoading, error } = useUsersQuery({ page: currentPage, limit });
  const [blocked] = useBlockUserMutation();
  const [unblocked] = useUnblockUserMutation();

  const users = data?.data || [];
  console.log(users);
  
  const totalPage = data?.meta?.totalPage || 1;

  const usersWithWallet = useMemo(() => users, [users]);

  if (isLoading) return <div className="text-center mt-10">Loading users...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">Error loading users!</div>;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPage) setCurrentPage(page);
  };

  const handleBlockAndUnBlock = async (userId: string, userStatus: string) => {
    try {
      if (userStatus === "ACTIVE") {
        await blocked(userId).unwrap();
        toast.success("User blocked successfully");
      } else if (userStatus === "BLOCKED") {
        await unblocked(userId).unwrap();
        toast.success("User unblocked successfully");
      }

      // Refresh the users query
      dispatch(authApi.util.invalidateTags(["USER", "Users"]));
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4 shadow rounded-2xl">
      <div className="overflow-x-auto">
        <Table className="w-full min-w-[600px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Name</TableHead>
              <TableHead className="w-[250px]">Email</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
              <TableHead className="w-[120px] text-center">Balance</TableHead>
              <TableHead className="w-[120px] text-center">Role</TableHead>
              <TableHead className="w-[120px] text-center">Block/Unblock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersWithWallet.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell className="truncate max-w-[220px]">{user.email}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      user.isBlocked === "BLOCKED"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {user.isBlocked === "BLOCKED" ? "Blocked" : "Active"}
                  </span>
                </TableCell>
                <TableCell className="text-center">{user.wallet?.balance || 0}</TableCell>
                <TableCell className="text-center">{user.role}</TableCell>
                <TableCell className="text-center">
                  <Button
                    onClick={() => handleBlockAndUnBlock(user._id, user.isBlocked)}
                    className={`${
                      user.isBlocked === "ACTIVE"
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

              {Array.from({ length: totalPage }, (_, index) => index + 1).map((page) => (
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
