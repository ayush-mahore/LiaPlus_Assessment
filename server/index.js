const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//Middleware-----------
app.use(cors());
app.use(express.json());

//Routes-------------

//add feedback
app.post("/feedback", async (req, res) => {
  try {
    const { username, useremail, feedback_text, feedback_type, timestamp } =
      req.body;

    const newFeedback = await pool.query(
      "INSERT INTO feedback (username, useremail, feedback_text, feedback_type, timestamp) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [username, useremail, feedback_text, feedback_type, timestamp]
    );

    res.status(201).json({
      message: "Feedback successfully added!",
      feedback: newFeedback.rows[0],
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Error inserting feedback",
    });
  }
});

//get feedbacks
app.get("/feedback", async (req, res) => {
  try {
    const allFeedbacks = await pool.query("SELECT * from feedback");
    res.status(200).json(allFeedbacks.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Error fetching feedbacks",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
