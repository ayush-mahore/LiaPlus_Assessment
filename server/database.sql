CREATE DATABASE liaplusassesment;

CREATE TABLE feedback (
    feedback_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    useremail VARCHAR(255) NOT NULL,
    feedback_text TEXT NOT NULL,
    feedback_type VARCHAR(255) NOT NULL
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);