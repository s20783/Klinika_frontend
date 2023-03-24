import React from "react";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {deleteSpecjalizacja} from "../../axios/SpecjalizacjaAxiosCalls";
import axios from "axios";
let CancelToken
let source
class UsuniecieSpecjalizacjiDialog extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdSpecjalizacja = this.props.params.idSpecjalizacja
        this.state = {
            idSpecjalizacja: paramsIdSpecjalizacja,
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

    removeSpecjalizacja = async (idSpecjalizacja) => {
        const {navigate} = this.props;
        try {
            await deleteSpecjalizacja(idSpecjalizacja, source)
            await navigate("/specjalizacje", {replace: true});
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const {idSpecjalizacja} = this.state
        const {t, navigate} = this.props;

        return (
            <div class="bg-gray-200 flex items-center justify-center h-screen">
                <div
                    class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-2xl z-50 overflow-y-auto">
                    <div class="modal-content py-9 px-5">
                        <p class="text-4xl mb-2 text-center font-bold">{t('specjalizacja.deletingSpecialization')}</p>
                        <img src="/images/znakZapytaniaPies.png" alt={"ZnakZapytaniaPies"}/>

                        <div class="flex justify-end pt-2">
                            <button onClick={() => navigate(-1)}
                                    class="px-4 bg-transparent p-3 rounded-lg text-blue-400 hover:bg-gray-100 hover:text-blue-400 mr-2">{t('button.back')}</button>
                            <button onClick={() => this.removeSpecjalizacja(idSpecjalizacja)}
                                    class="shadow-xl px-4 bg-blue-400 p-3 rounded-lg text-white hover:bg-blue-400">{t('specjalizacja.deleteSpecialization')}</button>
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

export default withTranslation()(withRouter(withNavigate(UsuniecieSpecjalizacjiDialog)));
