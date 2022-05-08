import {Link} from "react-router-dom";
import React from "react";

function Footer(){
    return(
        <footer className="p-4 mt- bg-white rounded-lg shadow md:px-6 md:py-0 dark:bg-gray-800">
            <hr className="my-2  border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4"/>
            <div className="  max-w-lg mx-auto flex justify-center mb-2  text-black">
                <Link to="#" className="hover:text-blue-400">PL</Link>
                <span className="mx-3">•</span>
                <Link to="#" className="hover:text-blue-400 mb-0">EN</Link>
                <span className="mx-3">•</span>
                <Link to="#" className="hover:text-blue-400 mb-0">UA</Link>
            </div>
            <div className="sm:flex sm:items-center sm:justify-between">
                <a href="https://flowbite.com" className="flex items-center mb-4 sm:mb-0">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"> </span>
                </a>
                <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        <Link to="#" className="mr-4 hover:underline md:mr-6 ">Regulamin</Link>
                    </li>
                    <li>
                        <Link to="#" className="mr-4 hover:underline md:mr-6">Polityka prywatności</Link>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;