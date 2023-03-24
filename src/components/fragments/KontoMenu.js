import React from "react";
import {NavLink} from "react-router-dom";
import {adminMenuValues, userMenuValues, vetMenuValues} from "../../values/UserMenuValues";
import {useTranslation} from "react-i18next";
import {isAdmin, isKlient, isWeterynarz} from "../helpers/authHelper";

function KontoMenu() {
    const {t} = useTranslation();

    const showMenu = () => {
        var helpMenuDiv = document.getElementById("menu-content");
        if (helpMenuDiv.classList.contains("hidden")) {
            helpMenuDiv.classList.remove("hidden");
        } else {
            helpMenuDiv.classList.add("hidden");
        }
    }

    return (
        <div className="w-full lg:w-1/6 lg:px-6 text-xl text-gray-800 leading-normal">
            <p className="text-base font-bold py-2 lg:pb-2 text-gray-700 lg:visible ">
                Menu
            </p>
            <div className="block lg:hidden sticky inset-0">
                <button id="menu-toggle" onClick={() => {
                    showMenu()
                }}
                        className="flex w-full justify-end px-3 py-3 bg-white lg:bg-transparent border rounded border-gray-600 hover:border-blue-400 appearance-none focus:outline-none">
                    <svg className="fill-current h-3 float-right" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                </button>
            </div>
            <div id="menu-content"
                 className="w-full sticky inset-0  hidden  overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20">
                <ul className="list-reset">
                    {(isKlient()) && userMenuValues.map((item) => {
                        return <NavLink className={({isActive}) =>
                            isActive ? 'py-2 md:my-0 hover:bg-blue-100 lg:hover:bg-transparent font-bold block pl-4 align-middle text-gray-700 no-underline hover:text-blue-400 border-l-4 border-transparent lg:hover:border-gray-400 lg:border-blue-400' :
                                       'py-2 md:my-0 hover:bg-blue-100 lg:hover:bg-transparent block pl-4 align-middle text-gray-700 no-underline lg:hover:text-blue-400 hover:text-text-blue-400 border-l-4 border-transparent lg:hover:border-gray-400 '
                        } to={item.url}>
                            <span className="pb-1 md:pb-0 text-sm">{t('userMenu.' + item.title)}</span>
                        </NavLink>
                    })}
                    {(isWeterynarz()) && vetMenuValues.map((item) => {
                        return <NavLink className={({isActive}) =>
                            isActive ? 'py-2 md:my-0 hover:bg-blue-100 lg:hover:bg-transparent font-bold block pl-4 align-middle text-gray-700 no-underline hover:text-blue-400 border-l-4 border-transparent lg:hover:border-gray-400 lg:border-blue-400' :
                                'py-2 md:my-0 hover:bg-blue-100 lg:hover:bg-transparent block pl-4 align-middle text-gray-700 no-underline lg:hover:text-blue-400 hover:text-text-blue-400 border-l-4 border-transparent lg:hover:border-gray-400 '
                        } to={item.url}>
                            <div className="relative h-9 w-52">
                            <span className="absolute top-0 left-0 pb-1 md:pb-0 text-sm">{t('userMenu.' + item.title)}</span>
                            {item.title1 &&
                                <span className=" absolute bottom-0 left-0  pb-1  text-xs">{t('userMenu.' + item.title1 )} </span>
                            }
                            </div>
                        </NavLink>
                    })}

                    {isAdmin() && adminMenuValues.map((item) => {
                        return <NavLink className={({isActive}) =>
                            isActive ? 'py-2 md:my-0 hover:bg-blue-100 lg:hover:bg-transparent font-bold block pl-4 align-middle text-gray-700 no-underline hover:text-blue-400 border-l-4 border-transparent lg:hover:border-gray-400 lg:border-blue-400' :
                                'py-2 md:my-0 hover:bg-blue-100 lg:hover:bg-transparent block pl-4 align-middle text-gray-700 no-underline lg:hover:text-blue-400 hover:text-blue-400 border-l-4 border-transparent lg:hover:border-gray-400'
                        } to={item.url}>
                            <span className="pb-1 md:pb-0 text-sm">{t('userMenu.' + item.title)}</span>
                        </NavLink>
                    })}
                </ul>
            </div>
        </div>
    );
}

export default KontoMenu;