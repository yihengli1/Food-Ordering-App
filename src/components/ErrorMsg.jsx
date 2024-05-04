export default function ErrorMsg({ text, handleError }) {
  return (
    <div>
      <p> {text} </p>
      <button onClick={handleError} className="text-button modal-actions">
        Close
      </button>
    </div>
  );
}
