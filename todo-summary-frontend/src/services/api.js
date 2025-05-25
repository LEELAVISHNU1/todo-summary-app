import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8084/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// GET all todos
export const getTodos = () => API.get('/todos');

// POST new todo
export const addTodo = (todo) => API.post('/todos', todo);

// PUT update todo
export const updateTodo = (id, todo) => API.put(`/todos/${id}`, todo);

// DELETE todo
export const deleteTodo = (id) => API.delete(`/todos/${id}`);

// POST summarize todos
export const summarizeTodos = () => API.post('/todos/summarize');

// Error handling interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else {
      console.error('API Error:', error.message);
    }
    return Promise.reject(error);
  }
);