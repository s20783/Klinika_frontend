import React from "react";
import {getUslugaList} from "../../api/UslugaApiCalls";
import UslugaListTable from "./UslugaListTable";
import {useNavigate} from "react-router";
import {withTranslation} from "react-i18next";

class UslugaList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            isLoaded: false,
            uslugi: [],
            notice: ''

        }
    }

    componentDidMount() {
        const {navigate} = this.props;
        getUslugaList()
            .then(res => {
                console.log(res.status)
                if (res.status === 401) {
                    console.log('Potrzebny aktualny access token')
                    navigate("/", {replace: true});
                }
                return res.json()
            })
            .then(
                (data) => {
                    console.log(data)
                    this.setState({
                        isLoaded: true,
                        uslugi: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
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
            //content = <p>Ładowanie zakończone</p>
            content = <UslugaListTable uslugi={uslugi}/>
        }

        return (
            <main>
                <section className="bg-gray-100 border-b  ">
                    <div className="container w-full max-w-5xl  mx-auto px-2 py-8">
                        <div id='recipients' className="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
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

export default withTranslation() (withNavigate(UslugaList));