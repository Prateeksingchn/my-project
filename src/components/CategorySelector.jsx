import React, { useState, useEffect } from 'react';
import { Plus, X, Trash2 } from 'lucide-react';
import { db, auth } from '../firebase/config';
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc, getDocs } from 'firebase/firestore';

const PREDEFINED_CATEGORIES = [
  'Personal',
  'Work',
  'Study',
  'Shopping',
  'Health',
  'Travel',
  'Ideas',
  'Projects'
];

const CategorySelector = ({ selectedCategory, onCategoryChange, darkMode }) => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [customCategories, setCustomCategories] = useState([]);
  const [categoryDocs, setCategoryDocs] = useState({}); // Store document IDs
  
  // Combine predefined and custom categories
  const allCategories = ['All', ...PREDEFINED_CATEGORIES, ...customCategories];

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'categories'),
      where('userId', '==', auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const categoriesData = {};
      const customCats = [];
      snapshot.docs.forEach(doc => {
        categoriesData[doc.data().name] = doc.id;
        customCats.push(doc.data().name);
      });
      setCategoryDocs(categoriesData);
      setCustomCategories(customCats);
    });

    return () => unsubscribe();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    
    if (allCategories.includes(newCategory.trim())) {
      alert('This category already exists!');
      return;
    }

    try {
      await addDoc(collection(db, 'categories'), {
        name: newCategory.trim(),
        userId: auth.currentUser.uid,
        createdAt: new Date().toISOString()
      });
      setNewCategory('');
      setShowAddCategory(false);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleDeleteCategory = async (categoryName) => {
    if (PREDEFINED_CATEGORIES.includes(categoryName)) {
      alert('Cannot delete predefined categories');
      return;
    }

    try {
      const docId = categoryDocs[categoryName];
      if (docId) {
        await deleteDoc(doc(db, 'categories', docId));
        
        // Update notes with this category to 'Uncategorized'
        const notesQuery = query(
          collection(db, 'notes'),
          where('userId', '==', auth.currentUser.uid),
          where('category', '==', categoryName)
        );
        
        const notesSnapshot = await getDocs(notesQuery);
        notesSnapshot.docs.forEach(async (noteDoc) => {
          await updateDoc(doc(db, 'notes', noteDoc.id), {
            category: 'Uncategorized'
          });
        });
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 py-2 px-1">
        {allCategories.map((category) => (
          <div key={category} className="flex items-center">
            <button
              className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                selectedCategory === category
                  ? darkMode
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : darkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </button>
            {!PREDEFINED_CATEGORIES.includes(category) && category !== 'All' && (
              <button
                onClick={() => handleDeleteCategory(category)}
                className={`ml-1 p-1.5 rounded-full ${
                  darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-600'
                }`}
                title="Delete category"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        ))}
        <button
          onClick={() => setShowAddCategory(true)}
          className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
            darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          <Plus size={18} />
        </button>
      </div>

      {showAddCategory && (
        <form onSubmit={handleAddCategory} className="mt-3 flex space-x-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name..."
            className={`flex-1 p-2 rounded-lg ${
              darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            autoFocus
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setShowAddCategory(false)}
            className="p-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
          >
            <X size={20} />
          </button>
        </form>
      )}
    </div>
  );
};

export default CategorySelector;