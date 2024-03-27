import React, {useEffect, useState} from 'react';
import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import {PizzaBlockSkeleton} from "../components/pizza-block/PizzaBlockSkeleton";
import {PizzaBlock} from "../components/pizza-block/PizzaBlock";

export const Home = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://64523922bce0b0a0f74001e4.mockapi.io/pizzas")
      .then(response => {
        if (response.status === 200) {
          return response.json()
        }
      })
      .then(data => {
        setIsLoading(false);
        setPizzas([...data]);
      })
      .catch(error => console.log(error))
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories/>
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? [...new Array(8)].map((_, index) => <PizzaBlockSkeleton key={index}/>) : pizzas.map((obj, index) => {
          return <PizzaBlock key={obj.title}
                             {...obj}
          />
        })}
      </div>
    </div>
  )
};