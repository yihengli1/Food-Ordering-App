import { forwardRef, useImperativeHandle } from "react";

const Modal = forwardRef(function Modal({ children, onClose }, ref) {
  return (
    <dialog ref={ref} className="modal" onClose={onClose}>
      {children}
    </dialog>
  );
});

export default Modal;
