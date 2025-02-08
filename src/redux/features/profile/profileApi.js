import { baseApi } from "../../baseApi/baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => ({
        url:`/user/profile/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
      transformResponse: (response) => response?.data?.attributes,
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: "/user/profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
      transformResponse: (response) => response.data,
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useChangePasswordMutation,
} = profileApi;
