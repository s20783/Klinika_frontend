import React from "react";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {deleteUrlop} from "../../axios/UrlopAxiosCalls";
import axios from "axios";
let CancelToken
let source
class UsuniecieUrlopu extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdUrlop = this.props.params.IdUrlop
        this.state = {
            idUrlop: paramsIdUrlop,
            error: '',
            isLoaded: false,
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
    removeUrlop = async (idUrlop) => {
        const {navigate} = this.props;
        try {
            await deleteUrlop(idUrlop,source)
            await navigate(-1, {replace: true});
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const {idUrlop} = this.state
        const {t, navigate} = this.props;

        return (
            <div class="bg-gray-200 flex items-center justify-center h-screen">
                <div class="modal-overlay absolute w-full h-full bg-gray-500 opacity-50"></div>
                <div
                    class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">

                    <div class="modal-content py-9 px-5">
                        <p class="text-4xl mb-2 text-center font-bold">{t('urlop.deletingVacation')}</p>
                        <img src="/images/znakZapytaniaPies.png" alt={"znakZapytaniaPies"}/>

                        <div class="flex justify-end pt-2">
                            <button onClick={() => navigate(-1)}
                                    class="px-4 bg-transparent p-3 rounded-lg text-blue-400 hover:bg-gray-100 hover:text-blue-400 mr-2">{t('button.back')}</button>
                            <button onClick={() => this.removeUrlop(idUrlop)}
                                    class=" px-4 bg-blue-400 p-3 rounded-lg text-white hover:bg-blue-400">{t('urlop.deleteVacation')}</button>
                        </div>
                    </div>
                </div>
            </div>
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

export default withTranslation()(withRouter(withNavigate(UsuniecieUrlopu)));