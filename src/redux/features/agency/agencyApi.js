import { baseApi } from "../../baseApi/baseApi";

const AgencyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAgency: builder.query({
      query: () => ({
        url: "/admin-dashboard/showAllAgencyInAdmin",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllAgencyQuery } = AgencyApi;