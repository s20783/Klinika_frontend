import React from "react";
import AccountMenu from "./AccountMenu";
import {withTranslation} from "react-i18next";
import {getMojeRecepty} from "../../axios/PrescriptionApiCalls";
import PrescriptionListTable from "../prescription/PrescriptionListTable";
import axios from "axios";
let CancelToken
let source
class AccountPrescriptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: '',
            user: '',
            recepty: []
        }
    }

    async componentDidMount() {
        CancelToken = axios.CancelToken;
        source = CancelToken.source();
        try {
            await getMojeRecepty(source).then((res) => {
                if (res) {
                    console.log(res.data)
                    this.setState({
                        isLoaded: true,
                        recepty: res.data
                    });
                }
            })
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
        const {error, isLoaded, recepty} = this.state
        let content;
        const {t} = this.props;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie...</p>
        } else {
            content = <PrescriptionListTable recepty={recepty}/>
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
                                <div className="w-full">
                                    <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                                        {t("recepta.title1")}
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

export default withTranslation()(AccountPrescriptions);