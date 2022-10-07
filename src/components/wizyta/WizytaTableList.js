import {Link} from "react-router-dom";
import {isWeterynarz} from "../other/authHelper";
import {getFormattedDateWithHour} from "../other/dateFormat";

function WizytaTableList(props) {
    // const { t } = useTranslation();
    const list = props.wizyty

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex flex-row-reverse pb-3">

              <Link to="/umowWizyte">
                 <button class="shadow bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                    Umów wizytę
                 </button>
              </Link>

            </div>
            <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
                <thead className="text-s text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">Data</th>
                    <th scope="col" className="px-6 py-3">Pacjent</th>
                    <th scope="col" className="px-6 py-3">Weterynarz</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                    <th scope="col" className="px-6 py-3">Czy opłacone</th>
                    <th scope="col" className="px-6 py-3"/>
                </tr>
                </thead>
                <tbody>
                {list.map(x => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600"
                        key={x.IdWizyta}>

                        <td className="px-6 py-2">{getFormattedDateWithHour(x.Data)}</td>
                        <td className="px-6 py-2">{x.Pacjent }</td>
                        <td className="px-6 py-2">{x.Weterynarz}</td>
                        <td className="px-6 py-2">{x.Status}</td>
                        <td className="px-6 py-2">{x.CzyOplacona ? "tak" : "nie"}</td>

                        <td className="px-6 py-1">
                            <div className="list-actions">
                                <div className=" flex">
                                    <Link to={`/wizyty/${x.IdWizyta}`} className="list-actions-button-details flex-1">
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
                                    {isWeterynarz() && <Link to={`/wizyty/edit/${x.IdWizyta}`}
                                                             className="list-actions-button-details flex-1">
                                        <svg className="list-actions-button-edit flex-1"
                                             xmlns="http://www.w3.org/2000/svg"
                                             width="20" height="20" fill="#000000" viewBox="0 0 256 256">
                                            <rect className="details-icon-color" width="256" height="256"
                                                  fill="none"></rect>
                                            <path className="details-icon-color"
                                                  d="M96,216H48a8,8,0,0,1-8-8V163.31371a8,8,0,0,1,2.34315-5.65686l120-120a8,8,0,0,1,11.3137,0l44.6863,44.6863a8,8,0,0,1,0,11.3137Z"
                                                  fill="none" stroke="#000000" strokeLinecap="round"
                                                  strokeLinejoin="round" strokeWidth="16"></path>
                                            <line className="details-icon-color" x1="136" y1="64" x2="192" y2="120"
                                                  fill="none" stroke="#000000" strokeLinecap="round"
                                                  strokeLinejoin="round" strokeWidth="16"></line>
                                            <polyline className="details-icon-color"
                                                      points="216 216 96 216 40.509 160.509" fill="none"
                                                      stroke="#000000" strokeLinecap="round"
                                                      strokeLinejoin="round" strokeWidth="16"></polyline>
                                        </svg>
                                    </Link>
                                    }
                                </div>
                                {/*<li><Link to={`/leki/${lek.Idlek}`}*/}
                                {/*          className="list-actions-button-edit"*/}
                                {/*>Edytuj</Link></li>*/}
                                {/*<li><Link to={``}*/}
                                {/*          className="list-actions-button-delete"*/}
                                {/*>Usuń</Link></li>*/}
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/*<form className="form">*/}
            {/*    {isAdmin() &&*/}
            {/*    <div className="form-buttons">*/}
            {/*        <Link to={`/kluby/add`} className="form-button-submit">{t('kluby.form.list.btnLabel')}</Link>*/}
            {/*    </div>*/}
            {/*    }*/}
            {/*</form>*/}
        </div>
    )
}

export default WizytaTableList