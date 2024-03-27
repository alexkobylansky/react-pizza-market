import React, {useEffect, useState} from 'react';
import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import {PizzaBlockSkeleton} from "../components/pizza-block/PizzaBlockSkeleton";
import {PizzaBlock} from "../components/pizza-block/PizzaBlock";

export const Home = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState<number>(0);

  const [sortType, setSortType] = useState<SortProperty>({
    name: "популярности",
    sortProperty: "rating"
  });

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";

    fetch(`https://64523922bce0b0a0f74001e4.mockapi.io/pizzas?${category}&sortBy=${sortBy}&order=${order}`)
      .then(response => {
        if (response.status === 200) {
          return response.json()
        }
      })
      .then(data => {
        setIsLoading(false);
        setPizzas([...data]);
      })
      .catch(error => console.log(error));
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId}
                    setCategoryId={setCategoryId}
        />
        <Sort sortType={sortType}
              setSortType={setSortType}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? [...new Array(8)].map((_, index) => <PizzaBlockSkeleton key={index}/>) : pizzas.map((obj) => {
          return <PizzaBlock key={obj.name}
                             {...obj}
          />
        })}
      </div>
    </div>
  )
};