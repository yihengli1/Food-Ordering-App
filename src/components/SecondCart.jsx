export default function SecondCart({ price }) {
  return (
    <div className="control">
      <h2 className="margin"> Checkout</h2>
      <p>Total Amount: ${price}</p>
      <div>
        <div className="control-row">
          <div>
            <label>Full Name</label>
            <input />
          </div>
        </div>
        <div className="control-row">
          <div>
            <label>E-Mail Address</label>
            <input />
          </div>
        </div>
        <div className="control-row">
          <div>
            <label>Street</label>
            <input />
          </div>
        </div>
      </div>
      <div className="control-row">
        <div>
          <label>Postal Code</label>
          <input />
        </div>
        <div>
          <label>City</label>
          <input />
        </div>
      </div>
      <div className="modal-actions">
        <button className="text-button">Close</button>
        <button className="button">Submit Order</button>
      </div>
    </div>
  );
}
