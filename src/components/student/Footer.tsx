export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white p-6 mt-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h2 className="text-lg font-bold">LMS</h2>
            <p>Empowering learners through accessible online education.</p>
          </div>
          <div>
            <h3 className="font-semibold">Get Help</h3>
            <ul>
              <li>Contact Us</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Programs</h3>
            <ul>
              <li>Business</li>
              <li>IT & Software</li>
              <li>Languages</li>
            </ul>
          </div>
        </div>
      </footer>
    );
  }
  