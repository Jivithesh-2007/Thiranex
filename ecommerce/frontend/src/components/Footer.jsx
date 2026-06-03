export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container footer-grid">
        <div>
          <h3>ShopHub</h3>
          <p>Modern shopping made simple with fast checkout and secure Stripe payments.</p>
        </div>
        <div id="about">
          <h4>About</h4>
          <p>Built with React, Node.js, MongoDB, and Stripe test mode for a production-style e-commerce experience.</p>
        </div>
        <div>
          <h4>Contact</h4>
          <p>support@shophub.local</p>
          <p>Mon-Fri, 9am-6pm</p>
        </div>
      </div>
    </footer>
  );
}
