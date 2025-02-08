import { baseApi } from "../../baseApi/baseApi";
const AdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/car-brand/createCarBrand",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    getAllAdmin: builder.query({
      query: () => ({
        url: "/car-brand/getAllCarBrands",
        method: "GET",
      }),
      providesTags: ["Categories"],
      transformResponse: (response) => response?.data?.attributes,
    }),
   
    updateCategory: builder.mutation({
      query: ({id, data}) => ({
        url: `/car-brand/updateCarBrand${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Categories"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    deleteCategory: builder.mutation({
      query: (id) => {
        console.log(id)
        return {
          url: `/car-brand/getAllCarBrands${id}`,
          method: "DELETE",
        };
      },
       invalidatesTags: ["Categories"],
       transformResponse: (response) => response?.data,
    }),
  }),
});

export const {
  useGetAllAdminQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = AdminApi;
