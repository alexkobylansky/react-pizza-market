import React, {useState} from 'react';

const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]

export const Categories = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => {
          return <li
            key={item}
            onClick={() => setActiveIndex(index)}
            className={activeIndex === index ? "active" : ""}>{item}</li>
        })}
      </ul>
    </div>
  )
};