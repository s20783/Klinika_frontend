import {Link} from "react-router-dom";
import React from "react";
import {getFormattedDate} from "../other/dateFormat";

function LekDetailsListTable(props){
    // const { t } = useTranslation();
    const list = props.leki
    return (
        <>
            <p>Informacje o leku: <strong>{list[0].Nazwa} ({list[0].JednostkaMiary})</strong></p>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Ilosc</th>

                    <th>Data ważności</th>
                    <th>Choroby</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                { list.map( lek => (
                    <tr key={lek.IdStanLeku}>
                        <td>{lek.Ilosc}</td>
                        <td>{lek.DataWaznosci ? getFormattedDate(lek.DataWaznosci) : "-"}</td>
                        <td>{ lek.Choroby.map( c => (
                            c.Nazwa + ' '))
                        }</td>


                        <td>
                            <ul className="list-actions">
                                <li><Link to={`/leki/magazyn/${lek.IdStanLeku}`}
                                          className="list-actions-button-details"
                                >Szczegóły</Link></li>
                                <li><Link to={``}
                                          className="list-actions-button-edit"
                                >Edytuj</Link></li>
                                <li><Link to={``}
                                          className="list-actions-button-delete"
                                >Usuń</Link></li>
                            </ul>
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
        </>
    )
}

export default LekDetailsListTable