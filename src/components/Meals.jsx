import { add } from "three/examples/jsm/libs/tween.module.js";

export default function Meals({
  image,
  name,
  price,
  description,
  id,
  addMeal,
}) {
  return (
    <div className={"meal-item"}>
      <img src={`http://localhost:3000/${image}`}></img>
      <h3>{name}</h3>
      <p className="meal-item-price">{price}</p>
      <p className="meal-item-description">{description}</p>
      <button className="button meal-item-actions" onClick={() => addMeal(id)}>
        Add to Cart
      </button>
    </div>
  );
}
