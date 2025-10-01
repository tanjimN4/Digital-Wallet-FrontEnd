import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        cashIn: builder.mutation({
            query: (cashIN) => ({
                url: "/agent/cash-in",
                method: "POST",
                data: cashIN
            }),
            invalidatesTags: ["USER"]
        }),
    })
});

export const { useCashInMutation} = authApi