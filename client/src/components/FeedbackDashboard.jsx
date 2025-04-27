import React, { useState, useEffect } from "react";
import api from "../services/api";
import FeedbackItem from "./FeedbackItem";

function FeedbackDashboard() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [filteredFeedback, setFilteredFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter and sort krne ke liye
  const [filters, setFilters] = useState({
    category: "all",
    searchTerm: "",
  });
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setIsLoading(true);
        const data = await api.getAllFeedback();
        setFeedbackList(data);
        setFilteredFeedback(data);
      } catch (err) {
        setError("Failed to load feedback data. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  useEffect(() => {
    let result = [...feedbackList];

    if (filters.category !== "all") {
      result = result.filter((item) => item.feedback_type === filters.category);
    }

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.username.toLowerCase().includes(term) ||
          item.feedback_text.toLowerCase().includes(term)
      );
    }

    result.sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return new Date(b.timestamp) - new Date(a.timestamp);
        case "oldest":
          return new Date(a.timestamp) - new Date(b.timestamp);
        case "nameAsc":
          return a.username.localeCompare(b.username);
        case "nameDesc":
          return b.username.localeCompare(a.username);
        default:
          return 0;
      }
    });

    setFilteredFeedback(result);
  }, [feedbackList, filters, sortOption]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Feedback Dashboard
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      <div className="bg-white rounded-lg shadow-md p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="category"
              className="block text-gray-700 font-medium mb-2"
            >
              Filter by Category
            </label>
            <select
              id="category"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="general">General Feedback</option>
              <option value="bug">Bug Reports</option>
              <option value="feature">Feature Requests</option>
              <option value="suggestion">Suggestions</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="searchTerm"
              className="block text-gray-700 font-medium mb-2"
            >
              Search
            </label>
            <input
              type="text"
              id="searchTerm"
              name="searchTerm"
              value={filters.searchTerm}
              onChange={handleFilterChange}
              placeholder="Search by name or content"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="sortOption"
              className="block text-gray-700 font-medium mb-2"
            >
              Sort By
            </label>
            <select
              id="sortOption"
              value={sortOption}
              onChange={handleSortChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="nameAsc">Name (A-Z)</option>
              <option value="nameDesc">Name (Z-A)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredFeedback.length} of {feedbackList.length} feedback
          items
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-10">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading feedback...</p>
        </div>
      ) : filteredFeedback.length === 0 ? (
        <div className="bg-gray-100 text-center py-10 rounded-lg">
          <p className="text-gray-600">
            No feedback found matching your filters.
          </p>
        </div>
      ) : (
        <div>
          {filteredFeedback.map((feedback) => (
            <FeedbackItem key={feedback.feedback_id} feedback={feedback} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FeedbackDashboard;
