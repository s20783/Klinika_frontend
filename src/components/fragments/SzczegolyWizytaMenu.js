import React from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

function SzczegolyWizytaMenu(props) {
    const {t} = useTranslation();
    const idWizyta=props.idWizyta

    return (
        <div className="">
            <div id="menu-content"
                 class="w-full inset-0 mt-0 z-20">
                <Link to={`/`}>
                    <button
                        className='shadow-xl ml-2 column-1 mb-2 shadow bg-blue-300 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-3 rounded'>
                        <div class="relative h-9 w-24  xl:w-36 ">
                            <span className="absolute bottom-0 left-0  text-ml ">{t('userMenu.postpone')}
                            </span>

                            <svg className="h-6 w-6 text-white absolute bottom-0 right-0 xl:visible invisible"
                                 width="24" height="24" viewBox="0 0 24 24" strokeWidth="2"
                                 stroke="currentColor" fill="none" stroke-linecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z"/>
                                <rect x="3" y="3" width="6" height="6" rx="1"/>
                                <rect x="15" y="15" width="6" height="6" rx="1"/>
                                <path d="M21 11v-3a2 2 0 0 0 -2 -2h-6l3 3m0 -6l-3 3"/>
                                <path d="M3 13v3a2 2 0 0 0 2 2h6l-3 -3m0 6l3 -3"/>
                            </svg>
                        </div>
                    </button>
                </Link>
                <Link to={`/wizyty/delete/${idWizyta}`}>
                    <button
                        className='shadow-xl ml-2 column-1 mb-2 shadow bg-red-300 hover:bg-white  hover:text-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-3 rounded'>
                        <div className="relative h-9 w-24  xl:w-36">
                            <span className="absolute bottom-0 left-0 text-ml ">
                                {t('userMenu.cancel')}</span>

                            <svg className="h-6 w-6 text-white absolute bottom-0 right-0 xl:visible invisible"
                                 viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                 strokeWidth="2" stroke-linecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                <line x1="9" y1="9" x2="15" y2="15"/>
                                <line x1="15" y1="9" x2="9" y2="15"/>
                            </svg>
                        </div>
                    </button>
                </Link>
            </div>
        </div>
    );
}


export default SzczegolyWizytaMenu;