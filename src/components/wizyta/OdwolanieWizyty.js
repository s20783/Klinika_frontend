import React from "react";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {odwolajWizyte} from "../../axios/WizytaAxiosCalls";
import {isKlient} from "../other/authHelper";

class OdwolanieWizyty extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdWizyta = this.props.params.IdWizyta
        const paramsIdKlient = this.props.params.IdKlient

        console.log(paramsIdWizyta)
        this.state = {
            idWizyta: paramsIdWizyta,
            idKlient:paramsIdKlient,
            error: '',
            isLoaded: false,
            notice: '',
        }
    }

    removeWizyte = async () => {
        const {navigate} = this.props;
        try {
            await odwolajWizyte(this.state.idWizyta, this.state.idKlient)
            if(isKlient()){
                await navigate(`/mojeWizyty`, {replace: true});
            }else {
                await navigate(`/wizyty`, {replace: true});
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const {t} = this.props;
        const {navigate} = this.props;

        return (
            <body class="bg-gray-200 flex items-center justify-center h-screen">

            <div class="modal-overlay absolute w-full h-full  opacity-50"></div>
            <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">

                <div class="modal-content py-9 px-5">
                    <p class="text-4xl mb-2 text-center font-bold">{t('wizyta.cancelingVisit')}</p>
                    <img src="/images/znakZapytaniaPies.png" alt={"znakZapytaniaPies"}/>

                    <div class="flex justify-end pt-2">
                        <button onClick={() => navigate(-1)}
                                class="px-4 bg-transparent p-3 rounded-lg text-blue-400 hover:bg-gray-100 hover:text-blue-400 mr-2">
                            {t('button.back')}
                        </button>
                        <button
                            onClick={() => this.removeWizyte()}
                            class="shadow-xl px-4 bg-blue-400 p-3 rounded-lg text-white hover:bg-blue-400">{t('wizyta.cancelVisit')}
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

export default withTranslation()(withRouter(withNavigate(OdwolanieWizyty)));