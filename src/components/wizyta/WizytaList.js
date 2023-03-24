import React from "react";
import {useNavigate} from "react-router";
import WizytaTableList from "./WizytaTableList";
import {withTranslation} from "react-i18next";
import {getWizytaList} from "../../axios/WizytaAxiosCalls";
import { getId} from "../helpers/authHelper";
import axios from "axios";
let CancelToken
let source

class WizytaList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            isLoaded: false,
            wizyty: [],
            idVet:''
        }
    }

    async componentDidMount() {
        CancelToken = axios.CancelToken;
        source = CancelToken.source();
        try {
            await getWizytaList(source).then((res) => {
                if (res) {
                    console.log(res.data)
                    this.setState({
                        isLoaded: true,
                        wizyty: res.data
                    });
                }
            })
        } catch (error) {
            console.log(error)
        }

        try {
            const userId = await getId()
            this.setState({
                idVet: userId
            });
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
        const {error, isLoaded, wizyty, idVet} = this.state
        let content;
        const {t} = this.props;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie...</p>
        } else {
            content = <WizytaTableList wizyty={wizyty} idVet={idVet}/>
        }

        return (
            <main>
                <section className="bg-gray-100 border-b">
                    <div className="container w-full max-w-7xl  mx-auto px-1 py-8">
                        <div className="px-0.5 md:px-8 py-4 md:py-8 rounded shadow bg-white">
                            <h2 className="mt-6 w-full my-2 mb-6 text-5xl font-black leading-tight text-center text-gray-800">
                                {t('wizyta.title')}</h2>
                            {content}
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}

const withNavigate = Component => props => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate}/>;
};

export default withTranslation()(withNavigate(WizytaList));