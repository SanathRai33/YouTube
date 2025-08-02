import React, { useState } from "react";
import { Button } from "./ui/button";
import "../styles/Category.module.css";

const categories = [
  "All",
  "Music",
  "Gaming",
  "News",
  "Sports",
  "Movies",
  "Education",
  "Entertainment",
  "Technology",
  "Lifestyle",
  "Travel",
  "Health",
  "Science",
  "Fashion",
  "Food",
];

function Category() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="max-w-[1200px] mx-auto relative">
      <div className="flex flex-nowrap overflow-x-auto py-2 px-4 gap-3 scroll-smooth hide-scrollbar">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "secondary"}
            onClick={() => setActiveCategory(category)}
            className="whitespace-nowrap rounded-full px-4 py-1 text-sm md:text-base md:px-5 md:py-2 flex-shrink-0"
          >
            {category}
          </Button>
        ))}
      </div>
      <div className="md:hidden absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
    </div>
  );
}

export default Category;
