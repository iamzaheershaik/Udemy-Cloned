import { useState } from "react";
import "../Categories/Categories.css";

const Categories = ({ setFilter }) => {

  const [active, setActive] = useState(0);

  const categories = [
    "All",
    "Online",
    "Offline"
  ];

  const handleClick = (cat, index) => {
    setActive(index);
    setFilter(cat);
  };

  return (
    <>
      <div className="categories">

        {categories.map((cat, index) => (
          <button
            key={index}
            className={active === index ? "active" : ""}
            onClick={() => handleClick(cat, index)}
          >
            {cat}
          </button>
        ))}

      </div>
      <hr/>
    </>
  );
};

export default Categories;             