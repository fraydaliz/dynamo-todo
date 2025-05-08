
import React, { useEffect, useState } from "react";
import { scanTodos, createTodo, toggleTodoCompleted, deleteTodo } from "./dynamo.js";



export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');


  useEffect(() => {
    scanTodos().then(setTodos);
  }, []);

  const handleAdd = async () => {
    if (!text.trim()) return;
    const newItem = { id: Date.now().toString(), text, completed: false };
    await createTodo(newItem);
    setTodos(prev => [...prev, newItem]);
    setText('');
  };

 

const handleToggle = async (id, completed) => {
  await toggleTodoCompleted(id, !completed);
  setTodos(prev =>
    prev.map(todo =>
      todo.id === id ? { ...todo, completed: !completed } : todo
    )
  );
};

const handleDelete = async (id) => {
  await deleteTodo(id);
  setTodos(prev => prev.filter(todo => todo.id !== id));
};

return (
  <div>
       <ul style={{display:'flex', justifyContent: 'space-evenly'}}>
        <li style={{listStyle: 'none'}}><a href="#">HOME</a></li>
        <li style={{listStyle: 'none'}}><a href="#">ABOUT</a></li>
        <li style={{listStyle: 'none'}}><a href="#">CONTACT</a></li>
    </ul>
    <h1>Todo App</h1>
    <input
      value={text}
      onChange={e => setText(e.target.value)}
      placeholder="New todo"
      style={{ marginRight: 8 }}
    />
    <button onClick={handleAdd}>Add</button>

    <ul>
  {todos.map(t => (
    <li key={t.id} style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>
      {t.text}
      <button onClick={() => handleToggle(t.id, t.completed)} style={{ marginLeft: 8 }}>
        {t.completed ? 'Undo' : 'Complete'}
      </button>
      <button onClick={() => handleDelete(t.id)} style={{ marginLeft: 4 }}>
        Delete
      </button>
    </li>
  ))}
</ul>
  </div>
);
}