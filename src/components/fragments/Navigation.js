import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {getImie, isAdmin, isAuthenticated, isKlient} from "../other/authHelper";
import {useNavigate, useParams} from "react-router";

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            message: ''
        }
    }

    render() {
        const { navigate } = this.props;
        const loginLogoutButton = isAuthenticated() ?
            <div className="pr-0 flex justify-end">

                {/*testowe*/}
                <div className="relative">
                    <Link to="/konto"  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-blue-400">
                        Moje konto</Link>
                    <button onClick={() => { this.props.handleLogout(); navigate("/", { replace: true }); }} className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-blue-400">
                        Wyloguj</button>
                </div>

                <div className="flex relative inline-block float-right">

                    <div className="relative text-sm">

                        <button id="userButton"
                                className="flex items-center shadow bg-blue-400 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white text-sm md:text-base font-bold py-2 px-4 rounded">

                            <div className="flex items-center text-sm">
                                <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                    <img
                                        className="object-cover w-full h-full rounded-full"
                                        src="/images/avatar_photo.jpg"
                                        alt="avatar_logo"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"/>
                                </div>
                                <div>
                                    <p className="font-semibold">{getImie()}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400"/>
                                </div>
                            </div>
                            <svg className="pl-2 h-2 fill-current text-white" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129"
                                 xmlnsXlink="http://www.w3.org/1999/xlink"
                                 enableBackground="new 0 0 129 129">
                                <g>
                                    <path
                                        d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"/>
                                </g>
                            </svg>
                        </button>

                        <div id="userMenu"
                             className="bg-white rounded shadow-md mt-2 mr-2 absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30 invisible">
                            <ul className="list-reset">
                                <li><a href="#"
                                       className="px-4 py-2 block hover:bg-gray-400 no-underline hover:no-underline">Moje
                                    konto</a></li>
                                <li><a href="#"
                                       className="px-4 py-2 block hover:bg-gray-400 no-underline hover:no-underline">Powiadomienia</a>
                                </li>
                                <li>
                                    <hr className="border-t mx-2 border-gray-400"/>
                                </li>
                                <li><a onClick={this.props.handleLogout}
                                       className="px-4 py-2 block text-blue-400 font-bold hover:bg-blue-400 hover:text-white no-underline hover:no-underline">Wyloguj
                                    się</a></li>
                            </ul>
                        </div>
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
                                    <path strokeLinecap="round" stroke-linejoin="round" stroke-width="2"
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
                                {isAdmin() && <NavLink to="/uslugi"
                                                       className="text-base px-5 font-medium text-gray-500 hover:text-blue-400">Usługi</NavLink>}
                                {isAdmin() && <NavLink to="/leki"
                                                       className="text-base px-5 font-medium text-gray-500 hover:text-blue-400">Leki</NavLink>}
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