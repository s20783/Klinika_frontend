import {useTranslation} from "react-i18next";
import React from "react";
import TableItemDetails from "../fragments/TableItemDetails";

function PatientClientListTable(props) {
    const list = props.pacjenci
    const {t} = useTranslation();

    return (
        <div className="overflow-x-auto shadow-lg sm:rounded-lg">
            <table className="w-full text-xs sm:text-sm md:text-base text-left text-gray-700 dark:text-gray-400">
                <thead className="text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="text-center px-1 md:px-6 py-3">{t('pacjent.fields.name')}</th>
                        <th scope="col" className="text-center px-1 md:px-6 py-3">{t('pacjent.fields.species')}</th>
                        <th scope="col" className="text-center px-1 md:px-6 py-3">{t('pacjent.fields.breed')}</th>
                        <th scope="col" className="text-center px-1 md:px-6 py-3">{t('pacjent.fields.gender')}</th>
                        <th scope="col" className="text-center px-1 md:px-6 py-3"/>
                    </tr>
                    </thead>
                    <tbody>
                    {list.map(x => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600 text-center"
                            key={x.IdPacjent}>
                            <td className="px-1 md:px-6 py-2">{x.Nazwa}</td>
                            <td className="px-1 md:px-6 py-2">{x.Gatunek}</td>
                            <td className="px-1 md:px-6 py-2">{x.Rasa}</td>
                            <td className="px-1 md:px-6 py-2">{x.Plec === 'F' ? t('pacjent.gender.female') : t('pacjent.gender.male')}</td>
                            <td className="px-1 md:px-6 py-2">
                                <div className="flex justify-center">
                                    <TableItemDetails link={`/pacjenci/details/${x.IdPacjent}`}/>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
        </div>
    )
}

export default (PatientClientListTable)