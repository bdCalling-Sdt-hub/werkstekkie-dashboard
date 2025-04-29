// import React, { useEffect } from "react";
// import { FaUserAlt, FaBriefcase, FaSearch, } from "react-icons/fa";
// import { FiRefreshCcw } from "react-icons/fi";
// import { PiNotebook, PiNotebookFill } from "react-icons/pi";
// import {
//     useGetActiveJobsQuery,
//     useGetRecentAppliedQuery,
//     useGetTotalApplicaitonQuery,
//     useGetTotalJobsQuery,
//     useGetTotalShortlistQuery
// } from "../../../redux/features/overview/overviewapi";
// import { ImageBaseUrl } from "../../../redux/blog/blogImageApi";
// import { Image } from "antd";

// const Overview = () => {
//     // Fetch data from API
//     const { data: totalApplications, isLoading: loadingApplications } = useGetTotalApplicaitonQuery();
//     const { data: totalJobs, isLoading: loadingJobs } = useGetTotalJobsQuery();
//     const { data: totalShortlist, isLoading: loadingShortlist } = useGetTotalShortlistQuery();
 
//     const { data: activeJobs, isLoading: loadingActiveJobs } = useGetActiveJobsQuery();  // Fixed missing isLoading variable
   
//     const { data: recentApplied, isLoading: loadingRecent } = useGetRecentAppliedQuery();

//     const recent = recentApplied?.data?.attributes;
//     const jobactive = activeJobs?.data?.attributes || []; // Ensure it's an array to prevent errors
   

//     const handleRefetch = () => {
//         jobactive(); // Trigger the fetchJobs function again
//     };

//     // Fetch jobs on component mount

//     const getFullImageUrl = (path) => {
//         if (!path) return "/default-image.jpg";
//         if (path.startsWith("http")) return path;
//         return `${ImageBaseUrl}${path}`;
//     };

//     return (
//         <div className=" space-y-8">
//             {/* Statistics Section */}
//             <div className="flex justify-between gap-8 p-8">


//                 <div className="bg-white p-6 rounded-lg shadow-md w-1/3 flex flex-col items-center">
//                     {/* Icon Wrapper */}
//                     <div className="flex gap-10">
//                         <div className="flex items-center justify-center bg-slate-200 w-[70px] h-[70px] rounded-full mb-4">
//                             <PiNotebook className="w-[32px] h-[32px] text-xl text-[#4379F2]" />
//                         </div>

//                         {/* Total Applications */}
//                         <div className="text-center">
//                             <div className="text-gray-600 text-2xl font-semibold">Total Applications</div>
//                             <div className="text-4xl font-bold">
//                                 {loadingApplications ? "Loading..." : totalApplications?.data?.attributes || 0}
//                             </div>
//                         </div>
//                     </div>
//                 </div>



//                 <div className="bg-white p-6 rounded-lg shadow-md w-1/3 flex flex-col items-center">
//                     {/* Icon Wrapper */}
//                     <div className="flex gap-10">
//                         <div className="flex items-center justify-center bg-slate-200 w-[70px] h-[70px] rounded-full mb-4">
//                             <FaBriefcase className="w-[32px] h-[32px] text-xl text-[#4379F2]" />
//                         </div>

//                         {/* Total Applications */}
//                         <div className="text-center">
//                             <div className="text-gray-600 text-2xl font-semibold">Total Jobs</div>
//                             <div className="text-4xl font-bold">
//                                 {loadingJobs ? "Loading..." : totalJobs?.data?.attributes || 0}
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="bg-white p-6 rounded-lg shadow-md w-1/3 flex flex-col items-center">
//                     {/* Icon Wrapper */}
//                     <div className="flex gap-10">
//                         <div className="flex items-center justify-center bg-slate-200 w-[70px] h-[70px] rounded-full mb-4">
//                             <PiNotebookFill className="w-[32px] h-[32px] text-xl text-[#4379F2]" />
//                         </div>

//                         {/* Total Applications */}
//                         <div className="text-center">
//                             <div className="text-gray-600 text-2xl font-semibold">Shortlisted</div>
//                             <div className="text-4xl font-bold">
//                                 {loadingShortlist ? "Loading..." : totalShortlist?.data?.attributes || 0}
//                             </div>
//                         </div>
//                     </div>
//                 </div>


//             </div>



//             {/* Active Jobs and Recent Applications Section */}
//             <div className="p-8 space-y-8 ">
//                 <div className="flex gap-8">
//                     {/* Active Jobs Table */}
//                     <div className="bg-white p-6 rounded-lg shadow-md w-1/2 border relative">
//                         <div className="flex justify-between items-center mb-4">
//                             <h2 className="text-2xl font-semibold">Active Jobs</h2>
//                             <button onClick={handleRefetch} className="p-1 hover:bg-gray-200 rounded-full">
//                                 <FiRefreshCcw className="w-5 h-5 text-gray-500" />
//                             </button>
//                         </div>
//                         <table className="min-w-full table-auto">
//                             <thead className="bg-[#F7F9FC]">
//                                 <tr className="border-b">
//                                     <th className="px-4 py-2 text-left text-gray-500">Job Title</th>
//                                     <th className="px-4 py-2  text-gray-500 text-right">Application</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {loadingActiveJobs ? (
//                                     <tr>
//                                         <td colSpan="2" className="text-center py-4">
//                                             Loading...
//                                         </td>
//                                     </tr>
//                                 ) : (
//                                     jobactive.map((job, index) => (
//                                         <tr key={index} className="hover:bg-gray-100">
//                                             <td className="border-b px-4 py-2">{job.title}</td>
//                                             <td className="border-b px-4 py-2 text-right">{job.applicationCount}</td>
//                                         </tr>
//                                     ))
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* New Applications Section */}
//                     <div className="bg-white p-6 rounded-lg shadow-md w-1/2 border">


