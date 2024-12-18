export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-xl font-semibold mb-2 text-purple-400">DynaPrice</h3>
          <p className="text-sm">Experience the future of e-commerce with dynamic pricing.</p>
        </div>
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h4 className="text-lg font-semibold mb-2 text-purple-400">Quick Links</h4>
          <ul className="text-sm">
            <li className="mb-1"><a href="#" className="hover:text-purple-400 transition-colors">About Us</a></li>
            <li className="mb-1"><a href="#" className="hover:text-purple-400 transition-colors">Contact</a></li>
            <li className="mb-1"><a href="#" className="hover:text-purple-400 transition-colors">FAQ</a></li>
            <li className="mb-1"><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="w-full md:w-1/3">
          <h4 className="text-lg font-semibold mb-2 text-purple-400">Newsletter</h4>
          <p className="text-sm mb-2">Stay updated with our latest offers and dynamic prices.</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="flex-grow bg-gray-700 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r-md transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="mt-8 text-center text-sm">
        © 2023 DynaPrice. All rights reserved.
      </div>
    </footer>
  )
}

