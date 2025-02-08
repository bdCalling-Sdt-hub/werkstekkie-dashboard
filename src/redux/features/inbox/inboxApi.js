import { baseApi } from "../../api/baseApi";

export const inboxApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addMessage: builder.mutation({
      query: (messageBody) => ({
        url: "/message/add-message",
        method: "POST",
        body: messageBody,
      }),
      invalidatesTags: ["Messages", "Chat"],
    }),
    getMessages: builder.query({
      query: ({ chatId, page }) =>
        `/message/get-messages?chatId=${chatId}&page=${page}`,
      providesTags: ["Messages"],
      transformResponse: (response) => {
        return response?.data?.attributes;
      },
    }),
    getMoreMessages: builder.query({
      query: ({ chatId, page }) =>
        `/message/get-messages?chatId=${chatId}&page=${page}`,
      providesTags: ["Messages"],
      async onQueryStarted({ chatId }, { dispatch, queryFulfilled }) {
        const messages = await queryFulfilled;
        if (messages.data) {
          dispatch(
            baseApi.util.updateQueryData(
              "getMessages",
              chatId,
              (previousData) => {
                console.log("Get more messages", previousData);
              }
            )
          );
        }
      },
      transformResponse: (response) => {
        return response?.data?.attributes;
      },
    }),
    getChats: builder.query({
      query: () => `/chat/get-chat`,
      transformResponse: (response) => {
        return response?.data?.attributes;
      },
    }),
    getChat: builder.query({
      query: (chatId) => `/chat/${chatId}`,
      transformResponse: (response) => {
        return response?.data?.attributes;
      },
    }),
    cancelOrWithdrawOffer: builder.mutation({
      query: (offerId) => ({
        url: `/message/${offerId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Messages"],
      transformResponse: (response) => {
        return response?.data?.attributes;
      },
    }),
  }),
});

export const {
  useAddMessageMutation,
  useGetChatsQuery,
  useGetChatQuery,
  useGetMessagesQuery,
  useCancelOrWithdrawOfferMutation,
  useGetMoreMessagesQuery,
} = inboxApi;
