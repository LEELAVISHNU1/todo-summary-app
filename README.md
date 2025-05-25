# 📝 Todo Summary Assistant

A full-stack application that allows users to manage their personal to-do list, generate a summary using an actual LLM (e.g., OpenAI), and send it to a Slack channel via a webhook integration.

---

## 🚀 Features

### ✅ Frontend (React)
- Create, edit, and delete to-do items
- View the list of current todos
- Button to summarize pending to-dos
- Real-time success/failure status for Slack operations

### ✅ Backend (Java Spring Boot)
- RESTful API for managing todos
- Endpoint to generate LLM-based summary and send it to Slack

### ✅ LLM Integration
- Integrates with a real LLM API (e.g., OpenAI GPT) to summarize to-do items

### ✅ Slack Integration
- Sends the generated summary to a Slack channel using Slack Incoming Webhooks

---

## 🛠 Tech Stack

| Layer      | Technology          |
|------------|---------------------|
| Frontend   | React               |
| Backend    | Java (Spring Boot)  |
| Database   | Supabase (PostgreSQL) |
| LLM API    | OpenAI              |
| Slack      | Incoming Webhooks   |
| Hosting    | (Optional) Vercel / Netlify / Firebase Hosting |

---

## 🧾 API Endpoints (Spring Boot Backend)

| Method | Endpoint        | Description                        |
|--------|------------------|------------------------------------|
| GET    | `/todos`         | Fetch all to-dos                   |
| POST   | `/todos`         | Add a new to-do item               |
| DELETE | `/todos/{id}`    | Delete a to-do by ID               |
| POST   | `/summarize`     | Generate and post summary to Slack |

---

## 🧪 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/todo-summary-assistant.git
cd todo-summary-assistant
