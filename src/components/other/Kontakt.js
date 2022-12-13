import {useTranslation} from "react-i18next";

function Kontakt() {
    const {t} = useTranslation();
    return (
        <main>
            <section className="bg-gray-100  ">
                <div className="container max-w-7xl mx-auto my-6 leading-normal bg-white border border-gray-400 border-rounded">
                    <h2 className=" mt-6 w-full my-2 mb-6 text-5xl font-black leading-tight text-center text-gray-800">
                        {t('contact.title')}
                    </h2>
                    <div className="flex flex-wrap flex-col-reverse sm:flex-row border-b">
                        <div className="w-full sm:w-1/2 p-12 mt-6">
                            <div className="align-middle">
                                 <h1 className="text-2xl text-gray-800 font-bold leading-none mb-7">
                                      MED PET
                                 </h1>
                                 <p className="text-gray-600 mb-2">
                                     Klinika Weterynaryjna</p>
                                 <p className="text-gray-600 mb-10">
                                     Al. Solidarności 24/30, Warszawa Mokotów<br/>
                                 </p>
                                 <p className="text-gray-600 mb-2">
                                     <span className="text-gray-800 font-bold">tel.: </span>
                                     222444555
                                 </p>
                                 <p className="text-gray-600 mb-4">
                                     <span className="text-gray-800 font-bold">email: </span>
                                     medpet@gmail.pl
                                 </p>
                                 <p className="text-gray-800 font-bold mb-2">
                                      Numer konta:
                                 </p>
                                 <p className="text-gray-600 mb-6">
                                     Milenium
                                     11119999050000055553333123
                                 </p>

                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 p-6 mt-6 ">
                           <img className="rounded-md shadow-2xl"
                               src="/images/budynekKliniki.jpg" alt={"przychodnia"}/>
                        </div>
                    </div>
                    <div className="align-center">
                       <h1 className="text-2xl text-center text-gray-800 font-bold mt-10 mb-6">
                            Godziny otwarcia </h1>
                       <p className=" whitespace-pre text-center text-gray-600  mb-16">
                            Poniedziałek - Piątek: 09:00–21:00 {"\n"}
                            Sobota: 09:00–21:00 {"\n"}
                            Niedziela: 09:00–21:00
                       </p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Kontakt;