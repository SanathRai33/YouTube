import React, {useState} from 'react'
import { Button } from './ui/button';

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
    // "Fashion",
    // "Food",
]

function Category() {

    const [ activeCategory, setActiveCategory ] = useState("All");

  return (
    <div className="flex flex-nowrap overflow-x-auto p-4 gap-2.5 bg-white scroll-smooth hide-scrollbar">
        {categories.map((category) => (
            <Button key={category} variant={activeCategory === category? "default":"secondary"} onClick={()=> setActiveCategory(category)} className='whitespace-nowrap'>{category}</Button>))}
    </div>
  )
}

export default Category
