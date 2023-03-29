import {Link} from "react-router-dom";
import React from "react";
import {getKontoData} from "../../axios/AuthAxiosCalls";
import KontoMenu from "../fragments/KontoMenu";
import {withTranslation} from "react-i18next";
import axios from "axios";
import {isKlient} from "../helpers/authHelper";

let CancelToken
let source

class Konto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: '',
            user: ''
        }
    }

    async componentDidMount() {
        CancelToken = axios.CancelToken;
        source = CancelToken.source();
        try {
            await getKontoData(source).then((res) => {
                if (res) {
                    this.setState({
                        isLoaded: true,
                        user: res.data
                    });
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    componentWillUnmount() {
        source.cancel('Operation canceled by the user.');
    }

    render() {
        const {user} = this.state
        const {t} = this.props;

        return (
            <div className="container w-full flex flex-wrap mx-auto px-2  lg:pt-3 mt-3">
                <KontoMenu/>
                <div
                    className="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                    <section className="bg-white-100">
                        <div className="container max-w-5xl mx-auto m-0">
                            <h2 className="mt-6 w-full my-2 mb-6 text-5xl font-black leading-tight text-center text-gray-800">
                                {t('konto.myAccount')}
                            </h2>
                            <div className="w-full mb-4">
                                <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"/>
                            </div>
                            <div className="flex items-center border-b">
                                <img className="h-32 fill-current text-gray-600 hover:shadow rounded"
                                     src="/images/avatar_photo.jpg"
                                     alt="avatar_logo"
                                     loading="lazy"
                                />
                                <div className="pl-4">
                                    <p className="text-2xl text-gray-800 font-bold">{user.Imie} {user.Nazwisko}</p>
                                    <p className="text-s text-gray-600 pt-2">Login: {user.NazwaUzytkownika}</p>
                                </div>
                            </div>
                            <div className="md:w-2/3 mt-6 mb-4 border-b">
                                <div className="mt-2 mb-4">
                                    <p className="py-2 text-sm text-gray-600 font-bold">{t('konto.contactDetails')}</p>
                                    <label className="inline-flex items-center mt-4">
                                        <svg className="h-8 w-8 text-black mr-6" viewBox="0 0 24 24" fill="none"
                                             stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round">
                                            <path
                                                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                        </svg>
                                        <p> {user.NumerTelefonu}</p>
                                    </label>
                                    <label className="inline-flex items-center md:ml-12">
                                        <svg className="h-8 w-8 text-black mr-6" viewBox="0 0 24 24" fill="none"
                                             stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round">
                                            <path
                                                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                            <polyline points="22,6 12,13 2,6"/>
                                        </svg>
                                        <p> {user.Email}</p>
                                    </label>
                                </div>
                            </div>
                            <div className="mt-2 mb-4">
                                <p className="py-2 text-sm text-gray-600 font-bold">
                                    {t('konto.accountManagement')}</p>
                                <label className="flex flex-col items-left mt-4">
                                    <Link to="/zmianaDanychKonta"
                                          className="shadow-xl bg-blue-400 w-60 mb-6 hover:bg-white text-center hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                        {t('konto.button.changeContactData')}
                                    </Link>
                                    <Link to="/zmianaHasla"
                                          className="shadow-xl bg-blue-400 w-60 mb-6 text-center hover:bg-white hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                        {t('konto.button.changePassword')}
                                    </Link>
                                    {isKlient() &&
                                        <Link to="/usuniecieKonta"
                                              className="shadow-xl bg-red-300 w-60 mb-6 text-center hover:bg-white hover:text-red-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                            {t('konto.button.deleteAccont')}
                                        </Link>
                                    }
                                </label>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

export default withTranslation()(Konto);