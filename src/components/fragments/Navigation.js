import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {isAdmin, isAuthenticated, isKlient} from "../other/authHelper";
import {useNavigate, useParams} from "react-router";
import Menu from "../other/Menu";

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            message: ''
        }
    }

    render() {
        const loginLogoutButton = isAuthenticated() ?
            <div className="pr-0 flex justify-end">

                <div className="flex relative inline-block float-right">

                    <div className="relative text-sm">
                        <Menu logout={this.props.handleLogout} />
                    </div>
                </div>
            </div>
            :
            <>
            <Link to="/login" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-blue-400">Zaloguj się </Link>
            <Link to="/register" className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-400 hover:bg-blue-400">Zarejestruj się </Link>
            </>
        return (
            <div className="relative bg-white">
                <div className="p-4 mt- md:px-6 md:py-0">
                    <div
                        className="flex justify-between items-center border-b-2 border-gray-400 py-6  md:justify-start md:space-x-10">
                        <div className="flex justify-start lg:w-0 lg:flex-1">
                            <Link to="/">
                                <span className="sr-only">Workflow</span>
                                <img
                                    className="h-12 w-auto sm:h-14"
                                    src="/images/logo.png"
                                    alt="logo"
                                />
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
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>
                            </button>
                        </div>
                        <nav className="hidden md:flex space-x-10">
                            <div className="relative">
                                {/*Item active: "text-gray-900", Item inactive: "text-gray-500"*/}
                                <NavLink to="/"
                                         className="text-base px-5 font-medium text-gray-500 hover:text-blue-400">Strona
                                    główna</NavLink>
                                <NavLink to="/kontakt"
                                         className="text-base px-5 font-medium text-gray-500 hover:text-blue-400">Kontakt</NavLink>
                                {isKlient() && <NavLink to="/umowWizyte"
                                                               className="text-base px-5 font-medium text-gray-500 hover:text-blue-400">Umów wizytę</NavLink>}
                                {isAdmin() && <NavLink to="/klienci"
                                                        className="text-base px-5 font-medium text-gray-500 hover:text-blue-400">Klienci</NavLink>}
                                {isAdmin() && <NavLink to="/weterynarze"
                                                        className="text-base px-5 font-medium text-gray-500 hover:text-blue-400">Weterynarze</NavLink>}
                                {isAdmin() && <NavLink to="/pacjenci"
                                                       className="text-base px-5 font-medium text-gray-500 hover:text-blue-400">Pacjenci</NavLink>}
                                {isAdmin() && <NavLink to="/uslugi"
                                                       className="text-base px-5 font-medium text-gray-500 hover:text-blue-400">Usługi</NavLink>}
                                {isAdmin() && <NavLink to="/leki"
                                                       className="text-base px-5 font-medium text-gray-500 hover:text-blue-400">Leki</NavLink>}
                                {/*{isAdmin() && <NavLink to="/szczepienia"*/}
                                {/*                       className="text-base px-5 font-medium text-gray-500 hover:text-blue-400">Szczepienia</NavLink>}*/}
                                {/*'Solutions' flyout menu, show/hide based on flyout menu state.*/}
                            </div>
                        </nav>
                        <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                            {loginLogoutButton}
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}


const withRouter = WrappedComponent => props => {
    const params = useParams();
    return (
        <WrappedComponent
            {...props}
            params={params}
        />
    );
};

const withNavigate = Component => props => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
};

export default withNavigate(withRouter(Navigation));