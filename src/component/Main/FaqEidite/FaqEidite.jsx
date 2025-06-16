import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Ensure this import is here
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  useSingleFaqQuery,
  useUpdateFaqMutation,
} from "../../../redux/faq/faqApi";

const UpdateFAQ = () => {
  const { id } = useParams(); // ✅ Get ID from URL
  const navigate = useNavigate();

  // Fetch the FAQ data
  const { data: faq, isLoading } = useSingleFaqQuery(id);
  const faqs = faq?.data;

  // Mutation to update FAQ
  const [updateFaq, { isLoading: isUpdating }] = useUpdateFaqMutation();

  // State for holding question and answer
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // When FAQ data is fetched, set the initial question and answer values
  useEffect(() => {
    if (faq) {
      setQuestion(faqs.question || "");
      setAnswer(faqs.answer || "");
    }
  }, [faq]);

  // Quill modules for the text editor
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, "bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };

  // Handle the update action
  const handleUpdate = async () => {
    if (!question.trim() || !answer.trim()) {
      toast.error("Both fields are required!");
      return;
    }

    try {
      await updateFaq({ id, question, answer }).unwrap();
      toast.success("FAQ updated successfully!");
      navigate("/faq");
    } catch (error) {
      toast.error("Failed to update FAQ.");
    }
  };

  // If FAQ is still loading, show loading message
  if (isLoading) return <p>Loading FAQ...</p>;

  // Quill change handler for updating the answer state
  const handleQuillChange = (value) => {
    setAnswer(value || ""); // Update the state with the editor's content
  };

  return (
    <div className="p-6 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-xl font-semibold mb-4">Update FAQ</h1>

        {/* Question input */}
        <div>
          <label className="block mb-2 text-gray-700">Question</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)} // Update question
            className="w-full p-2 border rounded-md mb-4"
          />

          {/* Answer input using ReactQuill */}
          <label className="block mb-2 text-gray-700">Answer</label>
          <ReactQuill
            value={answer || ""} // Bind the editor content to the answer state
            onChange={handleQuillChange} // Update answer on text change
            modules={modules} // Quill toolbar setup
            style={{ height: "250px" }}
          />
        </div>

        {/* Update Button */}
        <div className="flex justify-end mt-20">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
            onClick={handleUpdate} // Trigger the update
            disabled={isUpdating} // Disable when updating
          >
            {isUpdating ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateFAQ;
