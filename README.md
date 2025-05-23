# User Feedback System

This project is developed as part of the **SDE1 Assignment** for LiaPlusAI.  
It is a full-stack application that allows users to submit feedback and view it through an admin dashboard with filtering and sorting capabilities.

---

## Project Overview

The **User Feedback System** allows:
- Collecting user feedback through a simple React frontend form.
- Storing feedback securely in a PostgreSQL database.
- Displaying the collected feedback in a dashboard with options to **filter** and **sort** the entries.

---

## Features

- Submit feedback with **Name**, **Email**, and **Message**.
- View feedback entries in a **dashboard**.
- **Filter** and **sort** feedback based on timestamp or category.
- Responsive frontend built with **React** and **Tailwind CSS**.
- Scalable and performant **Node.js + Express.js** backend.

---

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Other Tools**: Axios for API calls

---

## Folder Structure

```bash
LiaPlus_Assessment/
├── server/
│   ├── index.js          # Main server file
│   ├── db.js             # Database connection setup
│   ├── database.sql      # SQL script to initialize the database
├── client/
│   ├── src/
│   │   ├── components/   # React components
│   │   │   ├── FeedbackDashboard.jsx
│   │   │   ├── FeedbackItem.jsx
│   │   │   ├── FeedbackForm.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   ├── services/
│   │   │   └── api.js    # API service for communication
│   │   └── App.js        # Main React component
│   └── package.json      # Frontend dependencies
└── README.md
```

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/ayush-mahore/LiaPlus_Assessment.git
cd LiaPlus_Assessment
```

---

### 2. Setup Backend (Server)

```bash
cd server
npm install
```

- Create a `.env` file inside `/server` with the following contents:

```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
```

- Start the backend server:

```bash
npm start
```

The backend server will run at `http://localhost:5000`.

---

### 3. Setup Frontend (Client)

```bash
cd client
npm install
```

- The API base URL can be set inside `src/services/api.js`.

- **Install Tailwind CSS** (if not already installed):

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- Configure `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- Add Tailwind to your `src/index.css` (or `App.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- Start the frontend app:

```bash
npm run dev
```

The frontend will run at `http://localhost:3000`.

---

## Database Setup

- Create a PostgreSQL database.
- Run the SQL script inside `server/database.sql` to set up the required tables.

Example:

```bash
psql -U your_user_name -d your_database_name -f server/database.sql
```

---

## API Endpoints

- **POST** `/feedback` → Submit user feedback
- **GET** `/feedback` → Retrieve all feedback entries (with optional filters/sorting)

---

## Architecture & Flow

1. **Frontend (React + Tailwind)**  
   → Collects user input via a form  
   → Calls backend APIs via `api.js` service  
   → Displays feedback entries on dashboard with sorting/filtering.

2. **Backend (Node.js + Express.js)**  
   → Receives feedback submissions  
   → Validates and saves data to PostgreSQL  
   → Provides APIs for fetching feedback.

3. **Database (PostgreSQL)**  
   → Stores feedback details with fields: `name`, `email`, `feedback`, `timestamp`, and `category`.

---

## Future Enhancements (Optional Features)

- Authentication for dashboard access.
- Analytics dashboard (number of suggestions, bugs, feature requests).
- Pagination and advanced search filters.
- Admin panel for managing feedback.

---

## How to Contribute

Pull requests are welcome!  
Please open an issue first to discuss major changes.

---

## License

This project is licensed under the **MIT License**.

---

# 🚀 Quick Start

```bash
git clone https://github.com/ayush-mahore/LiaPlus_Assessment.git
cd server && npm install && npm start
cd client && npm install && npm run dev
```
Open `http://localhost:3000` to view it in your browser.


## 📸 Screenshots

### 🎨 Feedback Form Page
<div style="display: flex; justify-content: space-around; flex-wrap: wrap;">
  <div style="margin: 10px; width: 45%; text-align: center;">
    <img src="client/public/screenshots/feedback-form.png" alt="Feedback Form" style="max-width: 100%; border: 2px solid #eee; border-radius: 8px;">
  </div>
</div>

### 🎨 Feedback Dashboard Page
<div style="display: flex; justify-content: space-around; flex-wrap: wrap;">
  <div style="margin: 10px; width: 45%; text-align: center;">
    <img src="client/public/screenshots/feedback-dashboard.png" alt="Feedback Dashboard" style="max-width: 100%; border: 2px solid #eee; border-radius: 8px;">
  </div>
</div>

---