import React from "react";
import {getLekList} from "../../axios/LekAxiosCalls";
import LekListTable from "./LekListTable";
import {useNavigate} from "react-router";
import {withTranslation} from "react-i18next";
import {getSpecjalizacjaList} from "../../axios/SpecjalizacjaAxiosCalls";

class LekList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            isLoaded: false,
            leki: [],
            notice: ''
        }
    }

    async componentDidMount() {
        try {
            const res = await getLekList()
            const data = await res.data
            this.setState({
                isLoaded: true,
                leki: data
            });
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const {error, isLoaded, leki} = this.state
        let content;
        const {t} = this.props;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie...</p>
        } else {
            content = <LekListTable leki={leki}/>
        }

        return (
            <main>
                <section className="bg-gray-100 border-b  ">
                    <div className="container w-full max-w-6xl  mx-auto px-2 py-8">
                        <div id='recipients' className="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
                            <h2 className="mt-6 w-full my-2 mb-6 text-5xl font-black leading-tight text-center text-gray-800">
                                {t('lek.title')}</h2>
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

export default withTranslation()(withNavigate(LekList));