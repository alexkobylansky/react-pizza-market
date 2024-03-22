import React, {useEffect, useState} from 'react';
import '../assets/scss/app.scss';
import {Header} from "./Header";
import {Categories} from "./Categories";
import {Sort} from "./Sort";
import {PizzaBlock} from "./PizzaBlock";

function App() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  useEffect(() => {
    fetch("https://file.notion.so/f/f/b3238354-86d5-4ba6-9ad7-eb01112a9acd/36ad4e93-800e-451b-9831-ae6abe1b28ef/pizzas.json?id=e934efcc-4042-481d-9d73-76f227f1696e&table=block&spaceId=b3238354-86d5-4ba6-9ad7-eb01112a9acd&expirationTimestamp=1711137600000&signature=dWtcMEb71dtmAOYJhgrSSQPMjRN3g5hxaZOoKF6CYIU&downloadName=pizzas.json")
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
