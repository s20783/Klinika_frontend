import {Link, useLocation} from "react-router-dom";
import React from "react";
import {useTranslation} from "react-i18next";
import {isClient} from "../../helpers/authHelper";

function AfterCreateVisit() {
    const {t} = useTranslation();
    const location = useLocation();
    const date = location.state.Data
    return (
        <main>
            <div className="w-full flex flex-wrap ">
                <div className="bg-white max-w-lg mx-auto p-4 md:p-8 my-10 rounded-lg shadow-2xl">
                    <div className="mx-10">
                        <div className="py-10 px-8 text-center">
                            {/*<div className="flex justify-between text-center pb-3">*/}
                                <p className="text-3xl font-bold text-center text-blue-400 pb-4">{t("wizyta.thankYou")}</p>
                            {/*</div>*/}
                            <p className="text-2xl">{t("wizyta.confirmation")}</p>
                            <p className="text-2xl font-bold">{t("wizyta.date") + ": " + date.replaceAll("-", ".")}</p>
                            <img src="/images/gti.png" alt={"gti"}></img>
                            <div className="flex justify-end pt-2">
                                <Link to={isClient() ? "/mojeWizyty":"/wizyty" }>
                                    <button
                                        className="px-4 bg-blue-400 p-3 rounded-lg text-white hover:bg-blue-400">{t("button.back")}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AfterCreateVisit