import { baseApi } from "../../baseApi/baseApi";


const candidateApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCandidate: builder.query({
            query: () => ({
                url: "/apply/applied-user",
                method: "GET",
            }),
        }),
        shortlistUser: builder.mutation({
            query: ({ data, id }) => ({
                url: `/apply/shorlist/${id}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags:["shorlist"]
        }),

        rejectUser: builder.mutation({
            query: ({id}) => ({
                url: `/apply/reject/${id}`,
                method: "POST",
            }),
            invalidatesTags:["reject"]
        }),
        viewCandidate:builder.query({
            query: () => ({
                url: `/apply/applied-user`,
                method: "GET",
               
            }),
        })


    }),
});

export const { useGetAllCandidateQuery, useShortlistUserMutation, useViewCandidateQuery, useRejectUserMutation } = candidateApi