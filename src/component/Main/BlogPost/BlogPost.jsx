import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import Link from "antd/es/typography/Link";
import { useBlogDeleteMutation, useGetAllBlogsQuery } from "../../../redux/blog/blogApi";
import { Image } from "antd";
import { ImageBaseUrl } from "../../../redux/blog/blogImageApi";
import { toast } from "sonner";

const BlogPosts = () => {
    const { data, error, isLoading } = useGetAllBlogsQuery({ page: 1, limit: 10 });
    const [deleteBlog] = useBlogDeleteMutation(); // Initialize delete mutation

    console.log("API Response:", data); // Log to check the structure

    const blogs = data?.data?.attributes || [];

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (blogs) {
            setPosts(blogs);
        }
    }, [data]);

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
            toast.success("blog delete successfully")
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    if (isLoading) return <p>Loading blogs...</p>;
    if (error) return <p>Error fetching blogs: {error.message}</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold">Blog Post</h1>
                <Link href="/newblog">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
                        <FaPlus className="mr-2" /> New Post
                    </button>
                </Link>
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
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <tr key={post.id} className="border-b hover:bg-gray-100 transition">
                                    <td className="p-2 flex items-center gap-2">
                                        <Image
                                            src={getFullImageUrl(post.featureImage)} // Ensure correct path
                                            alt="Blog Image"
                                            width={50}
                                            height={50}
                                            className="rounded-lg w-full"
                                        />
                                        <div>
                                            <p className="font-medium">{post.title}</p>
                                            <p className="text-sm text-gray-500">{post.category}</p>
                                        </div>
                                    </td>
                                    <td className="p-2">{post.category}</td>
                                    <td className="p-2">
                                        <span
                                            className={`px-2 py-1 text-xs rounded-md font-semibold ${
                                                post.status === "Published"
                                                    ? "bg-green-200 text-green-700"
                                                    : "bg-yellow-200 text-yellow-700"
                                            }`}
                                        >
                                            {post.status}
                                        </span>
                                    </td>
                                    <td className="p-2">{post.updatedAt}</td>
                                    <td className="p-2 flex gap-2">
                                        <Link href={`/blog/${post._id}`}>
                                            <button className="text-blue-600">
                                                <FaEdit />
                                            </button>
                                        </Link>
                                        <button className="text-green-600">
                                            <IoIosCheckmarkCircleOutline />
                                        </button>
                                        <button
                                            className="text-red-600"
                                            onClick={() => handleDeletePost(post._id)}
                                        >
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
        </div>
    );
};

export default BlogPosts;
