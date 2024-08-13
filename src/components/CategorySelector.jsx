import React from 'react';

const CategorySelector = ({ categories, selectedCategory, onCategoryChange, darkMode }) => {
  return (
    <div className="flex space-x-2 mb-4">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            selectedCategory === category
              ? darkMode
                ? 'bg-blue-600 text-white'
                : 'bg-blue-500 text-white'
              : darkMode
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition-colors duration-200`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;