import React from "react";
import {useTranslation} from "react-i18next";
import {addHarmonogram, updateHarmonogram} from "../../axios/ScheduleApiCalls";

function ScheduleMenu(props) {
    const {t} = useTranslation();
    let navigate = props.navigate
    let source = props.source

    const addSchedule = async () => {
        try {
            await addHarmonogram(source)
            navigate('/harmonogram/d')
        } catch (e) {
            console.log(e)
        }
    }

    const updateSchedule = async () => {
        try {
            await updateHarmonogram(source)
            navigate('/harmonogram/a')
        } catch (error ) {
            console.log(error )
        }
    }

    return (
        <>
            <div id="menu-content" className="w-full">
                <button
                    className='shadow-lg column-1 mb-4 mr-2 md:mr-0 bg-blue-400 hover:bg-white hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-3 rounded'
                    onClick={() => {
                        addSchedule()
                    }}>
                    <div className="relative h-9 w-24  xl:w-36 ">
                            <span className="absolute bottom-0 left-0  text-ml ">{t('userMenu.add')}</span>
                        <svg className="h-6 w-6 absolute bottom-0 right-0 xl:visible invisible " fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M12 4v16m8-8H4"/>
                        </svg>
                    </div>
                </button>
                <button
                    className='shadow-lg column-1 mb-4 bg-blue-400 hover:bg-white hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-3 rounded'
                    onClick={() => {
                        updateSchedule()
                    }}>
                    <div className="relative h-9 w-24  xl:w-36">
                            <span className="absolute bottom-0 left-0 text-ml ">
                                {t('userMenu.update')}</span>
                        <svg className="h-6 w-6 absolute bottom-0 right-0 xl:visible invisible" width="24" height="24"
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
        </>
    );
}

export default ScheduleMenu;