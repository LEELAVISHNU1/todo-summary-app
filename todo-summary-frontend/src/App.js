import React, { useState, useEffect } from 'react';
import { getTodos, addTodo, deleteTodo, updateTodo } from './services/api';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import SummaryButton from './components/SummaryButton';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      setTodos(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Failed to load todos. Please try again.');
    }
  };

  const handleAddTodo = async (todo) => {
    try {
      const response = await addTodo(todo);
      setTodos([...todos, response.data]);
      setError(null);
    } catch (error) {
      console.error('Error adding todo:', error);
      setError('Failed to add todo. Please try again.');
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
      setError(null);
    } catch (error) {
      console.error('Error deleting todo:', error);
      setError('Failed to delete todo. Please try again.');
    }
  };

  const handleEditTodo = async (id, updatedTodo) => {
    try {
      const response = await updateTodo(id, updatedTodo);
      setTodos(todos.map(todo => todo.id === id ? response.data : todo));
      setError(null);
    } catch (error) {
      console.error('Error editing todo:', error);
      setError('Failed to update todo. Please try again.');
    }
  };

  return (
    <div className="app">
      <h1 className="title">📝 Todo Summary Assistant</h1>
      {error && <div className="error-message">{error}</div>}
      <AddTodo onAdd={handleAddTodo} />
      <TodoList todos={todos} onDelete={handleDeleteTodo} onEdit={handleEditTodo} />
      <SummaryButton />
    </div>
  );
}

export default App;
