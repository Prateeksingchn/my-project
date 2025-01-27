import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, PlusCircle, X } from 'lucide-react';

const TodoList = ({ darkMode }) => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [
      { id: 1, text: 'Dentist appointment on Tuesday', completed: false },
      { id: 2, text: 'Submit report by end of the day', completed: false },
      { id: 3, text: 'Send email to boss', completed: false },
    ];
  });
  
  const [newTodo, setNewTodo] = useState('');

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    const newTodoItem = {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false
    };

    setTodos(prevTodos => [newTodoItem, ...prevTodos]);
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      }).sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
      })
    );
  };

  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  return (
    <div className={`w-full sm:w-72 border-l ${darkMode ? 'border-gray-800' : 'border-gray-200'} py-6 px-3 ${darkMode ? 'bg-[#202020]' : 'bg-white'} overflow-hidden`} style={{ overflow: 'hidden' }}>
      <div className="flex-grow overflow-auto" style={{ overflowY: 'scroll', scrollbarWidth: 'none' }}>
        <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Today's Tasks
        </h2>
        
        <form onSubmit={addTodo} className="mb-6">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a task..."
              className={`flex-1 p-2 rounded-lg text-sm ${
                darkMode 
                  ? 'bg-gray-800 text-white border-gray-700' 
                  : 'bg-gray-100 text-gray-900 border-gray-200'
              } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <button
              type="submit"
              className={`p-2 rounded-lg ${
                darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <PlusCircle size={20} className="text-blue-500" />
            </button>
          </div>
        </form>

        <div className="space-y-2">
          {todos.map(todo => (
            <div
              key={todo.id}
              className={`group flex items-center justify-between p-3 rounded-lg ${
                darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3 flex-grow">
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`transition-colors duration-200 ${
                    todo.completed ? 'text-green-500' : 'text-gray-400'
                  }`}
                >
                  {todo.completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                </button>
                <span className={`text-sm ${
                  todo.completed 
                    ? 'line-through text-gray-500' 
                    : darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity duration-200"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList; 