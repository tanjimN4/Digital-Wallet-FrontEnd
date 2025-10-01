import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        users: builder.query({
            query: (params) => ({
                url: "user/all-users",
                method: "GET",
                params
            }),
            providesTags: (result) =>
                result
                    ? [
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        ...result.data.map((user: any) => ({ type: "USER" as const, id: user._id })),
                        { type: "USER", id: "LIST" },
                    ]
                    : [{ type: "USER", id: "LIST" }],
        }),
        allTransactions: builder.query({
            query: (params) => ({
                url: "transaction/all-transaction",
                method: "GET",
                params,
            }),
        }),
        blockUser: builder.mutation({
            query: (id: string) => ({
                url: `user/block/${id}`,
                method: "PATCH",
                data: { isBlocked: "BLOCKED" },
                headers: { "Content-Type": "application/json" },
            }),
            invalidatesTags: [{ type: "USER", id: "LIST" }],
        }),
        unblockUser: builder.mutation({
            query: (id: string) => ({
                url: `user/unblock/${id}`,
                method: "PATCH",
                data: { isBlocked: "ACTIVE" },
                headers: { "Content-Type": "application/json" },
            }),
            invalidatesTags: [{ type: "USER", id: "LIST" }],
        }),
        updateAgentStatus: builder.mutation({
            query: (payload) => {
                return {
                    url: `/agent/agent-approval-reject-status`,
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: payload,
                };
            },
            invalidatesTags: ["USER", "Users"],
        }),
        updateRole: builder.mutation({
            query: ({ id, role }: { id: string; role: string }) => ({
                url: `user/${id}`,
                method: "PATCH",
                data: { role },
                headers: { "Content-Type": "application/json" },
            }),
            invalidatesTags: [{ type: "USER", id: "LIST" }],
        }),



    }),
});

export const {useAllTransactionsQuery, useUsersQuery, useBlockUserMutation, useUnblockUserMutation, useUpdateAgentStatusMutation, useUpdateRoleMutation } = authApi;
