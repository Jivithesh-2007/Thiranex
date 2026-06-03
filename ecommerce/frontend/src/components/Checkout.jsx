export default function Checkout({ title, children }) {
  return (
    <section className="checkout-shell">
      <div className="container">
        <div className="section-heading">
          <h1>{title}</h1>
        </div>
        {children}
      </div>
    </section>
  );
}
