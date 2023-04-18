import React from "react";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import axios from "axios";
import { deleteClientAccountByAdmin} from "../../axios/ClientApiCalls";

let CancelToken
let source
class DeleteClientDialog extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdKlient = this.props.params.IdOsoba

        this.state = {
            error: '',
            isLoaded: false,
            message: '',
            idKlient: paramsIdKlient
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

    removeAccount = async () => {
        const {navigate} = this.props;
        try {
            await deleteClientAccountByAdmin(this.state.idKlient, source)
            await navigate(-1, {replace: true});
        } catch (error) {
            this.setState({
                message: error.message
            })
        }
    }


    render() {
        const {t, navigate} = this.props;

        return (
            <main className="bg-gray-200 flex items-center justify-center h-screen">
            <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-2xl z-50 overflow-y-auto">
                <div className="modal-content py-9 px-5">
                    <p className="text-4xl mb-2 text-center font-bold">{t('klient.deletingClient')}</p>
                    <img src="/images/znakZapytaniaPies.png" alt={"ZnakZapytaniaPies"}/>
                    <span id="error" className="errors-text2">{this.state.message !== '' ? t('errors.' + this.state.message) : ''}
                    </span>

                    <div className="flex justify-end pt-2">
                        <button onClick={() => navigate(-1)}
                                className="shadow-lg px-4 bg-transparent p-3 rounded-lg text-blue-400 hover:bg-gray-100 hover:text-blue-400 mr-2">{t('button.back')}</button>
                        <button onClick={() => this.removeAccount()}
                                className="shadow-lg px-4 bg-blue-400 p-3 rounded-lg text-white hover:bg-blue-400">{t('klient.deleteClient')}</button>
                    </div>
                </div>
            </div>
            </main>
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

export default withTranslation()(withRouter(withNavigate(DeleteClientDialog)));