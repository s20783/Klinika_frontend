import React from "react";
import {useTranslation} from "react-i18next";
import {addHarmonogram, updateHarmonogram} from "../../axios/HarmonogramAxiosCalls";

function HarmonogramMenu(props) {
    const {t} = useTranslation();
    let navigate = props.navigate
    let source = props.source

    const dodajHarmonogram = async () => {

        try {
            await addHarmonogram(source)
            navigate('/poHarmonogram/d')

        } catch (e) {
            console.log(e)
        }
    }

    const aktualizujHarmonogram = async () => {

        try {
            await updateHarmonogram()
            navigate('/poHarmonogram/a')

        } catch (error ) {
            console.log(error )
        }

    }

    return (
        <div className="">
            <div id="menu-content"
                 class="w-full inset-0 mt-0 z-20">

                <button
                    className='shadow-xl ml-2 column-1 mb-2 shadow bg-blue-300 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-3 rounded'
                    onClick={() => {
                        dodajHarmonogram()
                    }}>
                    <div class="relative h-9 w-24  xl:w-36 ">
                            <span className="absolute bottom-0 left-0  text-ml ">{t('userMenu.add')}
                            </span>

                        <svg className="h-6 w-6 text-white absolute bottom-0 right-0 xl:visible invisible " fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M12 4v16m8-8H4"/>
                        </svg>
                    </div>
                </button>

                <button
                    className='shadow-xl ml-2 column-1 mb-2 shadow bg-blue-300 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-3 rounded'
                    onClick={() => {
                        aktualizujHarmonogram()
                    }}>
                    <div className="relative h-9 w-24  xl:w-36">
                            <span className="absolute bottom-0 left-0 text-ml ">
                                {t('userMenu.update')}</span>
                        <svg className="h-6 w-6 text-white  absolute bottom-0 right-0 xl:visible invisible" width="24" height="24"
                             viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                             stroke-linecap="round"
                             strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z"/>
                            <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -5v5h5"/>
                            <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 5v-5h-5"/>
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    );
}


export default HarmonogramMenu;