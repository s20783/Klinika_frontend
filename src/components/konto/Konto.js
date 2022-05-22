import {Link} from "react-router-dom";
import React from "react";
import {getImie} from "../other/authHelper";
import {getLekList} from "../../api/LekApiCalls";
import {getKontoData} from "../../api/authApiCalls";
import LekListTable from "../lek/LekListTable";

class Konto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: '',
            message: '',
            user: ''
        }
    }

    componentDidMount() {
        getKontoData()
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data)
                    this.setState({
                        isLoaded: true,
                        user: data
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
        const {error, isLoaded, user} = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie...</p>
        } else {
            //content = <p>Ładowanie zakończone</p>
            content = <div>
                <p>{user.Imie}</p>
                <p>{user.Nazwisko}</p>
                <p>{user.NumerTelefonu}</p>
                <p>{user.Email}</p>
            </div>
        }


        return(
        <main>
            <section className="bg-gray-100 border-b">
                <div className="container max-w-5xl mx-auto m-0">

                    <h2 className="mt-6 w-full my-2 mb-6 text-5xl font-black leading-tight text-center text-gray-800">
                        Moje konto
                    </h2>

                    <div className="w-full mb-4">
                        <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"/>
                    </div>

                    <div className="flex flex-wrap">
                        <div className="w-5/6 sm:w-1/2 p-6">
                            <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                                Witaj {getImie()}
                            </h3>
                            {content}
                            <br/>
                        </div>
                    </div>

                </div>

        <div className="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-16 mt-16">
            <div className="w-full lg:w-1/6 lg:px-6 text-xl text-gray-800 leading-normal">
                <p className="text-base font-bold py-2 lg:pb-6 text-gray-700">Menu</p>
                <div className="block lg:hidden sticky inset-0">
                    <button id="menu-toggle"
                            className="flex w-full justify-end px-3 py-3 bg-white lg:bg-transparent border rounded border-gray-600 hover:border-purple-500 appearance-none focus:outline-none">
                        <svg className="fill-current h-3 float-right" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                    </button>
                </div>
                <div
                    className="w-full sticky inset-0 hidden h-64 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20"
                    // style="top:5em;" id="menu-content"
                    >
                    <ul className="list-reset">
                        <li className="py-2 md:my-0 hover:bg-blue-400 lg:hover:bg-transparent">
                            <Link to="/konto"
                               className="block pl-4 align-middle text-gray-700 no-underline hover:text-blue-400 border-l-4 border-transparent lg:border-blue-400 lg:hover:border-blue-400">
                                <span className="pb-1 md:pb-0 text-sm text-gray-900 font-bold">Moje dane</span>
                            </Link>
                        </li>
                        <li className="py-2 md:my-0 hover:bg-blue-400 lg:hover:bg-transparent">
                            <Link to="/wizyty"
                               className="block pl-4 align-middle text-gray-700 no-underline hover:text-blue-400 border-l-4 border-transparent lg:hover:border-gray-400">
                                <span className="pb-1 md:pb-0 text-sm">Wizyty</span>
                            </Link>
                        </li>
                        <li className="py-2 md:my-0 hover:bg-blue-400 lg:hover:bg-transparent">
                            <Link to="#"
                                  className="block pl-4 align-middle text-gray-700 no-underline hover:text-blue-400 border-l-4 border-transparent lg:hover:border-gray-400">
                                <span className="pb-1 md:pb-0 text-sm">Zwierzęta</span>
                            </Link>
                        </li>
                        <li className="py-2 md:my-0 hover:bg-blue-400 lg:hover:bg-transparent">
                            <Link to="#"
                               className="block pl-4 align-middle text-gray-700 no-underline hover:text-blue-400 border-l-4 border-transparent lg:hover:border-gray-400">
                                <span className="pb-1 md:pb-0 text-sm">Recepty</span>
                            </Link>
                        </li>
                        <li className="py-2 md:my-0 hover:bg-blue-400 lg:hover:bg-transparent">
                            <Link to="#"
                                  className="block pl-4 align-middle text-gray-700 no-underline hover:text-blue-400 border-l-4 border-transparent lg:hover:border-gray-400">
                                <span className="pb-1 md:pb-0 text-sm">Skierowania</span>
                            </Link>
                        </li>
                        <li className="py-2 md:my-0 hover:bg-blue-400 lg:hover:bg-transparent">
                            <Link to="#"
                               className="block pl-4 align-middle text-gray-700 no-underline hover:text-blue-400 border-l-4 border-transparent lg:hover:border-gray-400">
                                <span className="pb-1 md:pb-0 text-sm">Opłaty</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
            </section>
        </main>
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

export default Konto;