import React from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

function AfterRegister(props) {
    const {t} = useTranslation();

    return (
        <main class="bg-gray-200 flex items-center justify-center h-screen">
            <div class="modal-container bg-white w-full md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div class="modal-content py-9 px-7 text-left px-5">
                    <div class="flex justify-between items-center pb-3">
                        <p class="text-3xl font-bold text-blue-400 p-3">{t('register.accountCreated')} </p>
                    </div>
                    <p class="text-2xl text-center font-bold">{t('register.thankYou')} </p>
                    <img src="/images/gti.png" alt={"Dziekuje"}/>
                    <div class="flex justify-end pt-2">
                        <Link to="/">
                            <button
                                class="px-4 bg-transparent p-3 rounded-lg text-blue-400 hover:bg-gray-100 hover:text-blue-400 mr-2">{t('button.back')}
                            </button>
                        </Link>
                        <Link to="/login">
                            <button
                                class=" px-4 bg-blue-400 p-3 rounded-lg text-white hover:bg-blue-400">{t('login.login')}
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AfterRegister
