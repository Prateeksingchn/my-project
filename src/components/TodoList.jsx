import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Plus, Trash2 } from 'lucide-react';
import { db, auth } from '../firebase/config';
import { collection, query, where, addDoc, deleteDoc, updateDoc, doc, onSnapshot } from 'firebase/firestore';

const TodoList = ({ darkMode = true }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'todos'),
      where('userId', '==', auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todosData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTodos(todosData.sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
      }));
    });

    return () => unsubscribe();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      await addDoc(collection(db, 'todos'), {
        text: newTodo.trim(),
        completed: false,
        userId: auth.currentUser.uid,
        createdAt: new Date().toISOString()
      });
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todoRef = doc(db, 'todos', id);
      const todo = todos.find(t => t.id === id);
      await updateDoc(todoRef, {
        completed: !todo.completed
      });
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, 'todos', id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className={`w-80 min-h-screen border-l ${darkMode ? 'border-gray-800 bg-[#1a1a1a]' : 'border-gray-300 bg-gray-50'}`}>
      <div className={`py-6 px-4 ${darkMode ? 'text-white' : 'text-black'}`}>
        <h2 className="text-xl font-semibold mb-6">Quick Tasks</h2>
        
        <form onSubmit={addTodo} className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a task..."
              className={`w-full pl-4 pr-12 py-3 rounded-xl ${darkMode ? 'bg-[#2a2a2a] text-white placeholder-gray-400 border-gray-700' : 'bg-white text-black placeholder-gray-500 border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all`}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
        </form>

        <div className="space-y-3">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`group flex items-center justify-between py-3 px-1 rounded-xl transition-all ${
                todo.completed ? 'bg-opacity-50' : ''
              } ${darkMode ? 'hover:bg-[#2a2a2a]' : 'hover:bg-gray-200'}`}
            >
              <div className="flex items-center space-x-3 flex-1">
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`p-1 rounded-full transition-colors ${
                    todo.completed ? 'text-green-500' : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {todo.completed ? <CheckCircle2 size={22} /> : <Circle size={22} />}
                </button>
                <span
                  className={`text-sm transition-all ${
                    todo.completed 
                      ? 'line-through text-gray-500' 
                      : darkMode ? 'text-gray-100' : 'text-gray-800'
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;