import React from 'react';

const CategorySelector = ({ categories, selectedCategory, onCategoryChange, darkMode }) => {
  return (
    <div className="flex space-x-3 mb-6 overflow-x-auto py-2 px-1">
      {categories.map((category) => (
        <button
          key={category}
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
      ))}
    </div>
  );
};

export default CategorySelector;