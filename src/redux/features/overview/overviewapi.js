import { baseApi } from "../../baseApi/baseApi";


const Overviews = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTotalApplicaiton: builder.query({
      query: () => ({
        url: "/apply/total-applicaiton",
        method: "GET",
      }),
    }),
    getTotalJobs: builder.query({
      query: () => ({
        url: "/job/total-job",
        method: "GET",
      })
    }),
    getTotalShortlist: builder.query({
      query: () => ({
        url: "/apply/totla-shorlist",
        method: "GET",
      })
    }),
    getActiveJobs: builder.query({
      query: () => ({
        url: "/job/application-user",
        method: "GET",
      }),
    }),
    getRecentApplied: builder.query({
      query: () => ({
        url: "/apply/recentapply",
        method: "GET",
      })
    })


  }),
});

export const { useGetTotalApplicaitonQuery, useGetTotalJobsQuery, useGetTotalShortlistQuery, useGetActiveJobsQuery, useGetRecentAppliedQuery } = Overviews;