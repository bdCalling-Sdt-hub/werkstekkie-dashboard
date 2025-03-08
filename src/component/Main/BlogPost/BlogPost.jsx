


// import { useState, useEffect } from "react";
// import { Table, Button, Input, Select, Image, message } from "antd";
// import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
// import { IoIosCheckmarkCircleOutline } from "react-icons/io";
// import { toast } from "sonner";
// import { ImageBaseUrl } from "../../../redux/blog/blogImageApi";
// import { useBlogDeleteMutation, useGetAllBlogsQuery } from "../../../redux/blog/blogApi";
// import { Link, useNavigate } from "react-router-dom";



// const { Option } = Select;

// const BlogPosts = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All Status");
//   const [categoryFilter, setCategoryFilter] = useState("All Category");
//   const [dateFilter, setDateFilter] = useState("Last 7 Days");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [postsPerPage, setPostsPerPage] = useState(10);

//   const navigate = useNavigate();

//   const { data, error, isLoading } = useGetAllBlogsQuery({
//     page: currentPage,
//     limit: postsPerPage,
//     status: statusFilter !== "All Status" ? statusFilter : undefined,
//     category: categoryFilter !== "All Category" ? categoryFilter : undefined,
//     dateRange: dateFilter,
//   });

//   const [deleteBlog] = useBlogDeleteMutation();
//   const blogs = data?.data?.attributes || [];
//   const total = data?.total || 0;

//   const getFullImageUrl = (path) => {
//     if (!path) return "/default-image.jpg";
//     if (path.startsWith("http")) return path;
//     return `${ImageBaseUrl}${path}`;
//   };

//   const handleDeletePost = async (postId) => {
//     try {
//       await deleteBlog(postId).unwrap();
//       message.success("Blog deleted successfully");
//     } catch (error) {
//       message.error("Error deleting blog post");
//     }
//   };

//   // **Ant Design Table Columns**
//   const columns = [
//     {
//       title: "Post",
//       dataIndex: "title",
//       key: "title",
//       render: (text, record) => (
//         <div className="flex items-center gap-2">
//           <Image width={50} height={50} src={getFullImageUrl(record.featureImage)} alt="Blog" />
//           <span>{text}</span>
//         </div>
//       ),
//     },
//     {
//       title: "Category",
//       dataIndex: "category",
//       key: "category",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (status) => (
//         <span
//           className={`px-2 py-1 text-xs rounded-md font-semibold ${status === "Published" ? "bg-green-200 text-green-700" : "bg-yellow-200 text-yellow-700"
//             }`}
//         >
//           {status}
//         </span>
//       ),
//     },
//     {
//       title: "Date",
//       dataIndex: "createdAt",
//       key: "createdAt",
//       render: (createdAt) => new Date(createdAt).toLocaleDateString(),
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_, record) => (
//         <div className="flex gap-2">
//           <Link href={`/blog/${record._id}`}>
//             <Button onClick={() => navigate(`/blog/${record._id}`)} type="link" icon={<FaEdit className="text-blue-600" />} />

//           </Link>
//           <Button type="link" icon={<IoIosCheckmarkCircleOutline className="text-green-600" />} />
//           <Button
//             type="link"
//             icon={<FaTrash className="text-red-600" />}
//             onClick={() => handleDeletePost(record._id)}
//           />
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="p-6 min-h-screen">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-xl font-semibold">Blog Post</h1>

//         <Button onClick={() => navigate("/newblog")} type="primary" icon={<FaPlus />} className="flex items-center">
//           New Post
//         </Button>

//       </div>

//       {/* Filters and Search */}
//       <div className="md:flex gap-4 mb-4 sm:hidden space-y-5 md:space-y-0">
//         <Input
//           placeholder="Search Post"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full"
//         />
//         <Select value={statusFilter} onChange={setStatusFilter} className="lg:w-40">
//           <Option>All Status</Option>
//           <Option>Published</Option>
//           <Option>Draft</Option>
//         </Select>
//         <Select value={categoryFilter} onChange={setCategoryFilter} className="lg:w-40">
//           <Option>All Category</Option>
//           <Option>design</Option>
//           <Option>tech</Option>
//           <Option>job</Option>
//         </Select>
//         <Select value={dateFilter} onChange={setDateFilter} className="lg:w-40 ">
//           <Option>Last 7 Days</Option>
//           <Option>Last 30 Days</Option>
//         </Select>
//       </div>

//       {/* Ant Design Table */}
//       <Table
//         columns={columns}
//         dataSource={blogs}
//         loading={isLoading}
//         pagination={{
//           current: currentPage,
//           pageSize: postsPerPage,
//           total: total,
//           onChange: (page) => setCurrentPage(page),
//         }}
//         scroll={{ x: 850 }}
//         rowKey="_id"
//       />
//     </div>
//   );
// };

// export default BlogPosts;






import { useState } from "react";
import { Table, Button, Input, Select, Image, message } from "antd";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useBlogDeleteMutation, useGetAllBlogsQuery } from "../../../redux/blog/blogApi";
import { Link, useNavigate } from "react-router-dom";
import { ImageBaseUrl } from "../../../redux/blog/blogImageApi";

