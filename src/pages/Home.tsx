import React, {useEffect, useRef, useState} from 'react';
import {Categories} from "../components/Categories";
import {Sort, sortList} from "../components/Sort";
import {PizzaBlockSkeleton} from "../components/pizza-block/PizzaBlockSkeleton";
import {PizzaBlock} from "../components/pizza-block/PizzaBlock";
import {SearchContext} from "../components/App";

import axios from "axios";

import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setFilters} from "../redux/slices/filterSlice";
import {RootState} from "../redux/store";
import {useNavigate} from "react-router-dom";
import qs from 'qs';

interface HomeProps {

}

export const Home: React.FC<HomeProps> = () => {
  // @ts-ignore
  const {searchValue} = React.useContext(SearchContext);

  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const {categoryId, sort} = useSelector((state: RootState) => state.filterSlice);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    if (isMounted.current) {
      const querystring = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId: categoryId,
      });
      navigate(`?${querystring}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, searchValue]);

  useEffect(() => {
    window.scrollTo(0,0);
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)

      dispatch(setFilters({
        ...params,
        sort
      }));
      isSearch.current = true;
    }
  }, []);

  const fetchPizzas = () => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sort.sortProperty.replace("-", "");
    const search = searchValue ? `search=${searchValue}` : "";
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";

    axios.get(`https://64523922bce0b0a0f74001e4.mockapi.io/pizzas?${category}&sortBy=${sortBy}&${search}&order=${order}`)
      .then(response => {
        setPizzas(response.data);
        setIsLoading(false);
      })
  };

  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId}
                    setCategoryId={(id: number) => onChangeCategory(id)}
        />
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ?
          [...new Array(8)].map((_, index) => <PizzaBlockSkeleton key={index}/>) :
          pizzas.map((obj) => {
          return <PizzaBlock key={obj.name}
                             {...obj}
          />
        })}
      </div>
    </div>
  )
};