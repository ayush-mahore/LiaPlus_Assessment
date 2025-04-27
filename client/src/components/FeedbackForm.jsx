import React, { useState } from "react";
import api from "../services/api";

// backend se dekh kr fields ke naam rakhna hai.

function FeedbackForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    feedbackText: "",
    category: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Dene ke pehle theek krna hai yeh.
    console.log("Yeh current value:", { ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("Submitting form data:", formData);

    try {
      await api.submitFeedback(formData);
      setSubmitMessage({
        type: "success",
        text: "Thank you for your feedback!",
      });
      setFormData({
        username: "",
        email: "",
        feedbackText: "",
        category: "general",
      });
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: "Failed to submit feedback. Please try again.",
      });
      console.error(
        "Submission error details:",
        error.response?.data || error.message
      );
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage({ type: "", text: "" }), 5000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Share Your Feedback
        </h2>

        {submitMessage.text && (
          <div
            className={`mb-4 p-3 rounded ${
              submitMessage.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {submitMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your email"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-700 font-medium mb-2"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="general">General Feedback</option>
              <option value="bug">Bug Report</option>
              <option value="feature">Feature Request</option>
              <option value="suggestion">Suggestion</option>
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="feedbackText"
              className="block text-gray-700 font-medium mb-2"
            >
              Feedback
            </label>
            <textarea
              id="feedbackText"
              name="feedbackText"
              value={formData.feedbackText}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Please share your thoughts..."
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                isSubmitting ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FeedbackForm;
