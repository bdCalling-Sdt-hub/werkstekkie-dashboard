import { baseApi } from "../../baseApi/baseApi";

const allJobs = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAlljobs: builder.query({
            query: () => ({
                url: "/job/all-jobs",
                method: "GET",
            }),
            providesTags: ["job"]
        }),
        
        updateJobs: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/job/update-job/${id}`,
                method: "PATCH",
                body: formData,
                formData: true, // Helps in handling file uploads
            }),
            invalidatesTags: ["job"],
        }),
        
        deleteJobs: builder.mutation({
            query: (id) => ({
                url: `/job/delete-job/${id}`,
                method: "DELETE",
            }),
        }),
        getsinleJob: builder.query({
            query: (id) => ({
                url: `/job/single-job/${id}`,
                method: "GET",
            }),

        }),
    

        postJob: builder.mutation({
            query: (formData) => ({
                url: '/job/create-job',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['job'],
        }),


    }),
});

export const { useGetAlljobsQuery, useUpdateJobsMutation, useDeleteJobsMutation, useGetsinleJobQuery, usePostJobMutation } = allJobs
