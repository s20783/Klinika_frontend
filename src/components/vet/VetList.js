import React from "react";
import {useNavigate} from "react-router";
import {getWeterynarzList} from "../../axios/VetApiCalls";
import VetListTable from "./VetListTable";
import {withTranslation} from "react-i18next";
import axios from "axios";

let CancelToken
let source
class VetList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            isLoaded: false,
            data: [],
            pageCount: 0
        }
    }

    async componentDidMount() {
        CancelToken = axios.CancelToken;
        source = CancelToken.source();
        await this.getData("", 1)
    }

    componentWillUnmount() {
        if (source) {
            source.cancel('Operation canceled by the user.');
        }
    }

    getData = async (searchWord, page) => {
        try {
            await getWeterynarzList(searchWord, page, source).then((res) => {
                if (res) {
                    this.setState({
                        isLoaded: true,
                        data: res.data.Items,
                        pageCount: res.data.PageCount
                    });
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const {error, isLoaded, data, pageCount} = this.state
        let content;
        const {t} = this.props;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie...</p>
        } else {
            content = <VetListTable weterynarze={data} getData={this.getData} pageCount={pageCount} />
        }

        return (
            <main>
                <section className="bg-gray-100 border-b">
                    <div className="container w-full max-w-7xl mx-auto px-1 py-8">
                        <div className="px-0.5 md:px-8 py-4 md:py-8 rounded shadow bg-white">
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

export default withTranslation()(withNavigate(VetList));