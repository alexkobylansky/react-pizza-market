import React from 'react';

const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

interface CategoriesProps {
  categoryId: number;
  setCategoryId: (id: number) => void;
}

export const Categories: React.FC<CategoriesProps> = ({
                                                        categoryId,
                                                        setCategoryId
                                                      }) => {


  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => {
          return <li
            key={item}
            onClick={() => setCategoryId(index)}
            className={categoryId === index ? "active" : ""}>{item}</li>
        })}
      </ul>
    </div>
  )
};