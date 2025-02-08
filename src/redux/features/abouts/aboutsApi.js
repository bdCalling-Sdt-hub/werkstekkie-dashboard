import { baseApi } from "../../baseApi/baseApi";

const aboutsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addAbouts: builder.mutation({
      query: (data) => ({
        url: "/vehical-add/createVehical",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response?.data?.attributes,
    }),
    getAllAbouts: builder.query({
      query: () => ({
        url: "/setting/showAboutUs",
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.attributes,
    }),
  }),
});

export const {
  useAddAboutsMutation,
  useGetAllAboutsQuery,
} = aboutsApi;