export default function Footer() {
  return (
    <footer className="bg-white text-black">
      {/* Newsletter section */}
      <div className="bg-black text-white py-10 text-center px-4">
        <h2 className="text-xl font-semibold mb-2">BE THE FIRST</h2>
        <p className="mb-4 text-sm sm:text-base">
          New arrivals. Exclusive previews. First access to sales. Sign up to stay in the know.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
          <input
            type="email"
            placeholder="Enter your email address"
            className="px-4 py-2 text-black w-full sm:w-80 border border-white"
          />
          <button className="px-6 py-2 border border-white hover:bg-white hover:text-black transition">
            SIGN UP
          </button>
        </div>
      </div>

      {/* Info section */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 text-sm">
        <div>
          <h3 className="font-semibold mb-2">NEED HELP?</h3>
          <p>📞 +92 21 111 112 111</p>
          <p>(Mon - Sat: 9:30am - 10:00pm | Sun: 11am - 8pm)</p>
          <p>📧 <a href="mailto:eshop@junaidjamshed.com" className="underline">eshop@junaidjamshed.com</a></p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">CATALOGUE</h3>
          {/* Empty or add links */}
        </div>

        <div>
          <h3 className="font-semibold mb-2">CUSTOMER SERVICE</h3>
          <ul className="space-y-1">
            <li>Contact Us</li>
            <li>Delivery & Orders</li>
            <li>Returns & Exchanges</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Track My Order</li>
            <li>Payment Guide</li>
            <li>Fabric Glossary</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">COMPANY</h3>
          <ul className="space-y-1">
            <li>About Us</li>
            <li>Careers</li>
            <li>Store Addresses</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">FOLLOW US</h3>
          <div className="flex space-x-3 mt-2">
            <i className="fab fa-facebook-f" />
            <i className="fab fa-twitter" />
            <i className="fab fa-youtube" />
            <i className="fab fa-instagram" />
            <i className="fab fa-pinterest" />
            <i className="fab fa-linkedin-in" />
          </div>
        </div>
      </div>

      {/* Payments and Security badges */}
    </footer>
  );
}