//                         <div className="flex justify-between items-center mb-4">
//                             <h2 className="text-2xl font-semibold">New Applications</h2>
//                             <button onClick={handleRefetch} className="p-1 hover:bg-gray-200 rounded-full">
//                                 <FiRefreshCcw className="w-5 h-5 text-gray-500" />
//                             </button>
//                         </div>
//                         <div className="space-y-4">
//                             {loadingRecent ? (
//                                 <p className="text-center">Loading...</p>
//                             ) : (
//                                 recent?.map((applicant, index) => (
//                                     <div key={index} className="flex items-center space-x-4 bg-[#F7F7F7]">
                                        
//                                         <div className="flex justify-center">
//                                             <Image
//                                                 src={getFullImageUrl(applicant.profileImage)} // Ensure correct path
//                                                 alt="use image"
//                                                 width={50}
//                                                 height={50}
//                                                 className="rounded-full w-full"
//                                             />
//                                         </div>
//                                         <div>
//                                             <p className="font-semibold">{applicant.userName}</p>
//                                             <p className="text-gray-600">Applied for {applicant.jobTitle}</p>
//                                         </div>
//                                     </div>
//                                 ))
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Overview;




import React from "react";
import { FaBriefcase } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import { PiNotebook, PiNotebookFill } from "react-icons/pi";
import {
    useGetActiveJobsQuery,
    useGetRecentAppliedQuery,
    useGetTotalApplicaitonQuery,
    useGetTotalJobsQuery,
    useGetTotalShortlistQuery
} from "../../../redux/features/overview/overviewapi";
import { ImageBaseUrl } from "../../../redux/blog/blogImageApi";
import { Image } from "antd";

const Overview = () => {
    // Fetch data from API
    const { data: totalApplications, isLoading: loadingApplications } = useGetTotalApplicaitonQuery();
    const { data: totalJobs, isLoading: loadingJobs } = useGetTotalJobsQuery();
    console.log(totalJobs)
    const { data: totalShortlist, isLoading: loadingShortlist } = useGetTotalShortlistQuery();
    const { data: activeJobs, isLoading: loadingActiveJobs } = useGetActiveJobsQuery();
    const { data: recentApplied, isLoading: loadingRecent } = useGetRecentAppliedQuery();

    const recent = recentApplied?.data?.attributes;
    const jobactive = activeJobs?.data?.attributes || []; 

    const getFullImageUrl = (path) => {
        if (!path) return "/default-image.jpg";
        if (path.startsWith("http")) return path;
        return `${ImageBaseUrl}${path}`;
    };

    return (
        <div className="space-y-6 p-4 md:p-8">
            {/* Statistics Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { icon: <PiNotebook className="text-4xl text-[#4379F2]" />, title: "Total Applications", data: totalApplications?.data?.attributes, loading: loadingApplications },
                    { icon: <FaBriefcase className="text-4xl text-[#4379F2]" />, title: "Total Jobs", data: totalJobs?.data?.attributes, loading: loadingJobs },
                    { icon: <PiNotebookFill className="text-4xl text-[#4379F2]" />, title: "Shortlisted", data: totalShortlist?.data?.attributes, loading: loadingShortlist }
                ].map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-center gap-6">
                        <div className="flex items-center justify-center bg-slate-200 w-16 h-16 rounded-full">
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-gray-600 text-lg font-semibold">{stat.title}</p>
                            <p className="text-3xl font-bold">{stat.loading ? "Loading..." : stat.data || 0}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Active Jobs & New Applications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Active Jobs */}
                <div className="bg-white p-6 rounded-lg shadow-md border overflow-hidden">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Active Jobs</h2>
                        <button className="p-1 hover:bg-gray-200 rounded-full">
                            <FiRefreshCcw className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-100">
                                <tr className="border-b">
                                    <th className="px-4 py-2 text-left">Job Title</th>
                                    <th className="px-4 py-2 text-right">Applications</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loadingActiveJobs ? (
                                    <tr>
                                        <td colSpan="2" className="text-center py-4">Loading...</td>
                                    </tr>
                                ) : (
                                    jobactive.map((job, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="border-b px-4 py-2">{job.title}</td>
                                            <td className="border-b px-4 py-2 text-right">{job.applicationCount}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* New Applications */}
                <div className="bg-white p-6 rounded-lg shadow-md border">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">New Applications</h2>
                        <button className="p-1 hover:bg-gray-200 rounded-full">
                            <FiRefreshCcw className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {loadingRecent ? (
                            <p className="text-center">Loading...</p>
                        ) : (
                            recent?.map((applicant, index) => (
                                <div key={index} className="flex items-center gap-4 bg-gray-100 p-3 rounded-md">
                                    <Image
                                        src={getFullImageUrl(applicant.profileImage)}
                                        alt="user image"
                                        width={50}
                                        height={50}
                                        className="rounded-full"
                                    />
                                    <div>
                                        <p className="font-semibold">{applicant.userName}</p>
                                        <p className="text-gray-600 text-sm">Applied for {applicant.jobTitle}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
