import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        sendMoney: builder.query({
            query: (sendMoney) => ({
                url: "transaction/send-money",
                method: "POST",
                data:sendMoney
            }),
        })
    }),
});

export const { useSendMoneyQuery} = authApi;
