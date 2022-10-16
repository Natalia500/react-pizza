import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setSort } from "../redux/slices/filterSlice";

const list = [
  { name: "popularity", sortProperty: "rating" },
  { name: "price: High to Low", sortProperty: "price" },
  { name: "price: Low to High", sortProperty: "-price" },
  { name: "title (z-a)", sortProperty: "title" },
  { name: "title (a-z)", sortProperty: "-title" },
];

const Sort = () => {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filter.sort);
  const sortRef = useRef();

  const [openSort, setOpenSort] = useState(false);

  const toggleListSort = (obj) => {
    dispatch(setSort(obj));
    setOpenSort(false);
  };

  useEffect(() => {
    const clickOutside = (event) => {
      if (!event.path.includes(sortRef.current)) {
        setOpenSort(false);
      }
    };
    document.body.addEventListener("click", clickOutside);

    return () => {
      document.body.removeEventListener("click", clickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className=".sort">
      <div className="sort__label">
        <b>Sort by:</b>
        <span onClick={() => setOpenSort(!openSort)}>{sort.name}</span>
      </div>
      {openSort && (
        <div className="sort__popup">
          <ul>
            {list.map((obj) => (
              <li
                onClick={() => toggleListSort(obj)}
                className={
                  sort.sortProperty == obj.sortProperty ? "active" : ""
                }
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
