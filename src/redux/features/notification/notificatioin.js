import { baseApi } from "../../baseApi/baseApi";

const notificationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getNotification: builder.query({
            query: () => ({
                url: "/notifications/notifications",
                method: "GET",
            }),
            
        }),

    }),
});

export const {useGetNotificationQuery}=notificationApi