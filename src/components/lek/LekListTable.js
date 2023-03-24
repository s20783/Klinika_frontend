import {Link} from "react-router-dom";
import React, {useState} from 'react';
import {useTranslation} from "react-i18next";

function LekListTable(props) {
    const {t} = useTranslation();
    const list = props.leki

    const [filteredData, setFilteredData] = useState(list);
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = list.filter((value) => {
            return value.Nazwa.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData(list);
        } else {
            setFilteredData(newFilter);
        }
    };

    return (
        <>
            <div className="flex items-center flex-row md:items-center justify-between py-4">
                <div className="relative md:mr-2">
                    <i className="absolute left-3 top-3 fa fa-search text-gray-500"/>
                    <input
                        type="text"
                        placeholder={t('other.search')}
                        className="text-xs sm:text-sm md:text-base border border-gray-300 bg-gray-50 shadow-xl rounded-lg py-2 px-4 pl-10 md:pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
                        onChange={handleFilter}
                        value={wordEntered}
                    />
                </div>
                <Link to="/dodajLek"
                      className="bg-blue-400 shadow-xl text-white py-2 px-4 font-bold rounded h-10 md:h-auto flex items-center hover:bg-gray-100 hover:text-blue-400">
                    <span className="hidden sm:inline">+ {t('lek.button.addMedicine')}</span>
                    <span className="sm:hidden text-2xl">+</span>
                </Link>
            </div>
            <div className="overflow-x-auto shadow-xl sm:rounded-lg">
                <table className="w-full text-xs sm:text-sm md:text-base text-left text-gray-700 dark:text-gray-400">
                    <thead className="text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="text-center px-1 md:px-6 py-3">{t('lek.fields.name')}</th>
                        <th scope="col" className="text-center px-1 md:px-6 py-3">{t('lek.fields.quantity')}</th>
                        <th scope="col" className="text-center px-1 md:px-6 py-3">{t('lek.fields.unitOfMeasure')}</th>
                        <th scope="col" className="text-center px-1 md:px-6 py-3">{t('lek.fields.manufacturer')}</th>
                        <th scope="col" className="text-center px-1 md:px-6 py-3"/>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredData.map(lek => (
                        <tr key={lek.IdLek}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600">
                            <td className="text-center px-1 md:px-6 py-2">{lek.Nazwa}</td>
                            <td className="text-center px-1 md:px-6 py-2">{lek.Ilosc}</td>
                            <td className="text-center px-1 md:px-6 py-2">{lek.JednostkaMiary}</td>
                            <td className="text-center px-1 md:px-6 py-2">{lek.Producent ? lek.Producent : "-"}</td>
                            <td className="text-center px-1 md:px-6 py-2">
                                <div className="text-center list-actions">
                                    <div className="flex">
                                        <Link to={`/leki/${lek.IdLek}`} className="list-actions-button-details flex-1">
                                            <svg className="list-actions-button-details flex-1"
                                                 xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                 fill="#000000" viewBox="0 0 256 256">
                                                <rect width="256" height="256" fill="none"/>
                                                <g className="details-icon-color" opacity="0.1"/>
                                                <circle className="details-icon-color hover:white-100" cx="128" cy="128"
                                                        r="96"
                                                        fill="none" stroke="#000000" stroke-linecap="round"
                                                        strokeLinejoin="round" strokeWidth="16"></circle>
                                                <polyline className="details-icon-color"
                                                          points="120 120 128 120 128 176 136 176" fill="none"
                                                          stroke="#000000" stroke-linecap="round"
                                                          strokeLinejoin="round" strokeWidth="16"></polyline>
                                                <circle className="details-icon-color dot" cx="126" cy="84"
                                                        r="12"></circle>
                                            </svg>
                                        </Link>
                                        <Link to={`/leki/edit/${lek.IdLek}`}
                                              className="list-actions-button-details flex-1">
                                            <svg className="list-actions-button-edit flex-1"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 width="20" height="20" fill="#000000" viewBox="0 0 256 256">
                                                <rect className="details-icon-color" width="256" height="256"
                                                      fill="none"/>
                                                <path className="details-icon-color"
                                                      d="M96,216H48a8,8,0,0,1-8-8V163.31371a8,8,0,0,1,2.34315-5.65686l120-120a8,8,0,0,1,11.3137,0l44.6863,44.6863a8,8,0,0,1,0,11.3137Z"
                                                      fill="none" stroke="#000000" stroke-linecap="round"
                                                      strokeLinejoin="round" strokeWidth="16"></path>
                                                <line className="details-icon-color" x1="136" y1="64" x2="192" y2="120"
                                                      fill="none" stroke="#000000" stroke-linecap="round"
                                                      strokeLinejoin="round" strokeWidth="16"></line>
                                                <polyline className="details-icon-color"
                                                          points="216 216 96 216 40.509 160.509" fill="none"
                                                          stroke="#000000" stroke-linecap="round"
                                                          strokeLinejoin="round" strokeWidth="16"></polyline>
                                            </svg>
                                        </Link>
                                        <Link to={`/leki/delete/${lek.IdLek}`}
                                              className="list-actions-button-details flex-1">
                                            <svg className="list-actions-button-delete flex-1"
                                                 xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                 fill="#000000" viewBox="0 0 256 256">

                                                <rect width="256" height="256" fill="none"/>
                                                <line className="details-icon-color" x1="215.99609" y1="56"
                                                      x2="39.99609" y2="56.00005" fill="none" stroke="#000000"
                                                      stroke-linecap="round" strokeLinejoin="round"
                                                      strokeWidth="16"></line>
                                                <line className="details-icon-color" x1="104" y1="104" x2="104" y2="168"
                                                      fill="none" stroke="#000000" stroke-linecap="round"
                                                      strokeLinejoin="round" strokeWidth="16"></line>
                                                <line className="details-icon-color" x1="152" y1="104" x2="152" y2="168"
                                                      fill="none" stroke="#000000" stroke-linecap="round"
                                                      strokeLinejoin="round" strokeWidth="16"></line>
                                                <path className="details-icon-color"
                                                      d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56" fill="none"
                                                      stroke="#000000" stroke-linecap="round"
                                                      strokeLinejoin="round" strokeWidth="16"></path>
                                                <path className="details-icon-color"
                                                      d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56"
                                                      fill="none" stroke="#000000" stroke-linecap="round"
                                                      strokeLinejoin="round" strokeWidth="16"></path>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default LekListTable