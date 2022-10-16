import React from "react";
const Categories = ({ value, onClickCatagory }) => {
  const categoriesPizza = ["All", "Meat", "Vegetarian", "Grill"];

  return (
    <div className="categories">
      <ul>
        {categoriesPizza.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onClickCatagory(index)}
            className={value == index ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
