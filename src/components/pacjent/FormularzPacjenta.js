import React from "react";
import {getKlientList} from "../../api/KlientApiCalls";
import DodaniePacjentaForm from "./DodaniePacjentaForm";
import formMode from "../helpers/FormMode";
import {useParams} from "react-router";
import {withTranslation} from "react-i18next";

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

    fetchClientList = () => {
        const {navigate} = this.props;
        getKlientList()
            .then(res => {
                if (res.status === 401) {
                    console.log('Potrzebny aktualny access token')
                    navigate("/", {replace: true});
                }
                return res.json()
            })
            .then(
                (data) => {

                    this.setState({
                        isLoaded: true,
                        klienci: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }


    componentDidMount() {
        this.fetchClientList()

    }

    render() {
        const {error, isLoaded, klienci, idPacjent} = this.state
        let content;
        const {t} = this.props;
        console.log(idPacjent)

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie...</p>
        } else {
            //content = <p>Ładowanie zakończone</p>
            content = <DodaniePacjentaForm klienci={klienci} idPacjent={idPacjent}/>
        }

        const pageTitle = this.state.formMode === formMode.NEW ? t('pacjent.addNewPatient') : t('pacjent.editPatient')

        return (
            <div class="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3">
                <div class="w-full lg:w-1/6 lg:px-6 text-gray-800 leading-normal">
                    <p class="text-base font-bold py-2 text-xl lg:pb-6 text-gray-700">{pageTitle}</p>
                    <div class="block lg:hidden sticky inset-0">
                        <button id="menu-toggle"
                                class="flex w-full justify-end px-3 py-3 bg-white lg:bg-transparent border rounded border-gray-600 hover:border-purple-500 appearance-none focus:outline-none">
                            <svg class="fill-current h-3 float-right" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                        </button>
                    </div>
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