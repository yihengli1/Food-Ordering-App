export default function Item({ text, number, quantityChange, id }) {
  return (
    <>
      <div className="cart-item">
        <p>{text}</p>
        <div className="cart-item-actions">
          <button onClick={() => quantityChange(0, id)}> - </button>
          <p>{number}</p>
          <button onClick={() => quantityChange(1, id)}> + </button>
        </div>
      </div>
    </>
  );
}
