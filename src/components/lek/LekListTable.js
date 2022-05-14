function LekListTable(props){
    // const { t } = useTranslation();
    const list = props.leki
    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>Nazwa</th>
                    <th>Ilosc</th>
                    <th>Jednostka miary</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {/*{ list.map( klub => (*/}
                {/*    <KlubyListTableRow klubData={klub} key={klub.ID_klub}/>*/}
                {/*))}*/}
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

export default LekListTable