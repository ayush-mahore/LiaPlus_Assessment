import React from "react";

function FeedbackItem({ feedback }) {
  const getCategoryColor = (category) => {
    switch (category) {
      case "bug":
        return "bg-red-100 text-red-800";
      case "feature":
        return "bg-purple-100 text-purple-800";
      case "suggestion":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            {feedback.username}
          </h3>
          <p className="text-gray-600 text-sm">{feedback.useremail}</p>
          <p className="text-gray-500 text-xs">
            {formatDate(feedback.timestamp)}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
            feedback.feedback_type
          )}`}
        >
          {feedback.feedback_type.charAt(0).toUpperCase() +
            feedback.feedback_type.slice(1)}
        </span>
      </div>
      <p className="text-gray-700">{feedback.feedback_text}</p>
    </div>
  );
}

export default FeedbackItem;
