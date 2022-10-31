import React from "react";
import PacjentKlientListTable from "../pacjent/PacjentKlientListTable";
import {getKlientPacjentList} from "../../api/PacjentApiCalls";
import KontoMenu from "../fragments/KontoMenu";

class KontoPacjenci extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: '',
            message: '',
            user: '',
            pacjenci: [],
            notice: ''
        }
    }

    componentDidMount() {
        const {navigate} = this.props;
        getKlientPacjentList()
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
            content = <PacjentKlientListTable pacjenci={pacjenci}/>
        }


        return (
            <div class="container w-full flex flex-wrap mx-auto px-2  lg:pt-3 mt-3">
                <KontoMenu/>
                <div
                    class="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                    <section class="bg-white-100 border-b  ">
                        <div class="container max-w-5xl mx-auto m-0">


                            <div className="w-full mb-4">
                                <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"/>
                            </div>

                            <div className="flex flex-wrap">
                                <div className="w-5/6 p-6">
                                    <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                                        Zwierzęta
                                    </h3>
                                    {content}
                                    <br/>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

// const withRouter = WrappedComponent => props => {
//     const params = useParams();
//     return (
//         <WrappedComponent
//             {...props}
//             params={params}
//         />
//     );
// };

export default KontoPacjenci;