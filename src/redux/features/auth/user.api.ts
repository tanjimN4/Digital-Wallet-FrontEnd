import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMoney: builder.mutation<any, { email: string; balance: number }>({
      query: (sendMoneyData) => ({
        url: "transaction/send-money",
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ensure server parses JSON correctly
        },
        data: sendMoneyData, // payload goes in body
      }),
    }),
    depositMoney: builder.mutation<any, { email: string; balance: number }>({
      query: (depositMoneyData) => ({
        url: "transaction/deposit",
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ensure server parses JSON correctly
        },
        data: depositMoneyData, // payload goes in body
      }),
    }),
    cashOut: builder.mutation<any, { email: string; balance: number }>({
      query: (depositMoneyData) => ({
        url: "transaction/withdraw",
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ensure server parses JSON correctly
        },
        data: depositMoneyData, // payload goes in body
      }),
    }),
    updateUser: builder.mutation<any, { id: string; updateData: any }>({
      query: ({ id, updateData }) => ({
        url: `user/${id}`,  
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        data:updateData
      }),
      invalidatesTags: ["USER"],
    }),

    myTransaction: builder.query<any, void>({
      query: () => ({
        url: "/transaction/my-transaction-history",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    userEmailRole: builder.query<any, void>({
      query: () => ({
        url: "user/getemailrole",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
  }),
});


export const { useSendMoneyMutation, useMyTransactionQuery, useDepositMoneyMutation, useCashOutMutation, useUpdateUserMutation,useUserEmailRoleQuery } = authApi;
