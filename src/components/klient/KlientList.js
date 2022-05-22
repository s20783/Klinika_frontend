import React from "react";
import {useNavigate} from "react-router";
import {getKlientList} from "../../api/KlientApiCalls";
import KlientListTable from "./KlientListTable";

class KlientList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            isLoaded: false,
            klienci: [],
            notice: ''
        }
    }

    componentDidMount() {
        const {navigate} = this.props;
        getKlientList()
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
                    this.setState({
                        isLoaded: true,
                        klienci: data
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
        const {error, isLoaded, klienci} = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie...</p>
        } else {
            content = <KlientListTable klienci={klienci}/>
        }

        return (
            <main>
                <section className="bg-gray-100 border-b  ">
                    <div className="container w-full max-w-5xl  mx-auto px-2 py-8">
                        <div id='recipients' className="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
                            <h2 className="mt-6 w-full my-2 mb-6 text-5xl font-black leading-tight text-center text-gray-800">
                                Klienci</h2>
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

export default withNavigate(KlientList);