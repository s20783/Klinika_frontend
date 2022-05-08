import React from 'react';
import {Link, NavLink} from "react-router-dom";

class Navigation extends React.Component {
    render() {
        return (
            <div className="relative bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div
                        className="flex justify-between items-center border-b-2 border-gray-400 py-6  md:justify-start md:space-x-10">
                        <div className="flex justify-start lg:w-0 lg:flex-1">
                            <Link to="/">
                                <span className="sr-only">Workflow</span>
                                <img className="h-12 w-auto sm:h-14" src="/images/logo.png" alt=""/>
                            </Link>
                        </div>
                        <div className="-mr-2 -my-2 md:hidden">
                            <button type="button"
                                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                    aria-expanded="false">
                                <span className="sr-only">Open menu</span>
                                {/*Heroicon name: outline/menu*/}
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>
                            </button>
                        </div>
                        <nav className="hidden md:flex space-x-10">
                            <div className="relative">
                                {/*Item active: "text-gray-900", Item inactive: "text-gray-500"*/}
                                <NavLink to="/" className="text-base font-medium text-gray-500 hover:text-blue-400"> Strona
                                    główna </NavLink>
                                <NavLink to="/kontakt"
                                   className="text-base px-10 font-medium text-gray-500 hover:text-blue-400"> Kontakt </NavLink>
                                {/*'Solutions' flyout menu, show/hide based on flyout menu state.*/}
                            </div>
                        </nav>
                        <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                            <Link to="/login"
                               className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-blue-400">
                                Zaloguj się </Link>
                            <Link to="/register"
                               className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-400 hover:bg-blue-400">
                                Zarejestruj się </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navigation;