import React from "react";
import DodaniePacjentaForm from "./DodaniePacjentaForm";
import formMode from "../helpers/FormMode";
import {useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {getKlientList} from "../../axios/KlientAxiosCalls";

class FormularzPacjenta extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdPacjent = this.props.params.idPacjent
        const currentFormMode = paramsIdPacjent ? formMode.EDIT : formMode.NEW
        this.state = {
            klienci: [],
            idPacjent: paramsIdPacjent,
            error: '',
            isLoaded: false,
            notice: '',
            formMode: currentFormMode
        }
    }

    fetchKlientList = async () => {
        try {
            const res = await getKlientList();
            var data = await res.data

            this.setState({
                isLoaded: true,
                klienci: data
            });
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.fetchKlientList()
    }

    render() {
        const {error, isLoaded, klienci, idPacjent} = this.state
        let content;
        const {t} = this.props;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie...</p>
        } else {
            content = <DodaniePacjentaForm klienci={klienci} idPacjent={idPacjent}/>
        }

        const pageTitle = this.state.formMode === formMode.NEW ? t('pacjent.addNewPatient') : t('pacjent.editPatient')

        return (
            <div class="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3">
                <div class="w-full lg:w-1/6 lg:px-6 text-gray-800 leading-normal">
                    <p class="text-base font-bold py-2 text-xl lg:pb-6 text-gray-700">{pageTitle}</p>
                </div>
                {content}
            </div>
        )
    }
}

const withRouter = WrappedComponent => props => {
    const params = useParams();

    return (
        <WrappedComponent
            {...props}
            params={params}
        />
    );
};

export default withTranslation()(withRouter(FormularzPacjenta));