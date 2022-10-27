import React from "react";
import {deleteSpecjalizacja} from "../../api/SpecjalizacjaApiCalls";
import {useParams, useNavigate} from "react-router";
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";

class UsuniecieSpecjalizacji extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdSpecjalizacja = this.props.params.idSpecjalizacja

        this.state = {
            idSpecjalizacja: paramsIdSpecjalizacja,
            error: '',
            isLoaded: false,
            notice: '',
        }
    }

    removeSpecjalizacja = (idSpecjalizacja) => {
        const {navigate} = this.props;
        //let response;
        deleteSpecjalizacja(idSpecjalizacja)
            .then(res => {
                console.log(res)
                if (res.status === 204) {
                    console.log(res.status)
                    navigate("/specjalizacje", {replace: true});

                } else if (res.status === 401) {
                    console.log(res)

                } else {
                    console.log(res)

                }
            })
    }

    render() {
        const {error, idSpecjalizacja} = this.state
        const {t} = this.props;

        return (
            <body class="bg-gray-200 flex items-center justify-center h-screen">

            <div class="modal-overlay absolute w-full h-full bg-gray-500 opacity-50"></div>
            <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">

                <div class="modal-content py-9 px-5">
                    <p class="text-4xl mb-2 text-center font-bold">{t('specjalizacja.deletingSpecialization')}</p>
                    <img src="/images/znakZapytaniaPies.png"/>

                    <div class="flex justify-end pt-2">
                        <Link to="/specjalizacje">
                            <button
                                class="px-4 bg-transparent p-3 rounded-lg text-blue-400 hover:bg-gray-100 hover:text-blue-400 mr-2">{t('button.back')}</button>
                        </Link>
                        <button onClick={() => this.removeSpecjalizacja(idSpecjalizacja)}
                                class=" px-4 bg-blue-400 p-3 rounded-lg text-white hover:bg-blue-400">{t('specjalizacja.deleteSpecialization')}</button>
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

export default withTranslation()(withRouter(withNavigate(UsuniecieSpecjalizacji)));
