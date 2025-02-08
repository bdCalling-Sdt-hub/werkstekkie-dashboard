import { baseApi } from "../../baseApi/baseApi";

const TermsConditionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTermCondition: builder.mutation({
      query: (data) => ({
        url: "/vehical-add/createVehical",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response?.data?.attributes,
    }),
    getAllTermCondition: builder.query({
      query: () => ({
        url: "/setting/showTerms",
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.attributes,
    }),
  }),
});

export const {
  useAddTermConditionMutation,
  useGetAllTermConditionQuery
} = TermsConditionsApi;
