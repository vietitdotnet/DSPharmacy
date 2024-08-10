import { Component } from "react";
import { Link } from "react-router-dom";

export default class NavbarTop extends Component {
  render() {
    return (
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center font-semibold whitespace-nowrap dark:text-white">
              Nhà Thuốc Dân Sinh
            </span>
          </Link>
          <div className="flex items-center space-x-1 md:order-2 md:space-x-2 rtl:space-x-reverse">
            <a
              href="/login.html"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Đăng nhập
            </a>
            <button
              data-collapse-toggle="mega-menu-icons"
              type="button"
              className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mega-menu-icons"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            id="mega-menu-icons"
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          >
            <ul className="flex flex-col font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
              <li>
                <Link
                  to="/"
                  className="block px-3 py-2 text-blue-600 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-blue-500 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                  aria-current="page"
                >
                  Trang chủ
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="block px-3 py-2 text-blue-600 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-blue-500 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                  aria-current="page"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block px-3 py-2 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Chỉ đường
                </Link>
              </li>
              <li>
                <Link
                  to="/manager/products"
                  className="block px-3 py-2 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Manager
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
