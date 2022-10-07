import {Link} from "react-router-dom";
import React from "react";
import {getImie} from "../other/authHelper";
import {getKontoData} from "../../api/authApiCalls";
import KontoMenu from "../fragments/KontoMenu";

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
            content =
                <div>
                    <p>{user.Imie}</p>
                    <p>{user.Nazwisko}</p>
                    <p>{user.NumerTelefonu}</p>
                    <p>{user.Email}</p>
                </div>
        }

        return (
            <div class="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3">
                <KontoMenu/>

                <div
                    class="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                    <section class="bg-white-100 border-b  ">
                        <div class="container max-w-5xl mx-auto m-0">
                            <h2 className="mt-6 w-full my-2 mb-6 text-5xl font-black leading-tight text-center text-gray-800">
                                Moje konto
                            </h2>

                            <div className="w-full mb-4">
                                <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"/>
                            </div>

                            <div className="relative hidden w-11 h-18 mr-3 rounded-full md:block">
                                <img
                                    className="object-cover w-full h-full rounded-full"
                                    src="/images/avatar_photo.jpg"
                                    alt="avatar_logo"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"/>
                            </div>

                            <div className="flex flex-wrap">
                                <div className="w-5/6 sm:w-1/2 p-6">
                                    <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                                        Witaj {getImie()}
                                    </h3>
                                    {content}
                                    <br/>
                                    <div className=" md:flex mb-6 mt-4 ">
                                        <div className="flex pb-3">
                                            <Link to=""
                                                    className=" shadow bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                                Zmień hasło
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>
                </div>

            </div>
        )
    }
}

export default Konto;