import {useTranslation} from "react-i18next";

function Kontakt() {
    const {t} = useTranslation();
    return (
        <main>
            <section className="bg-gray-100 border-b  ">
                <div className="container max-w-5xl mx-auto m-0">
                    <h2 className=" mt-6 w-full my-2 mb-6 text-5xl font-black leading-tight text-center text-gray-800">
                        {t('contact.title')}
                    </h2>
                </div>
            </section>
        </main>
    )
}

export default Kontakt;