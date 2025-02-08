import { baseApi } from "../baseApi/baseApi";

const blogApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBlogs: builder.query({
            query: ({ page, limit }) => ({
                url: `/blog?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags:["blog"]
        }),

        blogPost: builder.mutation({
            query: (formData) => ({
                url: '/blog/post-blog',
                method: 'POST',
                body: formData,  // Send the FormData directly in the body
            }),
            invalidatesTags: ["blog"],
        }),
        singleBlog:builder.query({
            query: (id) => ({
                url: `/blog/${id}`,
                method: 'GET',
                  
            }),
        }),
        blogUpdate: builder.mutation({
            query: ({id, formData }) => ({
                url: `/blog/update-blog/${id}`,
                method: 'PATCH',
                body:formData ,  // Send the FormData directly in the body
            }),
            invalidatesTags: ["blog"],
        }),
        blogDelete:builder.mutation({
            query: (id) => ({
                url: `/blog/${id}`,
                method: 'DELETE',
                  
            }),
            invalidatesTags:["blog"]
        })
    }),
});

export const { useBlogPostMutation, useBlogUpdateMutation,useBlogDeleteMutation, useSingleBlogQuery,useGetAllBlogsQuery } = blogApi