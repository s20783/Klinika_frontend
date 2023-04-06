import React from "react";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";

class AfterScheduleUpdate extends React.Component {
    constructor(props) {
        super(props);
        const paramsAction = this.props.params.action
        this.state = {
            action: paramsAction,
            error: ''
        }
    }

    render() {
        const {action} = this.state
        const {t} = this.props;
        const {navigate} = this.props;

        const pageText = action === 'a' ? t('harmonogram.afterUpdatingSchedule') : t('harmonogram.afterAddingSchedule')

        return (
            <div className="bg-gray-200 flex items-center justify-center h-screen">
                <div
                    className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-2xl z-50 overflow-y-auto">
                    <div className="modal-content py-9 px-5">
                        <p className="text-4xl mb-2 text-center font-bold">{pageText}</p>
                        <img src="/images/znakZapytaniaPies.png" alt={"ZnakZapytaniaPies"}/>
                        <div className="flex justify-end pt-2">
                            <button onClick={() => navigate(-1)}
                                    className="shadow-lg px-4 bg-blue-400 p-3 rounded-lg text-white hover:bg-blue-400">
                                {t('button.back')}
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

export default withTranslation()(withRouter(withNavigate(AfterScheduleUpdate)));
