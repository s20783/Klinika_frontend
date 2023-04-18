import React, {useState} from "react";
import {getImie, isAdmin, isClient, isVet} from "../../helpers/authHelper";
import {adminMenuValues, userMenuValues, vetMenuValues} from "../../values/UserMenuValues";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router";

function DropdownMenu(props) {
    const [isOpen, setIsOpen] = useState(false);
    const {t} = useTranslation();
    let navigate = useNavigate();

    const openMenu = () => {
        setIsOpen(true);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                className="flex items-center shadow-lg bg-blue-400 hover:bg-blue-300 text-white text-base font-bold py-2 px-4 rounded"
                onMouseEnter={openMenu}
                onMouseLeave={closeMenu}>
                <div className="relative w-8 h-8 mr-3 rounded-full block">
                    <img
                        className="object-cover w-full h-full rounded-full"
                        src="/images/avatar_photo.jpg"
                        alt="avatar_logo"
                        loading="lazy"/>
                    <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"/>
                </div>
                <span className="font-semibold">{getImie()}</span>
                <svg className="pl-3 h-3 fill-current text-white" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129"
                     xmlnsXlink="http://www.w3.org/1999/xlink"
                     enableBackground="new 0 0 129 129">
                    <g>
                        <path
                            d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"/>
                    </g>
                </svg>
            </button>
            {isOpen && (
                <ul className="bg-white rounded shadow-2xl absolute right-0 min-w-full overflow-auto z-30 text-gray-600"
                    onMouseEnter={openMenu}
                    onMouseLeave={closeMenu}>
                    {(isClient()) && userMenuValues.map((item) => (
                        <li key={item.title}>
                            <Link to={item.url}
                                  className="px-4 py-2 block hover:bg-gray-400 hover:text-white font-semibold">
                                {t('userMenu.' + item.title)}
                            </Link>
                        </li>
                    ))}
                    {(isVet()) && vetMenuValues.map((item) => (
                        <li key={item.title}>
                            <Link to={item.url}
                                  className="px-4 py-2 block hover:bg-gray-400 hover:text-white font-semibold">
                                {t('userMenu.' + item.title)}
                            </Link>
                        </li>
                    ))}
                    {isAdmin() && adminMenuValues.map((item) => (
                        <li key={item.title}>
                            <Link to={item.url}
                                  className="px-4 py-2 block hover:bg-gray-400 hover:text-white font-semibold">
                                {t('userMenu.' + item.title)}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <hr className="border-t mx-2 border-gray-400"/>
                    </li>
                    <li key="logout">
                        <button
                            onClick={() => {
                            props.logout();
                            navigate("/", {replace: true});
                        }}
                                className="px-4 py-2 block text-red-500 font-bold hover:bg-red-500 hover:text-white no-underline hover:no-underline w-full text-left">
                            {t('userMenu.logout')}
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
}

export default DropdownMenu;