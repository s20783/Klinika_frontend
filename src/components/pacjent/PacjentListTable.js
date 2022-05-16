import {Link} from "react-router-dom";

function PacjentListTable(props){
    // const { t } = useTranslation();
    const list = props.pacjenci
    return (
        <>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Nazwa</th>
                    <th>Gatunek</th>
                    <th>Rasa</th>
                    <th>Właściciel</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                { list.map( x => (
                    <tr key={x.IdPacjent}>
                        <td>{x.Nazwa}</td>
                        <td>{x.Gatunek}</td>
                        <td>{x.Rasa}</td>
                        <td><Link to={`/klienci/${x.IdOsoba}`} className="underline font-semibold">{x.Wlasciciel}</Link></td>
                        <td>
                            <ul className="list-actions">
                                <li><Link to={`/pacjenci/${x.IdPacjent}`}
                                          className="list-actions-button-details"
                                >Szczegóły</Link></li>
                                {/*<li><Link to={`/leki/${lek.Idlek}`}*/}
                                {/*          className="list-actions-button-edit"*/}
                                {/*>Edytuj</Link></li>*/}
                                {/*<li><Link to={``}*/}
                                {/*          className="list-actions-button-delete"*/}
                                {/*>Usuń</Link></li>*/}
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

export default PacjentListTable