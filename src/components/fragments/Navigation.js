import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {isAdmin, isAuthenticated, isKlient, isWeterynarz} from "../helpers/authHelper";
import {useNavigate, useParams} from "react-router";
import DropdownMenu from "./DropdownMenu";
import {withTranslation} from "react-i18next";

class Navigation extends React.Component {
    render() {
        const {t} = this.props;
        const loginLogoutButton = isAuthenticated() ?
            <div className="pr-0 flex justify-end">
                <div className="flex relative inline-block float-right">
                    <div className="relative text-sm">
                        <DropdownMenu logout={this.props.handleLogout}/>
                    </div>
                </div>
            </div>
            :
            <>
                <div className="pr-0 flex justify-end">
                    <div className="flex relative inline-block float-right">
                        <div className="relative text-sm">
                            <Link to="/login"
                                  className="whitespace-nowrap sm:ml-1 ml-8 text-base font-medium text-gray-500 hover:text-blue-400">
                                {t('navigation.login')}
                            </Link>
                            <Link to="/register"
                                  className="shadow-xl sm:ml-8 ml-1 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-400 hover:bg-blue-400">
                                {t('navigation.register')}
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        return (
            <div className="bg-white">
                <div
                    className="md:flex md:justify-between md:items-center border-b-2 border-gray-400 px-1 md:px-4 md:pb-6 md:pt-6 lg:justify-start lg:space-x-5">
                    <div className="flex justify-center md:justify-start xl:flex-auto my-2">
                        <Link to="/">
                            <img
                                className="md:shadow-xl"
                                src="/images/logo.png"
                                alt="logo"
                            />
                        </Link>
                    </div>
                    <nav className="flex flex-wrap flex justify-center flex-auto text-base text-gray-600 my-2">
                        <NavLink to="/"
                                 className="px-2 md:px-4 lg:px-5 font-medium hover:text-blue-400">
                            {t('navigation.mainPage')}</NavLink>
                        <NavLink to="/kontakt"
                                 className="px-2 md:px-4 lg:px-5 font-medium hover:text-blue-400">
                            {t('navigation.contact')}</NavLink>
                        {isKlient() &&
                            <NavLink to="/umowWizyte"
                                     className="px-2 md:px-4 lg:px-5 font-medium hover:text-blue-400">
                                {t('navigation.appointment')}</NavLink>}
                        {(isAdmin() || isWeterynarz()) &&
                            <NavLink to="/klienci"
                                     className="px-2 md:px-4 lg:px-5 font-medium hover:text-blue-400">
                                {t('navigation.clients')}</NavLink>}
                        {isAdmin() &&
                            <NavLink to="/weterynarze"
                                     className="px-2 md:px-4 lg:px-5 font-medium hover:text-blue-400">
                                {t('navigation.vets')}</NavLink>}
                        {(isAdmin() || isWeterynarz()) &&
                            <NavLink to="/pacjenci"
                                     className="px-2 md:px-4 lg:px-5 font-medium hover:text-blue-400">
                                {t('navigation.patients')}</NavLink>}
                        {(isAdmin() || isWeterynarz()) &&
                            <NavLink to="/wizyty"
                                     className="px-2 md:px-4 lg:px-5 font-medium hover:text-blue-400">
                                {t('navigation.visits')}</NavLink>}
                        {(isAdmin() || isWeterynarz()) &&
                            <NavLink to="/uslugi"
                                     className="px-2 md:px-4 lg:px-5 font-medium hover:text-blue-400">
                                {t('navigation.services')}</NavLink>}
                        {(isAdmin() || isWeterynarz()) &&
                            <NavLink to="/choroby"
                                     className="px-2 md:px-4 lg:px-5 font-medium hover:text-blue-400">
                                {t('navigation.disease')}</NavLink>}
                        {(isAdmin() || isWeterynarz()) &&
                            <NavLink to="/leki"
                                     className="px-2 md:px-4 lg:px-5 font-medium hover:text-blue-400">
                                {t('navigation.medicines')}</NavLink>}
                        {(isAdmin() || isWeterynarz()) &&
                            <NavLink to="/szczepionki"
                                     className="px-2 md:px-4 lg:px-5 font-medium hover:text-blue-400">
                                {t('navigation.vaccinations')}</NavLink>}
                        {isAdmin() &&
                            <NavLink to="/harmonogram"
                                     className="px-2 md:px-4 lg:px-5 font-medium hover:text-blue-400">
                                {t('navigation.schedule')}</NavLink>}
                        {isAdmin() &&
                            <NavLink to="/specjalizacje"
                                     className="px-2 md:px-4 lg:px-5 font-medium hover:text-blue-400">
                                {t('navigation.specializations')}</NavLink>}
                    </nav>
                    <div className="items-center justify-end flex-auto my-2">
                        {loginLogoutButton}
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
    return <Component {...props} navigate={navigate}/>;
};

export default withTranslation()(withNavigate(withRouter(Navigation)));