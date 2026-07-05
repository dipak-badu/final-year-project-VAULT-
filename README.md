# 💰 VAULT - Expense Tracker

VAULT is a full-stack Expense Tracker web application that helps users manage their personal finances by tracking income, expenses, budgets, and financial reports. It provides a clean dashboard with interactive charts and secure user authentication.

---

## 🚀 Features

### 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Forgot Password

### 💵 Income Management

- Add Income
- Edit Income
- Delete Income
- Search Income
- Income Summary

### 💸 Expense Management

- Add Expense
- Edit Expense
- Delete Expense
- Search Expenses
- Expense Categories

### 📊 Dashboard

- Total Income
- Total Expense
- Current Balance
- Recent Transactions

### 📈 Reports

- Monthly Income vs Expense Area Chart
- Expense Category Doughnut Chart
- Income Source Doughnut Chart

### 💰 Budget Management

- Create Budget
- Track Spending
- Remaining Balance Calculation

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Context API
- Axios
- Tailwind CSS
- React Hook Form
- Zod
- React ChartJS 2
- Recharts
- Lucide React
- Sonner (Toast Notifications)

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Bcrypt
- Zod Validation

---

# 📁 Project Structure

```
expense-tracker/
│
├── client/
│   ├── src/
│   │   ├── component/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── config/
│   │   └── data/
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── schema/
│   │   └── utils/
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/dipak-badu/final-year-project-VAULT-.git
```

Move into the project directory.

```bash
cd final-year-project-VAULT-
```

---

## Install Frontend

```bash
cd client
npm install
```

---

## Install Backend

```bash
cd ../server
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:5173
```

---

# ▶️ Running the Application

## Backend

```bash
cd server
npm run dev
```

Runs on

```
http://localhost:5000
```

---

## Frontend

```bash
cd client
npm run dev
```

Runs on

```
http://localhost:5173
```

---

# 📊 Main Modules

- Authentication
- Dashboard
- Income Management
- Expense Management
- Budget Management
- Reports
- Charts & Analytics

---

# 📷 Screenshots

You can add screenshots here after deployment.

```
Landing Page

Dashboard

Income Page

Expense Page

Budget Page

Reports Page
```

---

# 📌 Future Improvements

- Email Verification
- Password Reset via Email
- Export Reports as PDF
- Dark / Light Theme
- Recurring Transactions
- Monthly Notifications
- Mobile Responsive Improvements

# 👨‍💻 Author

**Dipak Badu**

GitHub:
https://github.com/dipak-badu

---

# 📄 License

This project is licensed under the MIT License.

---

⭐ If you found this project helpful, consider giving it a star on GitHub!
