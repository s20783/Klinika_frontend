import React from "react";
import {useNavigate, useParams} from "react-router";
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";

class CzyDodacGodziny extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdWeterynarz = this.props.params.IdOsoba
        this.state = {
            idWeterynarz: paramsIdWeterynarz,
            error: '',
            isLoaded: false
        }
    }

    render() {
        const {idWeterynarz} = this.state
        const {t} = this.props;
        return (
            <main className="bg-gray-200 flex items-center justify-center h-screen">
                <div
                    className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-2xl z-50 overflow-y-auto">
                    <div className="modal-content py-9 px-5">
                        <p className="text-4xl mb-2 text-center font-bold">{t('godzinyPracy.addingWorkingHour')}</p>
                        <img src="/images/znakZapytaniaPies.png" alt={"znakZapytaniaPies"}/>
                        <div className="flex justify-end pt-2">
                            <Link to={`/weterynarze`}>
                                <button
                                    className="px-4 bg-transparent p-3 rounded-lg text-blue-400 hover:bg-gray-100 hover:text-blue-400 mr-2">{t('button.back')}</button>
                            </Link>
                            <Link to={`/godzinyPracy/${idWeterynarz}`}>
                                <button
                                    className="shadow-xl px-4 bg-blue-400 p-3 rounded-lg text-white hover:bg-blue-400">{t('godzinyPracy.addWorkingHour')}</button>
                            </Link>
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

export default withTranslation()(withRouter(withNavigate(CzyDodacGodziny)));