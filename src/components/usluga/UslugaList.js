import React from "react";
import {getUslugaList} from "../../axios/UslugaAxiosCalls";
import UslugaListTable from "./UslugaListTable";
import {useNavigate} from "react-router";
import {withTranslation} from "react-i18next";

class UslugaList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            isLoaded: false,
            uslugi: []
        }
    }

    async componentDidMount() {
        try {
            const res = await getUslugaList();
            const data = await res.data

            this.setState({
                uslugi: data,
                isLoaded: true
            });
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const {error, isLoaded, uslugi} = this.state
        const {t} = this.props;
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie...</p>
        } else {
            content = <UslugaListTable uslugi={uslugi}/>
        }

        return (
            <main>
                <section className="bg-gray-100 border-b  ">
                    <div className="container w-full max-w-7xl  mx-auto px-2 py-8">
                        <div id='recipients' className="px-1 md:px-8 py-4 md:py-8 mt-6 lg:mt-0 rounded shadow bg-white">
                            <h2 className="mt-6 w-full my-2 mb-6 text-5xl font-black leading-tight text-center text-gray-800">
                                {t('usluga.title')}</h2>
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

export default withTranslation()(withNavigate(UslugaList));