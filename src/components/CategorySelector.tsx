import React from "react";

interface CategorySelectorProps {
  categories: { id: number; name: string }[];
  selectedCategory: number | null;
  onSelectCategory: (categoryId: number) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search options..."
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <div className="space-y-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`p-2 border rounded cursor-pointer ${
              selectedCategory === category.id ? "bg-gray-300 font-bold" : ""
            }`}
            onClick={() => onSelectCategory(category.id)}
          >
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
