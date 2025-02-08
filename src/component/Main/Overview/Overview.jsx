import React from "react";
import { FaUserAlt, FaBriefcase, FaClipboardCheck, FaSearch } from "react-icons/fa";
import {  
    useGetActiveJobsQuery, 
    useGetRecentAppliedQuery, 
    useGetTotalApplicaitonQuery, 
    useGetTotalJobsQuery, 
    useGetTotalShortlistQuery 
} from "../../../redux/features/overview/overviewapi";

const Overview = () => {
    // Fetch data from API
    const { data: totalApplications, isLoading: loadingApplications } = useGetTotalApplicaitonQuery();
    const { data: totalJobs, isLoading: loadingJobs } = useGetTotalJobsQuery();
    const { data: totalShortlist, isLoading: loadingShortlist } = useGetTotalShortlistQuery();
    console.log(totalShortlist)
    const { data: activeJobs, isLoading: loadingActiveJobs } = useGetActiveJobsQuery();  // Fixed missing isLoading variable
    console.log(activeJobs)
    const { data: recentApplied, isLoading: loadingRecent } = useGetRecentAppliedQuery();

    const recent = recentApplied?.data?.attributes;
    const jobactive = activeJobs?.data?.attributes || []; // Ensure it's an array to prevent errors

    return (
        <div className="p-8 space-y-8">
            {/* Statistics Section */}
            <div className="flex justify-between gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-gray-600">Total Applications</div>
                        <FaClipboardCheck className="text-xl text-blue-500" />
                    </div>
                    <div className="text-4xl font-bold text-center">
                        {loadingApplications ? "Loading..." : totalApplications?.data?.attributes || 0}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-gray-600">Total Jobs</div>
                        <FaBriefcase className="text-xl text-green-500" />
                    </div>
                    <div className="text-4xl font-bold text-center">
                        {loadingJobs ? "Loading..." : totalJobs?.data?.attributes || 0}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-gray-600">Shortlisted</div>
                        <FaSearch className="text-xl text-yellow-500" />
                    </div>
                    <div className="text-4xl font-bold text-center">
                        {loadingShortlist ? "Loading..." : totalShortlist?.data?.attributes || 0}
                    </div>
                </div>
            </div>

            {/* Active Jobs and Recent Applications Section */}
            <div className="p-8 space-y-8">
                <div className="flex gap-8">
                    {/* Active Jobs Table */}
                    <div className="bg-white p-6 rounded-lg shadow-md w-1/2 border">
                        <h2 className="text-2xl font-semibold mb-4">Active Jobs</h2>
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="border-b px-4 py-2 text-left">Job Title</th>
                                    <th className="border-b px-4 py-2 text-left">Applications</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loadingActiveJobs ? (
                                    <tr><td colSpan="2" className="text-center py-4">Loading...</td></tr>
                                ) : (
                                    jobactive.map((job, index) => (
                                        <tr key={index} className="hover:bg-gray-100">
                                            <td className="border-b px-4 py-2">{job.title}</td>
                                            <td className="border-b px-4 py-2">{job.applicationCount}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* New Applications Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md w-1/2 border">
                        <h2 className="text-2xl font-semibold mb-4">New Applications</h2>
                        <div className="space-y-4">
                            {loadingRecent ? (
                                <p className="text-center">Loading...</p>
                            ) : (
                                recent?.map((applicant, index) => (
                                    <div key={index} className="flex items-center space-x-4">
                                        <FaUserAlt className="text-gray-500 text-xl" />
                                        <div>
                                            <p className="font-semibold">{applicant.userName}</p>
                                            <p className="text-gray-600">Applied for {applicant.jobTitle}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
