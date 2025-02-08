import { baseApi } from "../../baseApi/baseApi";

const PrivacyPolicyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addPrivacyPolicy: builder.mutation({
      query: (data) => ({
        url: "/vehical-add/createVehical",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response?.data?.attributes,
    }),
    getAllPrivacyPolicy: builder.query({
      query: () => ({
        url: "/setting/showPrivacy",
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.attributes,
    }),
  }),
});

export const {
  useAddPrivacyPolicyMutation,
  useGetAllPrivacyPolicyQuery,
} = PrivacyPolicyApi;