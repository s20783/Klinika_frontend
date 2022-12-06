import React from "react";
import PacjentListTable from "./PacjentListTable";
import {useNavigate} from "react-router";
import {withTranslation} from "react-i18next";
import {getPacjentList} from "../../axios/PacjentAxiosCalls";

class PacjentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            isLoaded: false,
            pacjenci: [],
            notice: ''
        }
    }

    async componentDidMount() {
        const res = await getPacjentList();
        var data = await res.data
        console.log(data)
        this.setState({
            isLoaded: true,
            pacjenci:  data
        });
    }

    render() {
        const {error, isLoaded, pacjenci} = this.state
        const {t} = this.props;
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie...</p>
        } else {
            content = <PacjentListTable pacjenci={pacjenci}/>
        }

        return (
            <main>
                <section className="bg-gray-100 border-b  ">
                    <div className="container w-full max-w-6xl  mx-auto px-2 py-8">
                        <div id='recipients' className="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
                            <h2 className="mt-6 w-full my-2 mb-6 text-5xl font-black leading-tight text-center text-gray-800">
                            {t('pacjent.title')}</h2>
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

export default withTranslation()(withNavigate(PacjentList));