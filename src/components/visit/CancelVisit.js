import React from "react";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {getVisitDetails, cancelVisit} from "../../axios/VisitApiCalls";
import {isClient} from "../../helpers/authHelper";
import axios from "axios";
import dayjs from "dayjs";

let CancelToken
let source

class CancelVisit extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdWizyta = this.props.params.IdWizyta
        const paramsIdKlient = this.props.params.IdKlient

        this.state = {
            idWizyta: paramsIdWizyta,
            idKlient: paramsIdKlient,
            error: '',
            isLoaded: false
        }
    }

    async componentDidMount() {
        CancelToken = axios.CancelToken;
        source = CancelToken.source();
        this.getWizyta()
    }

    getWizyta = async () => {
        const {t} = this.props;
        try {
            await getVisitDetails(this.state.idWizyta, source).then((res) => {
                if (dayjs(res.data.DataRozpoczecia).diff(dayjs(new Date()), 'hour') <= 4) {
                    this.setState({
                        notice: t('wizyta.4hvisitNotification')
                    });
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    removeWizyte = async () => {
        const {navigate} = this.props;
        try {
            await cancelVisit(this.state.idWizyta, this.state.idKlient, source)
            if (isClient()) {
                await navigate(`/mojeWizyty`, {replace: true});
            } else {
                await navigate(`/wizyty`, {replace: true});
            }
        } catch (error) {
            console.log(error)
        }
    }

    componentWillUnmount() {
        if (source) {
            source.cancel('Operation canceled by the user.');
        }
    }

    render() {
        const {t} = this.props;
        const {navigate} = this.props;

        return (
            <main className="bg-gray-200 flex items-center justify-center h-screen">
                <div
                    className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">
                    <div className="modal-content py-9 px-5">
                        <p className="text-4xl mb-2 text-center font-bold">{t('wizyta.cancelingVisit')}</p>
                        <img src="/images/znakZapytaniaPies.png" alt={"znakZapytaniaPies"}/>
                        <p className="text-lg mb-2 text-center text-gray-400 font-bold">{this.state.notice}</p>
                        <div className="flex justify-end pt-2">
                            <button onClick={() => navigate(-1)}
                                    className="px-4 bg-transparent p-3 rounded-lg text-blue-400 hover:bg-gray-100 hover:text-blue-400 mr-2">
                                {t('button.back')}
                            </button>
                            <button
                                onClick={() => this.removeWizyte()}
                                className="shadow-xl px-4 bg-blue-400 p-3 rounded-lg text-white hover:bg-blue-400">{t('wizyta.cancelVisit')}
                            </button>
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

export default withTranslation()(withRouter(withNavigate(CancelVisit)));