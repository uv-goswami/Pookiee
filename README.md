# Interactive Media-Capture Web Application

**Live Demo:** [https://frontend-14mw.onrender.com](https://frontend-14mw.onrender.com)

A full-stack web application designed to facilitate interactive user journeys with real-time media capture, dynamic state management, and persistent data storage. This project demonstrates proficiency in **Full Stack JavaScript development**, **RESTful API design**, and **Relational Database Management**.

##  Tech Stack

* **Frontend:** React.js, Vite, HTML5 Canvas API (Media Stream)
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL (SQL)
* **Deployment:** Render (Both Client & Server)

## Key Features & Technical Highlights

* **REST API Development:** Engineered a robust Node.js/Express backend handling `POST` and `GET` requests to manage session data and user responses securely.
* **Real-Time Media Processing:** Implemented the browser's `navigator.mediaDevices` API to capture real-time video streams and utilized the HTML5 Canvas API to convert frames to Base64 data for storage.
* **Relational Database Design:** Structured normalized SQL tables in PostgreSQL to store structured session data, ensuring data integrity and fast retrieval.
* **Dynamic Frontend State:** Utilized React Hooks (`useState`, `useEffect`, `useRef`) and custom hooks for efficient state management and DOM manipulation without external UI libraries.
* **Environment Configuration:** Implemented secure environment variable management (`dotenv`) for database credentials and dynamic CORS configuration to support both local and production environments.

## Project Structure

```text
/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── backgroundImages.js
│   ├── .env
│   └── vite.config.js
└── backend/
    ├── server.js
    ├── package.json
    └── .env

##  API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| **POST** | `/api/deliver` | Receives JSON payloads (text + Base64 images) and persists them to PostgreSQL. |
| **GET** | `/responses` | Retrieves historical session data ordered by timestamp. |

##  Installation & Setup

**1. Clone the repository**

```bash
git clone [https://github.com/uv-goswami/Pookiee.git](https://github.com/uv-goswami/Pookiee.git)

```

**2. Backend Setup**

```bash
cd backend
npm install
# Create a .env file with PORT and DATABASE_URL
node server.js

```

**3. Frontend Setup**

```bash
cd frontend
npm install
# Create a .env file with VITE_API_BASE_URL
npm run dev

```
### Viewing Responses

* **Web Dashboard:** Visit `/responses` (e.g., `http://localhost:5000/responses`) to view all submissions and images.
* **Database:** Connect via **pgAdmin** to query the `responses` table directly.

##  Skills Demonstrated

* **JavaScript (ES6+):** Async/Await, Arrow functions, DOM manipulation.
* **Node.js & Backend Logic:** Middleware integration, error handling, and server-side validation.
* **SQL & Database Management:** Writing raw SQL queries (`INSERT`, `SELECT`, `CREATE TABLE`) via `node-postgres` for direct database control.
* **Object-Oriented Design:** Modularized backend logic and structured component hierarchy.

---

*This project was developed as a practical implementation of the PERN stack (Postgres, Express, React, Node) to solve real-world interactive data collection challenges.*
