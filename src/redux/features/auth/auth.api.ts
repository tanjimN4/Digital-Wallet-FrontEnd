import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: userInfo
            })
        }),
        register: builder.mutation({
            query: (userInfo) => ({
                url: "/user/register",
                method: "POST",
                data: userInfo
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST"
            })
        }),
        userInfo: builder.query({
            query: () => ({
                url: "/user/get-me",
                method: "GET",
            }),
            providesTags: ["USER"],
        }),
    })
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation , useUserInfoQuery} = authApi