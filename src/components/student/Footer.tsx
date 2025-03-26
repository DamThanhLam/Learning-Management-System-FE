// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-12 py-10 mt-8">
      <div className="grid grid-cols-4 gap-8">
        <div>
          <h3 className="font-semibold text-lg mb-3">Byway</h3>
          <p className="text-sm leading-relaxed">
            Empowering learners through accessible and engaging online education.
            <br />
            Byway is a leading online learning platform dedicated to providing high-quality,
            flexible, and affordable educational experiences.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Get Help</h4>
          <ul className="text-sm space-y-1">
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/articles">Latest Articles</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Programs</h4>
          <ul className="text-sm space-y-1">
            <li><a href="/programs/design">Art & Design</a></li>
            <li><a href="/programs/business">Business</a></li>
            <li><a href="/programs/it">IT & Software</a></li>
            <li><a href="/programs/languages">Languages</a></li>
            <li><a href="/programs/programming">Programming</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact Us</h4>
          <p className="text-sm">123 Main Street, Anytown, CA 12345</p>
          <p className="text-sm">Tel: +1 (123) 456-7890</p>
          <p className="text-sm">Mail: bywayedu@webkul.in</p>
          <div className="flex gap-3 mt-3 text-lg">
            <span>📘</span>
            <span>🟢</span>
            <span>🔍</span>
            <span>❌</span>
            <span>🟡</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
