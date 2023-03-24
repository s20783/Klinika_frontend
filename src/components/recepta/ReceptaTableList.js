import {Link} from "react-router-dom";
import {getFormattedDate} from "../helpers/dateFormat";
import {useTranslation} from "react-i18next";

function ReceptaTableList(props) {
    const {t} = useTranslation();
    const list = props.recepty

    return (

        <div className="relative overflow-x-auto shadow-xl sm:rounded-lg ">
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
                                <div className="list-actions">
                                    <div className=" flex">
                                        <Link to={`/recepta/${x.ID_Recepta}`}
                                              className="list-actions-button-details flex-1">
                                            <svg className="list-actions-button-details flex-1"
                                                 xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                 fill="#000000" viewBox="0 0 256 256">
                                                <rect width="256" height="256" fill="none"/>
                                                <g className="details-icon-color" opacity="0.1"></g>
                                                <circle className="details-icon-color hover:white-100" cx="128" cy="128"
                                                        r="96"
                                                        fill="none" stroke="#000000" strokeLinecap="round"
                                                        strokeLinejoin="round" strokeWidth="16"></circle>
                                                <polyline className="details-icon-color"
                                                          points="120 120 128 120 128 176 136 176" fill="none"
                                                          stroke="#000000" strokeLinecap="round"
                                                          strokeLinejoin="round" strokeWidth="16"></polyline>
                                                <circle className="details-icon-color dot" cx="126" cy="84"
                                                        r="12"></circle>
                                            </svg>
                                        </Link>

                                    </div>
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

export default ReceptaTableList