


// import { useState, useEffect } from "react";
// import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
// import { IoIosCheckmarkCircleOutline } from "react-icons/io";
// import { Image } from "antd";
// import { toast } from "sonner";
// import { ImageBaseUrl } from "../../../redux/blog/blogImageApi";
// import { useBlogDeleteMutation, useGetAllBlogsQuery } from "../../../redux/blog/blogApi";
// import Link from "antd/es/typography/Link";

// const BlogPosts = () => {
//     const [posts, setPosts] = useState([]);
//     const [statusFilter, setStatusFilter] = useState("All Status");
//     const [categoryFilter, setCategoryFilter] = useState("All Category");
//     const [dateFilter, setDateFilter] = useState("Last 7 Days");

//     const { data, error, isLoading } = useGetAllBlogsQuery({ page: 1, limit: 10 });
//     const [deleteBlog] = useBlogDeleteMutation(); // Initialize delete mutation

//     console.log("API Response:", data); // Log to check the structure

//     const blogs = data?.data?.attributes || [];



//     useEffect(() => {
//         if (blogs) {
//             setPosts(blogs);
//         }
//     }, [data]);

//     const getFullImageUrl = (path) => {
//         if (!path) return "/default-image.jpg"; // If `featureImage` is missing, use a default image
//         if (path.startsWith("http")) return path; // If it's already a full URL, return as is
//         return `${ImageBaseUrl}${path}`; // Convert relative path to absolute URL
//     };

//     // ✅ Function to Delete a Blog Post
//     const handleDeletePost = async (postId) => {
//         try {
//             await deleteBlog(postId).unwrap(); // Call API to delete
//             setPosts(posts.filter((post) => post.id !== postId)); // Update UI by removing deleted post
//             toast.success("blog delete successfully")
//         } catch (error) {
//             console.error("Error deleting post:", error);
//         }
//     };

//     if (isLoading) return <p>Loading blogs...</p>;
//     if (error) return <p>Error fetching blogs: {error.message}</p>;

  



//     return (
//         <div className="p-6 bg-gray-100 min-h-screen">
//             <div className="flex justify-between items-center mb-4">
//                 <h1 className="text-xl font-semibold">Blog Post</h1>
//                 <Link href="/newblog">
//                     <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
//                         <FaPlus className="mr-2" /> New Post
//                     </button>
//                 </Link>
//             </div>

//             <div className="flex gap-4 mb-4">
//                 <input type="text" placeholder="Search Post" className="p-2 border rounded w-full" />
//                 <select className="p-2 border rounded" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
//                     <option>All Status</option>
//                     <option>Published</option>
//                     <option>Draft</option>
//                 </select>
//                 <select className="p-2 border rounded" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
//                     <option>All Category</option>
//                     <option>Design</option>
//                     <option>Development</option>
//                     <option>Technology</option>
//                 </select>
//                 <select className="p-2 border rounded" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
//                     <option>Last 7 Days</option>
//                     <option>Last 30 Days</option>
//                 </select>
//             </div>

//             <div className="bg-white p-4 rounded-lg shadow-md">
//                 <table className="w-full border-collapse">
//                     <thead>
//                         <tr className="bg-gray-200 text-left">
//                             <th className="p-2">Post</th>
//                             <th className="p-2">Category</th>
//                             <th className="p-2">Status</th>
//                             <th className="p-2">Date</th>
//                             <th className="p-2">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {posts.length > 0 ? (
//                             posts.map((post) => (
//                                 <tr key={post.id} className="border-b hover:bg-gray-100 transition">
//                                     <td className="p-2 flex items-center gap-2">
//                                         <Image src={getFullImageUrl(post.featureImage)} alt="Blog" width={50} height={50} className="rounded-lg" />
//                                         <p className="font-medium">{post.title}</p>
//                                     </td>
//                                     <td className="p-2">{post.category}</td>
//                                     <td className="p-2">
//                                         <span className={`px-2 py-1 text-xs rounded-md font-semibold ${post.status === "Published" ? "bg-green-200 text-green-700" : "bg-yellow-200 text-yellow-700"}`}>{post.status}</span>
//                                     </td>
//                                     <td className="p-2">{new Date(post?.createdAt).toLocaleDateString()}</td>
//                                     <td className="p-2 flex gap-2">
//                                         <Link href={`/blog/${post._id}`}>
//                                             <button className="text-blue-600">
//                                                 <FaEdit />
//                                             </button>
//                                         </Link>
//                                         <button className="text-green-600"><IoIosCheckmarkCircleOutline /></button>
//                                         <button className="text-red-600" onClick={() => handleDeletePost(post._id)}><FaTrash /></button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="5" className="text-center py-4 text-gray-500">No blogs found.</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             <div className="flex justify-between items-center mt-4">
//                 <span>Showing 10 of 50</span>
//                 <div className="flex gap-2">
//                     <button className="px-3 py-1 bg-gray-200 rounded">&lt;</button>
//                     <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
//                     <button className="px-3 py-1 bg-gray-200 rounded">2</button>
//                     <button className="px-3 py-1 bg-gray-200 rounded">3</button>
//                     <button className="px-3 py-1 bg-gray-200 rounded">4</button>
//                     <button className="px-3 py-1 bg-gray-200 rounded">&gt;</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BlogPosts;


