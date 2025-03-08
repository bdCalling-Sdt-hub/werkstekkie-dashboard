



import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useDeleteFaqMutation,
  useFaqAddMutation,
  useGetAllFaqQuery,
} from "../../../redux/faq/faqApi";
import { toast } from "sonner";

const CreateFAQ = () => {
  // Fetch all FAQs from the backend
  const { data: faqs, refetch } = useGetAllFaqQuery();
  const faq = faqs?.data;

  const [addFaq] = useFaqAddMutation();
  const [deleteFaq] = useDeleteFaqMutation();

  // Local state for form inputs
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // Function to add an FAQ
  const handleAddFAQ = async () => {
    if (question && answer) {
      try {
        await addFaq({ question, answer }).unwrap();
        setQuestion("");
        setAnswer("");
        refetch(); // Refresh FAQ list
        toast.success("FAQ added successfully!");
      } catch (error) {
        console.error("Failed to add FAQ:", error);
      }
    }
  };

  // Function to delete an FAQ
  const handleDeleteFAQ = async (id) => {
    try {
      await deleteFaq(id).unwrap();
      refetch(); // Refresh FAQ list
      toast.success("FAQ deleted successfully!");
    } catch (error) {
      console.error("Failed to delete FAQ:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6  min-h-screen">
      <h1 className="text-lg sm:text-xl font-semibold mb-4">Create New FAQ</h1>

      {/* FAQ Form */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <label className="block mb-2 text-gray-700">Question</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-2 border rounded-md mb-4 focus:ring focus:ring-blue-200"
        />

        <label className="block mb-2 text-gray-700">Answer</label>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full h-32 p-2 border rounded-md mb-4 focus:ring focus:ring-blue-200"
        ></textarea>

        <button
          className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md"
          onClick={handleAddFAQ}
        >
          ADD
        </button>
      </div>

      {/* FAQ List */}
      <div className="mt-6 bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">Post</th>
                <th className="p-2 hidden sm:table-cell">Date</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {faq?.map((faq, _id) => (
                <tr key={_id} className="border-b hover:bg-gray-100 transition">
                  <td className="p-2">
                    <p className="font-medium">{faq.question}</p>
                    <p className="text-sm text-gray-500">{faq.answer}</p>
                  </td>
                  <td className="p-2 hidden sm:table-cell">{faq.createdDate}</td>
                  <td className="p-2 flex  gap-2">
                    <Link to={`/faq/${faq._id}`}>
                      <button className="text-blue-600 p-2 rounded-md hover:bg-gray-200 transition">
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      className="text-red-600 p-2 rounded-md hover:bg-gray-200 transition"
                      onClick={() => handleDeleteFAQ(faq._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateFAQ;