const { Option } = Select;

const BlogPosts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("All Category");
  const [dateFilter, setDateFilter] = useState("Last 7 Days");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const navigate = useNavigate();

  const { data, error, isLoading } = useGetAllBlogsQuery({
    page: currentPage,
    limit: postsPerPage,
    status: statusFilter !== "All Status" ? statusFilter : undefined,
    category: categoryFilter !== "All Category" ? categoryFilter : undefined,
    dateRange: dateFilter,
  });

  const [deleteBlog] = useBlogDeleteMutation();
  const blogs = data?.data?.attributes || [];
  const total = data?.total || 0;

  const getFullImageUrl = (path) => {
    if (!path) return "/default-image.jpg";
    if (path.startsWith("http")) return path;
    return `${ImageBaseUrl}${path}`;
  };

  const handleDeletePost = async (postId) => {
    try {
      await deleteBlog(postId).unwrap();
      message.success("Blog deleted successfully");
    } catch (error) {
      message.error("Error deleting blog post");
    }
  };

  // **Filtering and Searching**
  const filteredBlogs = blogs
    .filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) // Search by title
    )
    .filter((blog) =>
      statusFilter === "All Status" || blog.status === statusFilter // Filter by status
    )
    .filter((blog) =>
      categoryFilter === "All Category" || blog.category === categoryFilter // Filter by category
    );

  // **Ant Design Table Columns with Sorting**
  const columns = [
    {
      title: "Post",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title), // Sort alphabetically
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <Image width={50} height={50} src={getFullImageUrl(record.featureImage)} alt="Blog" />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: (a, b) => a.category.localeCompare(b.category), // Sort alphabetically
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Published", value: "Published" },
        { text: "Draft", value: "Draft" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <span
          className={`px-2 py-1 text-xs rounded-md font-semibold ${
            status === "Published" ? "bg-green-200 text-green-700" : "bg-yellow-200 text-yellow-700"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt), // Sort by date
      render: (createdAt) => new Date(createdAt).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Link to={`/blog/${record._id}`}>
            <Button type="link" icon={<FaEdit className="text-blue-600" />} />
          </Link>
          <Button type="link" icon={<IoIosCheckmarkCircleOutline className="text-green-600" />} />
          <Button
            type="link"
            icon={<FaTrash className="text-red-600" />}
            onClick={() => handleDeletePost(record._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Blog Post</h1>

        <Button onClick={() => navigate("/newblog")} type="primary" icon={<FaPlus />} className="flex items-center">
          New Post
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="md:flex gap-4 mb-4 sm:hidden space-y-5 md:space-y-0">
        <Input
          placeholder="Search Post"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
        <Select value={statusFilter} onChange={setStatusFilter} className="lg:w-40">
          <Option value="All Status">All Status</Option>
          <Option value="Published">Published</Option>
          <Option value="Draft">Draft</Option>
        </Select>
        <Select value={categoryFilter} onChange={setCategoryFilter} className="lg:w-40">
          <Option value="All Category">All Category</Option>
          <Option value="design">Design</Option>
          <Option value="tech">Tech</Option>
          <Option value="job">Job</Option>
        </Select>
        <Select value={dateFilter} onChange={setDateFilter} className="lg:w-40">
          <Option value="Last 7 Days">Last 7 Days</Option>
          <Option value="Last 30 Days">Last 30 Days</Option>
        </Select>
      </div>

      {/* Ant Design Table */}
      <Table
        columns={columns}
        dataSource={filteredBlogs}
        loading={isLoading}
        pagination={{
          current: currentPage,
          pageSize: postsPerPage,
          total: total,
          onChange: (page) => setCurrentPage(page),
        }}
        scroll={{ x: 850 }}
        rowKey="_id"
      />
    </div>
  );
};

export default BlogPosts;

