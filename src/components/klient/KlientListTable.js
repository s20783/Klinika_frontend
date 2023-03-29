import {Link} from "react-router-dom";
import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {isAdmin} from "../helpers/authHelper";
import TableItemDelete from "../fragments/TableItemDelete";
import TableItemDetails from "../fragments/TableItemDetails";

function KlientListTable(props) {
    const {t} = useTranslation();
    const list = props.klienci
    const [wordEntered, setWordEntered] = useState("");
    const [currentPage, setPage] = useState(1);
    const pageCount = props.pageCount;

    const handleFilter = (event) => {
        const searchWord = event.target.value
        setWordEntered(searchWord)
        props.getData(searchWord, currentPage)
    };

    const handlePageChange = (value) => {
        const page = value
        setPage(page)
        props.getData(wordEntered, page)
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            props.getData(wordEntered, currentPage - 1)
            setPage(currentPage - 1)
        }
    };

    const handleNextPage = () => {
        if (currentPage < pageCount) {
            props.getData(wordEntered, currentPage + 1)
            setPage(currentPage + 1)
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
                        className="text-xs sm:text-sm md:text-base border border-gray-300 bg-gray-50 shadow-lg rounded-lg py-2 px-4 pl-10 md:pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
                        onChange={handleFilter}
                        value={wordEntered}
                    />
                </div>
                <Link to="/dodajKlienta"
                      className="bg-blue-400 shadow-lg text-white py-2 px-4 font-bold rounded h-10 md:h-auto flex items-center hover:bg-gray-100 hover:text-blue-400">
                    <span className="hidden sm:inline">+ {t('klient.button.addClient')}</span>
                    <span className="sm:hidden text-2xl">+</span>
                </Link>
            </div>
            <div className="overflow-x-auto shadow-lg sm:rounded-lg">
                <table className="w-full text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-400">
                    <thead className="text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="text-center px-1 md:px-6 py-3">{t('klient.fields.firstName')}</th>
                        <th scope="col" className="text-center px-1 md:px-6 py-3">{t('klient.fields.lastName')}</th>
                        <th scope="col" className="text-center px-1 md:px-6 py-3">{t('klient.fields.phoneNumber')}</th>
                        <th scope="col" className="text-center px-1 md:px-6 py-3">{t('klient.fields.email')}</th>
                        <th scope="col" className="text-center px-1 md:px-6 py-3"/>
                    </tr>
                    </thead>
                    <tbody>
                    {list.map(klient => (
                        <tr key={klient.IdOsoba}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600 text-center">
                            <td className="px-1 md:px-6 py-2">{klient.Imie}</td>
                            <td className="px-1 md:px-6 py-2">{klient.Nazwisko}</td>
                            <td className="px-1 md:px-6 py-2">{klient.NumerTelefonu}</td>
                            <td className="px-1 md:px-6 py-2">{klient.Email}</td>
                            <td className="px-1 md:px-6 py-2">
                                <div className="flex justify-center">
                                    <TableItemDetails link={`/klienci/${klient.IdOsoba}`}/>
                                    {isAdmin() &&
                                        <TableItemDelete link={`/klienci/delete/${klient.IdOsoba}`}/>
                                    }
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-8 uppercase font-semibold">
                <button
                    onClick={() => handlePreviousPage()}
                    className="bg-gray-100 text-gray-700 text-xs sm:text-sm md:text-base hover:bg-blue-400 hover:text-white px-4 py-2 md:mx-2 mx-1 rounded-r rounded-l-lg uppercase">
                    Prev
                </button>
                {Array.from({ length: pageCount }).map((x, i) => (
                    <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        disabled={i + 1 === currentPage}
                        className={i + 1 === currentPage ? 'bg-blue-400 text-white text-xs sm:text-sm md:text-base px-4 py-2 md:mx-2 mx-1 rounded' : 'bg-gray-100 text-gray-700 text-xs sm:text-sm md:text-base hover:bg-blue-400 hover:text-white px-4 py-2 md:mx-2 mx-1 rounded'}>
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => handleNextPage()}
                    className="bg-gray-100 text-gray-700 text-xs sm:text-sm md:text-base hover:bg-blue-400 hover:text-white px-4 py-2 md:mx-2 mx-1 rounded-l rounded-r-lg uppercase">
                    Next
                </button>
            </div>
        </>
    )
}

export default KlientListTable