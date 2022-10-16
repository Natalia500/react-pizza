import React, { useEffect, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Pagination from '../components/Pagination/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentPage, setCategoryId } from '../redux/slices/filterSlice';
import { setPizzaItems, fetchPizzas } from '../redux/slices/pizzaSlice';

const Main = ({ searchValue }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const { pizzaItems, status } = useSelector((state) => state.pizza);


  const onClickCatagory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  //(`https://63287e729a053ff9aab955d6.mockapi.io/items?category=` + categoryId)

  useEffect(() => {
    const qsString = qs.stringify({
      sortProperty: sortType,
      categoryId,
      currentPage,
    });
    navigate(`?${qsString}`);
    console.log(qsString);
  }, [categoryId, sortType, currentPage]);

  const getPizzas = async () => {
    //setIsLoading(true);

    const category = categoryId > 0 ? 'category=' + categoryId : '';
    console.log('category' + category);
    const search = searchValue ? `search = ${searchValue}` : '';
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';

    // fetch(
    //  (`https://63287e729a053ff9aab955d6.mockapi.io/items?category=` + categoryId)
    // )
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((arr) => {
    //     setPizzaItems(arr);
    //     setIsLoading(false);
    //   });

    // await axios
    //   .get(
    //     `https://63287e729a053ff9aab955d6.mockapi.io/items?page=${currentPage}&limit=3&${category}&sortBy=${sortBy}&order=${order}${search}`,
    //   )
    //   .then((res) => {
    //     setPizzaItems(res.data);
    //     setIsLoading(false);
    //   }).catch((err) =>{
    //setIsLoading(false);
    // });
    //try {
    // const { data } = await axios.get(
    //   `https://63287e729a053ff9aab955d6.mockapi.io/items?page=${currentPage}&limit=3&${category}&sortBy=${sortBy}&order=${order}${search}`,
    // );
    dispatch(
      fetchPizzas({
        category,
        search,
        sortBy,
        order,
        currentPage,
      }),
    );

    //setIsLoading(false);
    // } catch (err) {
    //   // setIsLoading(false);
    //   alert('error');
    // }
    // finally {
    //   setIsLoading(false);
    // }

    window.scroll(0, 0);
  };

  useEffect(() => {
    getPizzas();
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = pizzaItems
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCatagory={onClickCatagory} />
        {/* <Sort value={sortType} onChangeSort={(index) => setSortType(index)} /> */}
        <Sort />
      </div>
      <h1 className="content__title">All pizzas</h1>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Error. Try again</h2>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeleton : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onClickPage={onChangePage} />
    </div>
  );
};

export default Main;
