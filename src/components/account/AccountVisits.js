import React from "react";
import VisitListTable from "../visit/VisitListTable";
import AccountMenu from "./AccountMenu";
import {withTranslation} from "react-i18next";
import {getClientVisitList} from "../../axios/VisitApiCalls";
import {getCurrentUser} from "../../helpers/authHelper";
import axios from "axios";

let CancelToken
let source

class AccountVisits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: '',
            user: '',
            wizyty: [],
            idVet: ''
        }
    }

    async componentDidMount() {
        CancelToken = axios.CancelToken;
        source = CancelToken.source();
        try {
            await getClientVisitList(source).then((res) => {
                if (res) {
                    this.setState({
                        isLoaded: true,
                        wizyty: res.data
                    });
                }
            })

            const user = await getCurrentUser();
            let token = user.Token

            this.setState({
                idVet: JSON.parse(atob(token.split('.')[1])).idUser
            });
        } catch (error) {
            console.log(error)
        }
    }

    componentWillUnmount() {
        if (source) {
            source.cancel('Operation canceled by the user.');
        }
    }

    render() {
        const {error, isLoaded, wizyty, idVet} = this.state
        let content;
        const {t} = this.props;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie...</p>
        } else {
            content = <VisitListTable wizyty={wizyty} idVet={idVet}/>
        }

        return (
            <div className="container w-full flex flex-wrap mx-auto px-2  lg:pt-3 mt-3 mb-3">
                <AccountMenu/>
                <div
                    className="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                    <section className="bg-white-100 border-b">
                        <div className="container max-w-5xl mx-auto m-0">
                            <div className="w-full mb-4">
                                <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"/>
                            </div>
                            <div className="flex flex-wrap">
                                <div className="w-full ">
                                    <h3 className="text-3xl text-gray-800 font-bold leading-none mb-4">
                                        {t("wizyta.title")}
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

export default withTranslation()(AccountVisits);