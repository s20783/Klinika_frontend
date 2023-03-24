import React from "react";
import {getSpecjalizacjaList} from "../../axios/SpecjalizacjaAxiosCalls";
import SpecjalizacjaListTable from "./SpecjalizacjaListTable";
import {useNavigate} from "react-router";
import {withTranslation} from "react-i18next";
import axios from "axios";
import {getChorobaList} from "../../axios/ChorobaAxiosCalls";
let CancelToken
let source
class SpecjalizacjaList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            isLoaded: false,
            specjalizacje: [],
        }
    }

    async componentDidMount() {
        CancelToken = axios.CancelToken;
        source = CancelToken.source();

        try {
            await getSpecjalizacjaList(source).then((res) => {
                if (res) {
                    console.log(res.data)
                    this.setState({
                        isLoaded: true,
                        specjalizacje: res.data
                    });
                }
            })
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
        const {error, isLoaded, specjalizacje} = this.state
        const {t} = this.props;
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie...</p>
        } else {
            content = <SpecjalizacjaListTable specjalizacje={specjalizacje}/>
        }

        return (
            <main>
                <section className="bg-gray-100 border-b">
                    <div className="container w-full max-w-7xl mx-auto px-1 py-8">
                        <div className="px-0.5 md:px-8 py-4 md:py-8 rounded shadow bg-white">
                            <h2 className="mt-6 w-full my-2 mb-6 text-5xl font-black leading-tight text-center text-gray-800">
                                {t('specjalizacja.title')}</h2>
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

export default withTranslation()(withNavigate(SpecjalizacjaList));