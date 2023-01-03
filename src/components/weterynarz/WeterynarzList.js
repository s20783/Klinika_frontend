import React from "react";
import {useNavigate} from "react-router";
import {getWeterynarzList} from "../../axios/WeterynarzAxionCalls";
import WeterynarzListTable from "./WeterynarzListTable";
import {withTranslation} from "react-i18next";
import {getKlientList} from "../../axios/KlientAxiosCalls";
import axios from "axios";
import {getChorobaList} from "../../axios/ChorobaAxiosCalls";
let CancelToken
let source
class WeterynarzList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            isLoaded: false,
            weterynarze: [],
            notice: ''
        }
    }

    async componentDidMount() {
        CancelToken = axios.CancelToken;
        source = CancelToken.source();

        try {
            await getWeterynarzList(source).then((res) => {
                if (res) {
                    console.log(res.data)
                    this.setState({
                        isLoaded: true,
                        weterynarze: res.data
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
        const {error, isLoaded, weterynarze} = this.state
        let content;
        const {t} = this.props;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie...</p>
        } else {
            content = <WeterynarzListTable weterynarze={weterynarze}/>
        }

        return (
            <main>
                <section className="bg-gray-100 border-b">
                    <div className="container w-full max-w-6xl  mx-auto px-2 py-8">
                        <div id='recipients' className="px-1 md:px-8 py-4 md:py-8 mt-6 lg:mt-0 rounded shadow bg-white">
                            <h2 className="mt-6 w-full my-2 mb-6 text-5xl font-black leading-tight text-center text-gray-800">
                                {t('weterynarz.title')}</h2>
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

export default withTranslation()(withNavigate(WeterynarzList));