import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { Image } from "antd";
import { toast } from "sonner";
import { ImageBaseUrl } from "../../../redux/blog/blogImageApi";
import { useBlogDeleteMutation, useGetAllBlogsQuery } from "../../../redux/blog/blogApi";
import Link from "antd/es/typography/Link";

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("All Category");
  const [dateFilter, setDateFilter] = useState("Last 7 Days");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 10;

  const { data, error, isLoading } = useGetAllBlogsQuery({
    page: currentPage,
    limit: postsPerPage,
    status: statusFilter !== "All Status" ? statusFilter : undefined,
    category: categoryFilter !== "All Category" ? categoryFilter : undefined,
    dateRange: dateFilter,
  });

  const [deleteBlog] = useBlogDeleteMutation(); // Initialize delete mutation

  const blogs = data?.data?.attributes || [];
  const total = data?.total || 0;

  useEffect(() => {
    if (blogs) {
      let filteredPosts = blogs;

      // Apply search filter based on title
      if (searchQuery) {
        filteredPosts = filteredPosts.filter((post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply category filter
      if (categoryFilter !== "All Category") {
        filteredPosts = filteredPosts.filter((post) => post.category === categoryFilter);
      }

      // Apply status filter
      if (statusFilter !== "All Status") {
        filteredPosts = filteredPosts.filter((post) => post.status === statusFilter);
      }

      // Apply date filter (Last 7 Days, Last 30 Days, etc.) and sort by createdAt
      const now = new Date();
      if (dateFilter === "Last 7 Days") {
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        filteredPosts = filteredPosts.filter((post) => new Date(post.createdAt) >= sevenDaysAgo);
      } else if (dateFilter === "Last 30 Days") {
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        filteredPosts = filteredPosts.filter((post) => new Date(post.createdAt) >= thirtyDaysAgo);
      }

      // Sort by createdAt date in descending order
      filteredPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setPosts(filteredPosts);
      setTotalPosts(filteredPosts.length); // Update the total posts count after filtering
    }
  }, [blogs, statusFilter, categoryFilter, dateFilter, searchQuery, currentPage]);

  const getFullImageUrl = (path) => {
    if (!path) return "/default-image.jpg"; // If `featureImage` is missing, use a default image
    if (path.startsWith("http")) return path; // If it's already a full URL, return as is
    return `${ImageBaseUrl}${path}`; // Convert relative path to absolute URL
  };

  // ✅ Function to Delete a Blog Post
  const handleDeletePost = async (postId) => {
    try {
      await deleteBlog(postId).unwrap(); // Call API to delete
      setPosts(posts.filter((post) => post.id !== postId)); // Update UI by removing deleted post
      toast.success("Blog deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search change
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) return <p>Loading blogs...</p>;
  if (error) return <p>Error fetching blogs: {error.message}</p>;

  return (
    <div className="p-6  min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Blog Post</h1>
        <Link href="/newblog">
          <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
            <FaPlus className="mr-2" /> New Post
          </button>
        </Link>
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search Post"
          className="p-2 border rounded w-full"
          value={searchQuery}
          onChange={handleSearch}
        />
        <select
          className="p-2 border rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All Status</option>
          <option>Published</option>
          <option>Draft</option>
        </select>
        <select
          className="p-2 border rounded"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option>All Category</option>
          <option>design</option>
          <option>tech</option>
          <option>job</option>
        </select>
        <select
          className="p-2 border rounded"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Post</th>
              <th className="p-2">Category</th>
              <th className="p-2">Status</th>
              <th className="p-2">Date</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length > 0 ? (
              blogs.map((post) => (
                <tr key={post.id} className="border-b hover:bg-gray-100 transition">
                  <td className="p-2 flex items-center gap-2">
                    <Image
                      src={getFullImageUrl(post.featureImage)}
                      alt="Blog"
                      width={50}
                      height={50}
                      className="rounded-lg"
                    />
                    <p className="font-medium">{post.title}</p>
                  </td>
                  <td className="p-2">{post.category}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-md font-semibold ${post.status === "Published"
                        ? "bg-green-200 text-green-700"
                        : "bg-yellow-200 text-yellow-700"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="p-2">{new Date(post?.createdAt).toLocaleDateString()}</td>
                  <td className="p-2 flex gap-2">
                    <Link href={`/blog/${post._id}`}>
                      <button className="text-blue-600">
                        <FaEdit />
                      </button>
                    </Link>
                    <button className="text-green-600">
                      <IoIosCheckmarkCircleOutline />
                    </button>
                    <button className="text-red-600" onClick={() => handleDeletePost(post._id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No blogs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span>Showing {posts.length} of {totalPosts}</span>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {Array.from({ length: Math.ceil(totalPosts / postsPerPage) }).map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(totalPosts / postsPerPage)}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPosts;



