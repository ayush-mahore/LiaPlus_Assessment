import axios from "axios";

const API_URL = "http://localhost:5000"; // Your backend url comes here

const api = {
  submitFeedback: async (formData) => {
    try {
      const payload = {
        username: formData.username,
        useremail: formData.email,
        feedback_text: formData.feedbackText,
        feedback_type: formData.category,
        timestamp: new Date().toISOString(),
      };

      console.log("Yeh bhej raha hu bhai:", payload);
      console.log("Chal gaya yeh !!!!!");
      const response = await axios.post(`${API_URL}/feedback`, payload);
      return response.data;
    } catch (error) {
      console.error("Error aa raha hai yaar:", error);
      throw error;
    }
  },

  getAllFeedback: async () => {
    try {
      const response = await axios.get(`${API_URL}/feedback`);
      return response.data;
    } catch (error) {
      console.error("Error fetching:", error);
      throw error;
    }
  },
};

export default api;
