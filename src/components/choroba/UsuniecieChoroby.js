import React from "react";
import {useNavigate, useParams} from "react-router";
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {deleteChoroba} from "../../axios/ChorobaAxiosCalls";

class UsuniecieChoroby extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdChoroba = this.props.params.IdChoroba
        this.state = {
            idChoroba: paramsIdChoroba,
            error: '',
            isLoaded: false
        }
    }

    removeChoroba = async (idChoroba) => {
        const {navigate} = this.props;
        try {
            await deleteChoroba(idChoroba)
            await navigate("/choroby", {replace: true});
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const {idChoroba} = this.state
        const {t} = this.props;

        return (
            <div class="bg-gray-200 flex items-center justify-center h-screen">
                <div
                    class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-2xl z-50 overflow-y-auto">
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
                                    class="shadow-xl px-4 bg-blue-400 p-3 rounded-lg text-white hover:bg-blue-400">{t('choroba.deleteDisease')}
                            </button>
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

export default withTranslation()(withRouter(withNavigate(UsuniecieChoroby)));
