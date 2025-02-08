import { baseApi } from "../baseApi/baseApi";

const faqApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        faqAdd: builder.mutation({
            query: (formData) => ({
                url: '/faq/add',
                method: 'POST',
                body: formData,  // Send the FormData directly in the body
            }),
            invalidatesTags: ["faq"],
        }),

        getAllFaq:builder.query({
            query: () => ({
                url: '/faq/faq',
                method: 'GET',
                
            }),
            providesTags:["faq"]
        }),
        singleFaq:builder.query({
            query: (id) => ({
                url: `/faq/faq/${id}`,
                method: 'GET',
                
            }),
            providesTags:["faq"]
        }),
      
        updateFaq: builder.mutation({
            query: ({ id, question, answer }) => ({
                url: `/faq/faq/${id}`,
                method: 'PATCH',
                body: { question, answer }, // ✅ Include updated data
                headers: {
                    "Content-Type": "application/json", // ✅ Ensure correct content type
                },
            }),
            invalidatesTags: ["faq"], // ✅ Ensures updated data is refetched
        }),
        deleteFaq:builder.mutation({
            query: (id) => ({
                url: `/faq/faq/${id}`,
                method: 'DELETE',
                
            }),
        })

    }),
});

export const {useFaqAddMutation, useGetAllFaqQuery, useDeleteFaqMutation,useUpdateFaqMutation, useSingleFaqQuery}= faqApi