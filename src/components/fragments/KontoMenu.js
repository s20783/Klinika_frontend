import React from "react";
import {NavLink} from "react-router-dom";
import {userMenuValues} from "../../values/UserMenuValues";

function KontoMenu() {
    return (
        <div className="w-full lg:w-1/6 lg:px-6 text-xl text-gray-800 leading-normal">
            <p className="text-base font-bold py-2 lg:pb-6 text-gray-700">Menu</p>
            <div className="block lg:hidden sticky inset-0">
                <button id="menu-toggle"
                        className="flex w-full justify-end px-3 py-3 bg-white lg:bg-transparent border rounded border-gray-600 hover:border-purple-500 appearance-none focus:outline-none">
                    <svg className="fill-current h-3 float-right" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                </button>
            </div>

            <div
                class="w-full sticky inset-0 hidden h-64 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20"
                id="menu-content">
                <ul className="list-reset">
                    {userMenuValues.map((item) => {
                        return <NavLink className={({isActive}) =>
                            isActive ? 'py-2 md:my-0 hover:bg-blue-400 lg:hover:bg-transparent font-bold block pl-4 align-middle text-gray-700 no-underline hover:text-blue-400 border-l-4 border-transparent lg:hover:border-gray-400 lg:border-blue-400' :
                                'py-2 md:my-0 hover:bg-blue-400 lg:hover:bg-transparent block pl-4 align-middle text-gray-700 no-underline hover:text-blue-400 border-l-4 border-transparent lg:hover:border-gray-400'
                        } to={item.url}>
                            <span className="pb-1 md:pb-0 text-sm">{item.title}</span>
                        </NavLink>
                    })}

                </ul>
            </div>
        </div>
    );
}

export default KontoMenu;