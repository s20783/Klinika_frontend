import {Link} from "react-router-dom";
import React from "react";
import {useNavigate} from "react-router";
import {adminMenuValues, userMenuValues, vetMenuValues} from "../../values/UserMenuValues";
import {useTranslation} from "react-i18next";
import {isAdmin, isKlient, isWeterynarz} from "../other/authHelper";

function Dropdown(props) {
    const {t} = useTranslation();
    let navigate = useNavigate();
    return (
        <ul className="bg-white rounded shadow-2xl mt-2 absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30">
            {(isKlient()) && userMenuValues.map((item) => {
                return <li>
                    <Link to={item.url} key={item.title}
                          className="px-4 py-2 block hover:bg-gray-400 no-underline hover:no-underline">
                        {t('userMenu.' + item.title)}
                    </Link>
                </li>;
            })}
            {( isWeterynarz()) && vetMenuValues.map((item) => {
                return <li>
                    <Link to={item.url} key={item.title}
                          className="px-4 py-2 block hover:bg-gray-400 no-underline hover:no-underline">
                        {t('userMenu.' + item.title)}
                    </Link>
                </li>;
            })}
            {isAdmin() && adminMenuValues.map((item) => {
                return <li>
                    <Link to={item.url} key={item.title}
                          className="px-4 py-2 block hover:bg-gray-400 no-underline hover:no-underline">
                        {t('userMenu.' + item.title)}
                    </Link>
                </li>;
            })}
            <li>
                <hr className="border-t mx-2 border-gray-400"/>
            </li>
            <li>
                <button onClick={() => {
                    props.logout();
                    navigate("/", {replace: true});
                }}
                        className="px-4 py-2 block text-red-500 font-bold hover:bg-red-500 hover:text-white no-underline hover:no-underline w-full text-left">
                    {t('userMenu.logout')}
                </button>
            </li>
        </ul>
    );
}

export default Dropdown;