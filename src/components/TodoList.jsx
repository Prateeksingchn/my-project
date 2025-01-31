import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, PlusCircle, X } from 'lucide-react';
import { db, auth } from '../firebase/config';
import { collection, query, where, addDoc, deleteDoc, updateDoc, doc, onSnapshot } from 'firebase/firestore';

const TodoList = ({ darkMode }) => {
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
    <div className={`w-80 border-l ${darkMode ? 'bg-[#202020] border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
      <div className="p-4">
        <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Quick Tasks</h2>
        
        <form onSubmit={addTodo} className="mb-4 flex">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a task..."
            className={`flex-1 p-2 rounded-lg mr-2 ${
              darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
          />
          <button
            type="submit"
            className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            <PlusCircle size={20} />
          </button>
        </form>

        <div className="space-y-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center justify-between p-2 rounded-lg ${
                darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`p-1 rounded-full ${todo.completed ? 'text-green-500' : 'text-gray-400'}`}
                >
                  {todo.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                </button>
                <span
                  className={`${
                    todo.completed ? 'line-through text-gray-500' : darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="p-1 rounded-full hover:bg-gray-200 text-gray-500"
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