
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useDeleteFaqMutation, useFaqAddMutation, useGetAllFaqQuery, useSingleFaqQuery,  } from "../../../redux/faq/faqApi";
import { toast } from "sonner";

const CreateFAQ = () => {
    // Fetch all FAQs from the backend
    const { data:faqs, refetch } = useGetAllFaqQuery();
    console.log(faqs)

    // const {data:single}=useSingleFaqQuery();
    // console.log(single)
    
    const faq = faqs?.data
    // console.log(faq)
  
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
                toast.success("faq add successfull")
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
            toast.success("faq deleted successfully")
        } catch (error) {
            console.error("Failed to delete FAQ:", error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-xl font-semibold mb-4">Create New FAQ</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <label className="block mb-2 text-gray-700">Question</label>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full p-2 border rounded-md mb-4"
                />
                <label className="block mb-2 text-gray-700">Answer</label>
                <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="w-full h-32 p-2 border rounded-md mb-4"
                ></textarea>
                <button
                    className="px-6 py-2 bg-blue-600 text-white rounded-md"
                    onClick={handleAddFAQ}
                >
                    ADD
                </button>
            </div>

            <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="p-2">Post</th>
                            <th className="p-2">Date</th>
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
                                <td className="p-2">{faq.createdDate }</td>
                                <td className="p-2 flex gap-2">
                                    <Link to={`/faq/${faq._id}`}>
                                        <button className="text-blue-600">
                                            <FaEdit />
                                        </button>
                                    </Link>
                                    <button className="text-red-600" onClick={() => handleDeleteFAQ(faq._id)}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CreateFAQ;
