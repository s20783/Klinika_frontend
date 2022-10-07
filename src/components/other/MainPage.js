import React from "react";
import {useTranslation} from "react-i18next";

function MainPage() {
    const {t} = useTranslation();
    return (
        <main>
        <section className="bg-gray-100 border-b">
            <div className="container max-w-5xl mx-auto m-0">

                <h2 className="mt-6 w-full my-2 mb-6 text-5xl font-black leading-tight text-center text-gray-800">
                    {t('mainPage.title')}
                </h2>

                <div className="w-full mb-4">
                    <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"/>
                </div>

                <div className="flex flex-wrap">
                    <div className="w-5/6 sm:w-1/2 p-6">
                        <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                            Lorem ipsum dolor sit amet
                        </h3>
                        <p className="text-gray-600 mb-8">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                            at ipsum eu nunc commodo posuere et sit amet ligula.<br/><br/>


                        </p>
                    </div>
                    <div className="w-full sm:w-1/2 p-6">
                        <img src="/images/photo1.jpg"/>
                    </div>
                </div>

                <div className="flex flex-wrap flex-col-reverse sm:flex-row">
                    <div className="w-full sm:w-1/2 p-6 mt-6">
                        <img src="/images/photo2.jpg"/>
                    </div>
                    <div className="w-full sm:w-1/2 p-6 mt-6">
                        <div className="align-middle">
                            <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                                Lorem ipsum dolor sit amet
                            </h3>
                            <p className="text-gray-600 mb-8">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                                at ipsum eu nunc commodo posuere et sit amet ligula.<br/><br/>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </main>
    )
}

export default MainPage;