import React, {useEffect, useState} from 'react';
import '../assets/scss/app.scss';
import {Header} from "./Header";
import {Categories} from "./Categories";
import {Sort} from "./Sort";
import {PizzaBlock} from "./PizzaBlock";

function App() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  useEffect(() => {
    fetch("https://64523922bce0b0a0f74001e4.mockapi.io/pizzas")
      .then(response => {
        if (response.status === 200) {
          return response.json()
        }
      })
      .then(data => setPizzas([...data]))
      .catch(error => console.log(error))
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <Header/>
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories/>
              <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {pizzas.map((obj, index) => {
                return <PizzaBlock key={obj.title}
                                   {...obj}
                />
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
