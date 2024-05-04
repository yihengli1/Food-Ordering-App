export default function Success({ timer }) {
  timer();

  return (
    <>
      <h2>Success</h2>
      <p>Your order was submitted successfully.</p>
      <p>
        We will get back to you with more detials via email within the next few
        minutes.
      </p>
    </>
  );
}
