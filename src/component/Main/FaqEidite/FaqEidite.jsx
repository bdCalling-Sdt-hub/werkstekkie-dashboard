import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSingleFaqQuery, useUpdateFaqMutation,  } from "../../../redux/faq/faqApi";
import { toast } from "sonner";


const UpdateFAQ = () => {
    const { id } = useParams(); // ✅ Get ID from URL
    const navigate = useNavigate();

    // Fetch existing FAQ data
    const { data: faq, isLoading, refetch } = useSingleFaqQuery(id);
    const faqs= faq?.data
    

    // Update mutation
    const [updateFaq, { isLoading: isUpdating }] = useUpdateFaqMutation();

    // State for form fields
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    // Populate form when data loads
    useEffect(() => {
        if (faq) {
            setQuestion(faqs.question || "");
            setAnswer(faqs.answer || "");
        }
    }, [faq]);

    // Handle Update
    const handleUpdate = async () => {
      if (!question.trim() || !answer.trim()) {
          toast.error("Both fields are required!");
          return;
      }
  
      try {
          await updateFaq({ id, question, answer }).unwrap();
          toast.success("FAQ updated successfully!");
  
          // Refetch FAQ data to update UI
          refetch();
          navigate("/faq")
      } catch (error) {
          toast.error("Failed to update FAQ.");
      }
  };

    if (isLoading) return <p>Loading FAQ...</p>;

    return (
        <div className="p-6 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                <h1 className="text-xl font-semibold mb-4">Update FAQ</h1>
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
                <div className="flex justify-end">
                    <button
                        className="px-6 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
                        onClick={handleUpdate}
                        disabled={isUpdating}
                    >
                        {isUpdating ? "Updating..." : "Update"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateFAQ;
