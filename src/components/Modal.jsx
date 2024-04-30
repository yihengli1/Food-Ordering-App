export default function Modal({ text }) {
  return (
    <dialog ref={ref} className="modal" open>
      <p> {text} </p>
    </dialog>
  );
}
