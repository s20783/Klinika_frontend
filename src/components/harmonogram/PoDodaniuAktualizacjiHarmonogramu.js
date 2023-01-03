import React from "react";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";

class PoDodaniuAktualizacjiHarmonogramu extends React.Component {
    constructor(props) {
        super(props);
        const paramsAkcja = this.props.params.akcja
        this.state = {
            akcja: paramsAkcja,
            error: '',
            isLoaded: false
        }
    }


    render() {
        const {akcja} = this.state
        const {t} = this.props;
        const {navigate} = this.props;

        const pageText = akcja === 'a' ? t('harmonogram.afterUpdatingSchedule') : t('harmonogram.afterAddingSchedule')

        return (
            <div class="bg-gray-200 flex items-center justify-center h-screen">
                <div
                    class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-2xl z-50 overflow-y-auto">
                    <div class="modal-content py-9 px-5">
                        <p class="text-4xl mb-2 text-center font-bold">{pageText}</p>
                        <img src="/images/znakZapytaniaPies.png" alt={"ZnakZapytaniaPies"}/>
                        <div class="flex justify-end pt-2">

                            <button onClick={() => navigate(-1)}
                                    class="shadow-xl px-4 bg-blue-400 p-3 rounded-lg text-white hover:bg-blue-400">
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

export default withTranslation()(withRouter(withNavigate(PoDodaniuAktualizacjiHarmonogramu)));
