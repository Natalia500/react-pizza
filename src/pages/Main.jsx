import React, { useEffect } from "react";
import qs from "qs";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentPage, setCategoryId } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";

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
    const category = categoryId > 0 ? "category=" + categoryId : "";
    console.log("category" + category);
    const search = searchValue ? `search = ${searchValue}` : "";
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";

    dispatch(
      fetchPizzas({
        category,
        search,
        sortBy,
        order,
        currentPage,
      })
    );

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

  const skeleton = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCatagory={onClickCatagory} />
        <Sort />
      </div>
      <h1 className="content__title">All pizzas</h1>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Error. Try again</h2>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeleton : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onClickPage={onChangePage} />
    </div>
  );
};

export default Main;
