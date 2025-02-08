import { baseApi } from "../../baseApi/baseApi";

const shortlistApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getShortList: builder.query({
            query: () => ({
                url: "/apply/shorlist", // Corrected spelling of 'shortlist'
                method: "GET",
            }),
            providesTags:["shorlist"]
        }),
    }),
});

export const { useGetShortListQuery } = shortlistApi;
export default shortlistApi;
