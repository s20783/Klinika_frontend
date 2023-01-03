import React from "react";
import {deleteUsluga} from "../../axios/UslugaAxiosCalls";
import {useNavigate, useParams} from "react-router";
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";
import axios from "axios";
let CancelToken
let source
class UsuniecieUslugi extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdUsluga = this.props.params.idUsluga
        this.state = {
            idUsluga: paramsIdUsluga,
            error: '',
            isLoaded: false
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

    removeUsluga = async (idUsluga) => {
        const {navigate} = this.props;
        try {
            await deleteUsluga(idUsluga, source);
            await navigate("/uslugi", {replace: true});
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const {idUsluga} = this.state
        const {t, navigate} = this.props;

        return (
            <body class="bg-gray-200 flex items-center justify-center h-screen">
            <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">
                <div class="modal-content py-9 px-5">
                    <p class="text-4xl mb-2 text-center font-bold">{t('usluga.deletingService')}</p>
                    <img src="/images/znakZapytaniaPies.png" alt={"znakZapytaniaPies"}/>
                    <div class="flex justify-end pt-2">
                        <button onClick={() => navigate(-1)}
                                class=" px-4 bg-transparent p-3 rounded-lg text-blue-400 hover:bg-gray-100 hover:text-blue-400 mr-2">
                            {t('button.back')}
                        </button>
                        <button onClick={() => this.removeUsluga(idUsluga)}
                                class="shadow-xl px-4 bg-blue-400 p-3 rounded-lg text-white hover:bg-blue-400">
                            {t('usluga.deleteService')}
                        </button>
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

export default withTranslation()(withRouter(withNavigate(UsuniecieUslugi)));