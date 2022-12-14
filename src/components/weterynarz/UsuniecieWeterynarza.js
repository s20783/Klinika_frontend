import React from "react";
import {deleteWeterynarz} from "../../axios/WeterynarzAxionCalls";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";

class UsuniecieWeterynarza extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdWeterynarz = this.props.params.IdOsoba
        console.log(paramsIdWeterynarz)
        this.state = {
            idWeterynarz: paramsIdWeterynarz,
            error: '',
            isLoaded: false,
            notice: '',
        }
    }

    removeWeterynarza = async (idWeterynarz) => {
        const {navigate} = this.props;
        try {
            await deleteWeterynarz(idWeterynarz)
            await navigate("/weterynarze", {replace: true});
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const {idWeterynarz} = this.state
        const {t, navigate} = this.props;

        return (
            <body class="bg-gray-200 flex items-center justify-center h-screen">

            <div class="modal-overlay absolute w-full h-full bg-gray-500 opacity-50"></div>
            <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">

                <div class="modal-content py-9 px-5">
                    <p class="text-4xl mb-2 text-center font-bold">{t('weterynarz.deletingVet')}</p>
                    <img src="/images/znakZapytaniaPies.png" alt={"znakZapytaniaPies"}/>

                    <div class="flex justify-end pt-2">
                        <button onClick={() => navigate(-1)}
                                class="shadow-xl px-4 bg-transparent p-3 rounded-lg text-blue-400 hover:bg-gray-100 hover:text-blue-400 mr-2">{t('button.back')}</button>
                        <button onClick={() => this.removeWeterynarza(idWeterynarz)}
                                class=" px-4 bg-blue-400 p-3 rounded-lg text-white hover:bg-blue-400">{t('weterynarz.deleteVet')}</button>
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

export default withTranslation()(withRouter(withNavigate(UsuniecieWeterynarza)));
