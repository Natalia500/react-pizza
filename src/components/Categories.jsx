import React from 'react';
import { useState } from 'react';
const Categories = ({ value, onClickCatagory }) => {
  //const [pizzaIndex, setPizzaIndex] = useState(0);

  const categoriesPizza = ['All', 'Meat', 'Vegetarian', 'Grill'];

  // const activeLink = (i) => {
  //   setPizzaIndex(i);
  // };
  return (
    <div className="categories">
      <ul>
        {categoriesPizza.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onClickCatagory(index)}
            className={value == index ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
