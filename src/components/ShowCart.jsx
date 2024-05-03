import Item from "./Item";

export default function ShowCart() {
  return (
    <div className="cart">
      <h2> Your Cart</h2>
      <ul>
        <Item />
      </ul>
    </div>
  );
}
