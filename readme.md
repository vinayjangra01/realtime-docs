# 📝 Realtime Collaborative Text Editor (Google Docs Clone)

A real-time collaborative rich text editor built using **React + Quill + Socket.IO + MongoDB**.  
Multiple users can edit the same document simultaneously and see live updates in real-time.

---

## 🚀 Features

✅ Real-time document editing (multi-user collaboration)  
✅ Rich-text editor support using Quill (bold, italic, lists, headings, etc.)  
✅ Live updates using Socket.IO (WebSockets)  
✅ Automatic document saving (every 2 seconds)  
✅ MongoDB persistence (documents stored and loaded using document ID rooms)  
✅ Works like a simplified Google Docs clone

---

## 🛠 Tech Stack

### Frontend

- React + TypeScript
- Quill.js (Rich Text Editor)
- Socket.IO Client
- Material UI (MUI)

### Backend

- Node.js
- Express
- Socket.IO Server
- MongoDB + Mongoose

---

## 📂 Project Structure

root/
│
├── client/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── Editor.tsx
│ └── package.json
│
├── server/ # Backend server
│ ├── controller/
│ │ └── document.controller.js
│ ├── db/
│ │ └── db.js
│ ├── models/
│ │ └── Document.js
│ ├── index.js
│ └── package.json
│
└── README.md

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/vinayjangra01/realtime-docs.git
cd RealTime Docs
```

### 2️⃣ Backend Setup (Server)

Navigate to the `server` folder, install dependencies, and start the server.

```bash
cd server
npm install
npm run dev
# Server runs on http://localhost:9000
```

#### 🔑 Environment Variables

Create a `.env` file in the `server` directory and add your MongoDB connection string and port:

```env
PORT=9000
DB_URL=mongodb://localhost:27017/realtime-docs
# or your MongoDB Atlas URL
```

### 3️⃣ Frontend Setup (Client)

Open a new terminal, navigate to the `client` folder, install dependencies, and start the app.

```bash
cd client
npm install
npm run dev
# App runs on http://localhost:5173
```

---

## 🏃‍♂️ How to Run

1.  Start MongoDB (locally) or ensure your Atlas cluster is accessible.
2.  Run the **Backend**:
    ```bash
    cd server
    npm run dev
    ```
3.  Run the **Frontend**:
    ```bash
    cd client
    npm run dev
    ```
4.  Open your browser and visit `http://localhost:5173`.
5.  You will be redirected to a unique document ID (e.g., `/docs/uuid`).
6.  Copy the URL and open it in another tab or share it to collaborate in real-time!

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
