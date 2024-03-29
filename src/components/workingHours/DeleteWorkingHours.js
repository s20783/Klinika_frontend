import React from "react";
import {deleteWorkingHours} from "../../axios/WorkingHoursApiCalls";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import axios from "axios";

let CancelToken
let source

class DeleteWorkingHours extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdWeterynarz = this.props.params.IdOsoba
        const dzien = this.props.params.Dzien
        this.state = {
            idWeterynarz: paramsIdWeterynarz,
            dzien: dzien,
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

    removeGodzinyPracy = async (idWeterynarz, dzien) => {
        const {navigate} = this.props;
        try {
            await deleteWorkingHours(idWeterynarz, dzien, source)
            await navigate(-1, {replace: true});
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const {idWeterynarz, dzien} = this.state
        const {t, navigate} = this.props;

        return (
            <main className="bg-gray-200 flex items-center justify-center h-screen">
                <div className="modal-overlay absolute w-full h-full bg-gray-500 opacity-50"></div>
                <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-2xl z-50 overflow-y-auto">
                    <div className="modal-content py-9 px-5">
                        <p className="text-4xl mb-2 text-center font-bold">{t('godzinyPracy.deletingWorkingHour')}</p>
                        <img src="/images/znakZapytaniaPies.png" alt={"znakZapytaniaPies"}/>
                        <div className="flex justify-end pt-2">
                            <button onClick={() => navigate(-1)}
                                    className="shadow-lg px-4 bg-transparent p-3 rounded-lg text-blue-400 hover:bg-gray-100 hover:text-blue-400 mr-2">{t('button.back')}</button>
                            <button onClick={() => this.removeGodzinyPracy(idWeterynarz, dzien)}
                                    className="shadow-lg px-4 bg-blue-400 p-3 rounded-lg text-white hover:bg-blue-400">{t('godzinyPracy.deleteWorkingHour')}</button>
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

export default withTranslation()(withRouter(withNavigate(DeleteWorkingHours)));
