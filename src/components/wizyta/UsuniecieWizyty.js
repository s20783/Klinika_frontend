import React from "react";
import {deleteWizyta} from "../../api/WizytaApiCalls";
import {useParams, useNavigate} from "react-router";
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";

class UsuniecieWizyty extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdWizyta = this.props.params.idWizyta
        console.log(paramsIdWizyta)
        this.state = {
            idWizyta: paramsIdWizyta,
            error: '',
            isLoaded: false,
            notice: '',
        }
    }

    removeWizyte = (idWizyta) => {
        const {navigate} = this.props;
        //let response;
        /*
        console.log(idWizyta)
        deleteWizyta(idWizyta)
            .then(res => {
                console.log(res)
                if (res.status === 204) {
                    console.log(res.status)
                    navigate(-1, {replace: true});

                } else if (res.status === 401) {
                    console.log(res)

                } else {
                    console.log(res)

                }
            })*/
    }

    render() {
        const {error, idWizyta} = this.state
        const {t} = this.props;
        const {navigate} = this.props;

        return (
            <body class="bg-gray-200 flex items-center justify-center h-screen">

            <div class="modal-overlay absolute w-full h-full bg-gray-500 opacity-50"></div>
            <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">

                <div class="modal-content py-9 px-5">
                    <p class="text-4xl mb-2 text-center font-bold">{t('wizyta.deletingVisit')}</p>
                    <img src="/images/znakZapytaniaPies.png"/>

                    <div class="flex justify-end pt-2">
                        <button onClick={() => navigate(-1)}
                                class="px-4 bg-transparent p-3 rounded-lg text-blue-400 hover:bg-gray-100 hover:text-blue-400 mr-2">
                                {t('button.back')}
                        </button>
                        <button
                        onClick={() => this.removeWizyte(idWizyta)}
                                class=" px-4 bg-blue-400 p-3 rounded-lg text-white hover:bg-blue-400">{t('wizyta.deleteVisit')}
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

export default withTranslation()(withRouter(withNavigate(UsuniecieWizyty)));