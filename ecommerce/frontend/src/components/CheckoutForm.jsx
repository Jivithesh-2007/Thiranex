export default function CheckoutForm({ step, shipping, setShipping, shippingMethod, setShippingMethod, onContinue }) {
  if (step === 1) {
    return (
      <form className="checkout-card" onSubmit={(e) => { e.preventDefault(); onContinue(2); }}>
        <h3>Shipping Information</h3>
        <div className="form-grid">
          {['firstName', 'lastName', 'email', 'phone', 'street', 'city', 'state', 'postalCode', 'country'].map((field) => (
            <label key={field}>
              {field}
              <input required name={field} value={shipping[field] || ''} onChange={(e) => setShipping((current) => ({ ...current, [field]: e.target.value }))} />
            </label>
          ))}
        </div>
        <label className="checkbox-row">
          <input type="checkbox" checked={shipping.saveAddress || false} onChange={(e) => setShipping((current) => ({ ...current, saveAddress: e.target.checked }))} /> Save address
        </label>
        <button className="btn btn-primary">Continue to Shipping</button>
      </form>
    );
  }

  if (step === 2) {
    return (
      <div className="checkout-card">
        <h3>Shipping Method</h3>
        {[
          ['standard', 'Standard Shipping (5-7 days) - $5'],
          ['express', 'Express Shipping (2-3 days) - $15'],
          ['overnight', 'Overnight Shipping (1 day) - $25'],
        ].map(([value, label]) => (
          <label key={value} className="radio-row">
            <input type="radio" name="shippingMethod" checked={shippingMethod === value} onChange={() => setShippingMethod(value)} /> {label}
          </label>
        ))}
        <button className="btn btn-primary" onClick={() => onContinue(3)}>Continue to Payment</button>
      </div>
    );
  }

  return null;
}
