import React from "react";
import {useNavigate, useParams} from "react-router";
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";

class CzyDodacGodziny extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdWeterynarz = this.props.params.IdOsoba
        console.log(paramsIdWeterynarz)
        this.state = {
            idWeterynarz: paramsIdWeterynarz,
            error: '',
            isLoaded: false,
            notice: '',
        }
    }

    render() {
        const {idWeterynarz} = this.state
        const {t} = this.props;

        return (
            <body class="bg-gray-200 flex items-center justify-center h-screen">

            <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">

                <div class="modal-content py-9 px-5">
                    <p class="text-4xl mb-2 text-center font-bold">{t('godzinyPracy.addingWorkingHour')}</p>
                    <img src="/images/znakZapytaniaPies.png" alt={"znakZapytaniaPies"}/>

                    <div class="flex justify-end pt-2">
                       <Link to={`/weterynarze`}>
                           <button
                                class="px-4 bg-transparent p-3 rounded-lg text-blue-400 hover:bg-gray-100 hover:text-blue-400 mr-2">{t('button.back')}</button>
                       </Link>
                           <Link to={`/godzinyPracy/${idWeterynarz}`}>
                            <button
                                class=" px-4 bg-blue-400 p-3 rounded-lg text-white hover:bg-blue-400">{t('godzinyPracy.addWorkingHour')}</button>
                        </Link>
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

export default withTranslation()(withRouter(withNavigate(CzyDodacGodziny)));
