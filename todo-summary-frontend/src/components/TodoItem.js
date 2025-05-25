import React, { useState } from 'react';

const TodoItem = ({ todo, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description || '');

  const handleEdit = () => {
    onEdit(todo.id, { 
      title: editedTitle, 
      description: editedDescription,
      completed: todo.completed
    });
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            required
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Description (optional)"
          />
          <div className="edit-actions">
            <button onClick={handleEdit}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="todo-content">
          <h3>{todo.title}</h3>
          {todo.description && <p>{todo.description}</p>}
          <div className="todo-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;