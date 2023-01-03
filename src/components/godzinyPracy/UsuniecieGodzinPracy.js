import React from "react";
import {deleteGodzinyPracy} from "../../axios/GodzinyPracyAxiosCalls";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import axios from "axios";
let CancelToken
let source
class UsuniecieGodzinPracy extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdWeterynarz = this.props.params.IdOsoba
        const dzien = this.props.params.Dzien
        console.log(paramsIdWeterynarz)
        this.state = {
            idWeterynarz: paramsIdWeterynarz,
            dzien: dzien,
            error: '',
            isLoaded: false,
            notice: '',
        }
    }
    async componentDidMount() {

        CancelToken = axios.CancelToken;
        source = CancelToken.source();
    }
    componentWillUnmount() {
        if (source) {
            source.cancel('Operation canceled by the user.');
        }
    }
    removeGodzinyPracy = async (idWeterynarz, dzien) => {
        const {navigate} = this.props;
        try {
            await deleteGodzinyPracy(idWeterynarz, dzien, source)
            await navigate(0, {replace: true});
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const {idWeterynarz, dzien} = this.state
        const {t, navigate} = this.props;

        return (
            <body class="bg-gray-200 flex items-center justify-center h-screen">

            <div class="modal-overlay absolute w-full h-full bg-gray-500 opacity-50"></div>
            <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-2xl z-50 overflow-y-auto">

                <div class="modal-content py-9 px-5">
                    <p class="text-4xl mb-2 text-center font-bold">{t('godzinyPracy.deletingWorkingHour')}</p>
                    <img src="/images/znakZapytaniaPies.png" alt={"znakZapytaniaPies"}/>

                    <div class="flex justify-end pt-2">
                        <button onClick={() => navigate(-1)}
                                class="px-4 bg-transparent p-3 rounded-lg text-blue-400 hover:bg-gray-100 hover:text-blue-400 mr-2">{t('button.back')}</button>
                        <button onClick={() => this.removeGodzinyPracy(idWeterynarz, dzien)}
                                class="shadow-xl px-4 bg-blue-400 p-3 rounded-lg text-white hover:bg-blue-400">{t('godzinyPracy.deleteWorkingHour')}</button>
                    </div>
                </div>
            </div>
            </body>
        )
    }
}

const withNavigate = Component => props => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate}/>;
};

const withRouter = WrappedComponent => props => {
    const params = useParams();

    return (
        <WrappedComponent
            {...props}
            params={params}
        />
    );
};

export default withTranslation()(withRouter(withNavigate(UsuniecieGodzinPracy)));
