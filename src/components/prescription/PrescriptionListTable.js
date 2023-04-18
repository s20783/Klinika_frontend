import {Link} from "react-router-dom";
import {getFormattedDate} from "../../helpers/dateFormat";
import {useTranslation} from "react-i18next";
import TableItemDetails from "../fragments/TableItemDetails";
import React from "react";

function PrescriptionListTable(props) {
    const {t} = useTranslation();
    const list = props.recepty

    return (
        <div className="relative overflow-x-auto shadow-xl sm:rounded-lg">
            {list.length !== 0 &&
                <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
                    <thead className="text-s text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="text-center px-6 py-3">{t("recepta.fields.date")}</th>
                        <th scope="col" className="text-center px-6 py-3">{t("recepta.fields.patient")}</th>
                        <th scope="col" className="text-center px-6 py-3"/>
                    </tr>
                    </thead>
                    <tbody>
                    {list.map(x => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600"
                            key={x.ID_Recepta}>
                            <td className="text-center ">
                                <Link to={`/wizyty/${x.ID_Recepta}`}>
                                    <span>{x.WizytaData != null ? getFormattedDate(x.WizytaData) : "-"}</span>
                                </Link>
                            </td>
                            <td className="text-center px-6 py-2">{x.Pacjent != null ? x.Pacjent : "-"}</td>
                            <td className="px-6 py-1">
                                <div className="flex justify-center">
                                    <TableItemDetails link={`/recepta/${x.ID_Recepta}`}/>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            }
        </div>

    )
}

export default PrescriptionListTable