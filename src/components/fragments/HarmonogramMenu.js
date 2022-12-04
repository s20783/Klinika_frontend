import React from "react";
import {harmonogramMenuValues} from "../../values/UserMenuValues";
import {useTranslation} from "react-i18next";
import {addHarmonogram, updateHarmonogram} from "../../axios/HarmonogramAxiosCalls";
import {useNavigate} from "react-router";

function SzczegolyVetMenu(props) {
    const {t} = useTranslation();
    const {navigate} =useNavigate()
    const showMenu = () => {
        var helpMenuDiv = document.getElementById("menu-content");

        if (helpMenuDiv.classList.contains("hidden")) {
            helpMenuDiv.classList.remove("hidden");
        } else {
            helpMenuDiv.classList.add("hidden");
        }
    }

    const dodajHarmonogram = async () => {
        try {
            await addHarmonogram()
            navigate(0, {replace: true});
        } catch (error) {
            console.log(error)
        }
    }

    const aktualizujHarmonogram = async () => {
        try {
            await updateHarmonogram()
            navigate(0, {replace: true});
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="">
            <div class="block lg:hidden sticky inset-0">
                <button id="menu-toggle" onClick={() => {
                    showMenu()
                }}
                        class="flex w-full justify-end px-3 py-3 bg-white lg:bg-transparent border rounded border-gray-600  appearance-none focus:outline-none">
                    <svg class="fill-current h-3 float-right" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                </button>
            </div>
            <div id="menu-content"
                 class="w-full sticky inset-0  hidden  overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20">
                { harmonogramMenuValues.map((item) => {
                    return <button className= 'column-1 py-2 md:my-0  lg:hover:bg-transparent block pl-4 align-middle text-gray-700 no-underline hover:text-blue-400 border-l-4 border-transparent lg:hover:border-gray-400 lg:border-blue-400'
                        onClick={() => {item.function()}}>
                        <div class="relative h-10 w-52">
                            <span className="absolute top-0 left-0 pb-1 md:pb-0 text-sm ">{t('userMenu.' + item.title )} </span>
                        </div>
                    </button>
                })}
            </div>
        </div>
    );
}

export default SzczegolyVetMenu;