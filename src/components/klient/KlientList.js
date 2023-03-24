import React from "react";
import {useNavigate} from "react-router";
import KlientListTable from "./KlientListTable";
import {withTranslation} from "react-i18next";
import { getKlientList} from "../../axios/KlientAxiosCalls";
import axios from "axios";

let CancelToken
let source

class KlientList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            isLoaded: false,
            klienci: [],
            x: false
        }
    }

    async componentDidMount() {
        CancelToken = axios.CancelToken;
        source = CancelToken.source();
        try {
            await getKlientList(source).then((res) => {
                if (res) {
                    this.setState({
                        isLoaded: true,
                        klienci: res.data
                    });
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    componentWillUnmount() {
        if (source) {
            source.cancel('Operation canceled by the user.');
        }
    }

    render() {
        const {error, isLoaded, klienci} = this.state
        let content;
        const {t} = this.props;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie...</p>
        } else {
            content = <KlientListTable klienci={klienci}/>
        }

        return (
            <main>
                <section className="bg-gray-100 border-b">
                    <div className="container w-full max-w-7xl mx-auto px-1 py-8">
                        <div className="px-0.5 md:px-8 py-4 md:py-8 rounded shadow bg-white">
                            <h2 className="mt-6 w-full my-2 mb-6 text-5xl font-black leading-tight text-center text-gray-800">
                                {t('klient.title')}</h2>
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

export default withTranslation()(withNavigate(KlientList));