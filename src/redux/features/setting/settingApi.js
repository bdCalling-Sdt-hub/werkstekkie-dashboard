import { baseApi } from "../../baseApi/baseApi";

const settingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        updateUser: builder.mutation({
            query: (data) => {
                const formData = new FormData();
                
                // Append fields to FormData (for text fields)
                if (data.fullName) formData.append("fullName", data.fullName);
                if (data.phoneNumber) formData.append("phoneNumber", data.phoneNumber);
                if (data.email) formData.append("email", data.email);
                if (data.currentPassword) formData.append("currentPassword", data.currentPassword);
                if (data.newPassword) formData.append("newPassword", data.newPassword);
                
                // Append profile image if exists
                if (data.profileImage) {
                    formData.append("profileImage", data.profileImage);
                }
        
                return {
                    url: "/user/profile",
                    method: "PATCH",
                    body: formData,
                    headers: {
                        // No need to set Content-Type for FormData; Browser automatically does it
                    },
                };
            },
            invalidatesTags: ["User"], // Invalidate cache after update
        }),

        getUser:builder.query({
            query: () => ({
              url:`/user/profile`,
              method: "GET",
            }),
            providesTags: ["User"],
        })
        

    }),
});

export const{useUpdateUserMutation, useGetUserQuery}=settingApi