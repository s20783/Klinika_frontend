import React from "react";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import axios from "axios";
import {deleteClientAccount} from "../../axios/ClientApiCalls";

let CancelToken
let source

class DeleteAccountDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            message: ''
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

    removeKonto = async () => {
        const {navigate} = this.props;
        try {
            await deleteClientAccount(source)
            this.props.handleLogout()
            await navigate("/", {replace: true});
        } catch (error) {
            console.log(error.message)
            this.setState({
                message: error.message
            })
        }
    }


    render() {
        const {t, navigate} = this.props;

        return (
            <main className="bg-gray-200 flex items-center justify-center h-screen">
                <div
                    className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-2xl z-50 overflow-y-auto">
                    <div className="modal-content py-9 px-5">
                        <p className="text-4xl mb-2 text-center font-bold">{t('konto.deletingAccont')}</p>
                        <img src="/images/znakZapytaniaPies.png" alt={"ZnakZapytaniaPies"}/>
                        <span id="error"
                              className="errors-text2">{this.state.message !== '' ? t('errors.' + this.state.message) : ''}
                    </span>
                        <div className="flex justify-end pt-2">
                            <button onClick={() => navigate(-1)}
                                    className="px-4 bg-transparent p-3 rounded-lg text-blue-400 hover:bg-gray-100 hover:text-blue-400 mr-2">{t('button.back')}</button>
                            <button onClick={() => this.removeKonto()}
                                    className="shadow-xl px-4 bg-blue-400 p-3 rounded-lg text-white hover:bg-blue-400">{t('konto.deleteAccont')}</button>
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

export default withTranslation()(withRouter(withNavigate(DeleteAccountDialog)));