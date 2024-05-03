export default function ErrorMsg({ text, handleError }) {
  return (
    <>
      <p> {text} </p>
      <button onClick={handleError} className="text-button modal-actions">
        Close
      </button>
    </>
  );
}
