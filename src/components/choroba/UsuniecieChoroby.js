import React from "react";
import {deleteChoroba} from "../../api/ChorobaApiCalls";
import {useNavigate, useParams} from "react-router";
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";

class UsuniecieChoroby extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.params)
        const paramsIdChoroba = this.props.params.IdChoroba

        this.state = {
            idChoroba: paramsIdChoroba,
            error: '',
            isLoaded: false,
            notice: '',
        }
    }

    removeChoroba = (idChoroba) => {
        const {navigate} = this.props;
        //let response;
        deleteChoroba(idChoroba)
            .then(res => {
                console.log(res)
                if (res.status === 204) {
                    console.log(res.status)
                    navigate("/choroby", {replace: true});

                } else if (res.status === 401) {
                    console.log(res)

                } else {
                    console.log(res)
                }
            })
    }

    render() {
        const {idChoroba} = this.state
        const {t} = this.props;

        return (
            <body class="bg-gray-200 flex items-center justify-center h-screen">
            <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">

                <div class="modal-content py-9 px-5">
                    <p class="text-4xl mb-2 text-center font-bold">{t('choroba.deletingDisease')}</p>
                    <img src="/images/znakZapytaniaPies.png" alt={"Znak Zapytania Pies"}/>

                    <div class="flex justify-end pt-2">
                        <Link to="/choroby">
                            <button
                                class="px-4 bg-transparent p-3 rounded-lg text-blue-400 hover:bg-gray-100 hover:text-blue-400 mr-2">{t('button.back')}
                            </button>
                        </Link>
                        <button onClick={() => this.removeChoroba(idChoroba)}
                                class=" px-4 bg-blue-400 p-3 rounded-lg text-white hover:bg-blue-400">{t('choroba.deleteDisease')}
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

export default withTranslation()(withRouter(withNavigate(UsuniecieChoroby)));
