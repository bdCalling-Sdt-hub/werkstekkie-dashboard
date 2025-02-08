import { baseApi } from "../../baseApi/baseApi";

const vehicalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addvehical: builder.mutation({
      query: (data) => ({
        url: "/vehical-add/createVehical",
        method: "POST",
        body: data,
      }),
    }),
    getAllvehicals: builder.query({
      query: () => ({
        url: "vehical-add/getVehicals",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllvehicalsQuery,
  useAddvehicalMutation,
} = vehicalApi;
