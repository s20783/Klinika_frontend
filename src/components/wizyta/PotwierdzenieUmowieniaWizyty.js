import {Link} from "react-router-dom";
import React, {useState} from "react";


function PotwierdzenieUmowieniaWizyty(props) {
    // const { t } = useTranslation();
    const info = props.termin
    const [filteredData, setFilteredData] = useState(info);
    const [wordEntered, setWordEntered] = useState("");



    return (
        <main>
            <div className="w-full flex flex-wrap ">
                <div className="bg-white max-w-lg mx-auto p-6 md:p-8 my-10 rounded-lg shadow-2xl">
                    <div className="mx-10">
                        <div class=" py-9 px-7 text-center px-5">
                            <div class="flex justify-between items-center pb-3">
                                <p class="text-3xl font-bold text-blue-400 p-1">Dziękujemy!</p>
                            </div>

                            <p class="text-2xl">Potwierdzenie umówienia wizyty.</p>
                            <p class="text-2xl font-bold">Termin: {props.termin} </p>
                            <img src="/images/gti.png"></img>


                            <div class="flex justify-end pt-2">
                              <Link to="/mojeWizyty">
                                <button class="px-4 bg-blue-400 p-3 rounded-lg text-white hover:bg-blue-400">Powrót
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

export default PotwierdzenieUmowieniaWizyty