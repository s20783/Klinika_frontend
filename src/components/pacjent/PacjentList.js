import React from "react";
import {getPacjentList} from "../../api/PacjentApiCalls";
import PacjentListTable from "./PacjentListTable";
import {useNavigate} from "react-router";

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

    componentDidMount() {
        const { navigate } = this.props;
        getPacjentList()
            .then(res => {
                console.log(res.status)
                if(res.status === 401) {
                    console.log('Potrzebny aktualny access token')
                    navigate("/", { replace: true });
                }
                return res.json()
            })
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        pacjenci: data
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
        const {error, isLoaded, pacjenci} = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie...</p>
        } else {
            //content = <p>Ładowanie zakończone</p>
            content = <PacjentListTable pacjenci={pacjenci}/>
        }

        return (
            <main>
                <section className="bg-gray-100 border-b">
                    <div className="container max-w-5xl mx-auto m-0">
                        <h2 className="mt-6 w-full my-2 mb-6 text-5xl font-black leading-tight text-center text-gray-800">
                            Pacjenci</h2>
                        {content}
                    </div>
                </section>
            </main>
        )
    }
}

const withNavigate = Component => props => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
};

export default withNavigate(PacjentList);