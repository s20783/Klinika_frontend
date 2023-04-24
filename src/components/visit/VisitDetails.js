import React from "react";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {getFormattedDateWithHour} from "../../helpers/dateFormat";
import {getVisitDetails} from "../../axios/VisitApiCalls";
import {getPrescriptionDetails, getPrescriptionMedicaments} from "../../axios/PrescriptionApiCalls";
import {getVisitServiceList} from "../../axios/VisitServiceApiCalls";
import {getVisitDiseaseList} from "../../axios/VisitDiseaseApiCalls";
import VisitDetailsMenu from "./VisitDetailsMenu";
import {getVisitMedicamentList} from "../../axios/VisitMedicamentApiCalls";
import axios from "axios";
import dayjs from "dayjs";

let CancelToken
let source

class VisitDetails extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdWizyta = this.props.params.IdWizyta
        this.state = {
            wizyta: {
                Pacjent: '',
                Weterynarz: '',
                DataRozpoczecia: null,
                DataZakonczenia: null,
                Opis: '',
                NotatkaKlient: '',
                Cena: null,
                CzyOplacona: false,
                Status: '',
                IdKlient: ''
            },
            idWizyta: paramsIdWizyta,
            uslugi: [],
            chorobyWizyta: [],
            recepta: '',
            lekiRecepta: [],
            leki: []
        }
    }

    fetchVisitDetails = async () => {
        try {
            await getVisitDetails(this.state.idWizyta, source).then((res) => {
                if (res) {
                    this.setState({
                        isLoaded: true,
                        wizyta: res.data
                    });
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    fetchPrescriptionDetails = async () => {
        try {
            await getPrescriptionDetails(this.state.idWizyta, source).then((res) => {
                if (res) {
                    console.log(res.data)
                    this.setState({
                        isLoaded: true,
                        recepta: res.data
                    });
                }
            })
            await getPrescriptionMedicaments(this.state.idWizyta, source).then((res) => {
                if (res) {
                    console.log(res.data)
                    this.setState({
                        isLoaded: true,
                        lekiRecepta: res.data
                    });
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    fetchServices = async () => {
        try {
            await getVisitServiceList(this.state.idWizyta, source).then((res) => {
                if (res) {
                    this.setState({
                        isLoaded: true,
                        uslugi: res.data
                    });
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    fetchDiseases = async () => {
        try {
            await getVisitDiseaseList(this.state.idWizyta, source).then((res) => {
                if (res) {
                    console.log(res.data)
                    this.setState({
                        isLoaded: true,
                        chorobyWizyta: res.data
                    });
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    fetchMedicaments = async () => {
        try {
            await getVisitMedicamentList(this.state.idWizyta, source).then((res) => {
                if (res) {
                    console.log(res.data)
                    this.setState({
                        isLoaded: true,
                        leki: res.data
                    });
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        CancelToken = axios.CancelToken;
        source = CancelToken.source();
        this.fetchVisitDetails()
        this.fetchPrescriptionDetails()
        this.fetchServices()
        this.fetchDiseases()
        this.fetchMedicaments()
    }

    componentWillUnmount() {
        if (source) {
            source.cancel('Operation canceled by the user.');
        }
    }

    render() {
        const {wizyta, uslugi, chorobyWizyta, recepta, lekiRecepta, idWizyta} = this.state
        const {t} = this.props;

        return (
            <div className="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3 mb-3">
                <div className="w-full lg:w-1/6 lg:px-6 text-gray-800 leading-normal">
                    <p className="text-base font-bold py-2 text-xl lg:pb-6 text-gray-700">{t('wizyta.visitDetails')}</p>
                    {dayjs(dayjs(wizyta.DataRozpoczecia)).isAfter(new Date()) && wizyta.Status === 'Zaplanowana' &&
                        <VisitDetailsMenu idWizyta={idWizyta} idKlient={wizyta.IdKlient}/>
                    }
                </div>
                <div
                    className="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 leading-normal bg-white border border-gray-400 rounded text-gray-700">
                    <form className="w-full max-w">
                        <div className="flex flex-wrap -mx-3 mb-4 border-b">
                            <div className="w-full px-3">
                                <label className="block tracking-wide text-s font-bold mb-2">
                                    {t('wizyta.table.patient')}
                                </label>
                                <input
                                    className="shadow-xl form-textarea block w-full md:w-4/6 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight mb-6 bg-gray-100"
                                    name="Pacjent" id="Pacjent" type="text"
                                    value={wizyta.Pacjent ? wizyta.Pacjent : "-"}
                                    disabled/>
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-4 border-b">
                            <div className="w-full px-3">
                                <label className="block tracking-wide text-s font-bold mb-2">
                                    {t('wizyta.table.vet')}
                                </label>
                                <input
                                    className="shadow-xl form-textarea block w-full md:w-4/6 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight mb-6 bg-gray-100"
                                    name="Nazwa" id="Nazwa" type="text" value={wizyta.Weterynarz}
                                    disabled placeholder=""/>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6 border-b">
                            <div className="w-full md:w-2/6 px-3 mb-6 md:mb-0">
                                <label className="block tracking-wide text-s font-bold mb-2">
                                    {t('wizyta.table.startDate')}
                                </label>
                                <input
                                    className="shadow-xl form-textarea block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight mb-6 bg-gray-100"
                                    name="DataRozpoczecia" id="DataRozpoczecia" type="text"
                                    value={wizyta.DataRozpoczecia != null ? getFormattedDateWithHour(wizyta.DataRozpoczecia) : "-"}
                                    placeholder="" disabled/>
                            </div>
                            <div className="w-full md:w-2/6 px-3 mb-6 md:ml-8">
                                <label className="block tracking-wide text-s font-bold mb-2"
                                       form="grid-last-name">
                                    {t('wizyta.table.endDate')}
                                </label>
                                <input
                                    className="shadow-xl form-textarea appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight bg-gray-100"
                                    name="DataZakonczenia" id="DataZakonczenia" type="text"
                                    value={wizyta.DataZakonczenia != null ? getFormattedDateWithHour(wizyta.DataZakonczenia) : "-"}
                                    placeholder="" disabled/>
                            </div>
                        </div>
                        <div className="mb-6 border-b">
                            <label className="block mt-5 font-bold md:text-left mb-6 " id="Opis">
                                {t("wizyta.table.description")}
                            </label>
                            <div className="md:w-3/4 mt-5">
                                <textarea
                                    className="shadow-xl form-textarea block w-full mb-6 bg-gray-100"
                                    id="Opis"
                                    name="Opis"
                                    value={wizyta.Opis}
                                    rows="5"
                                    disabled/>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6 border-b">
                            <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                                <label className="block tracking-wide text-s font-bold mb-2"
                                       form="grid-city">
                                    {t('wizyta.table.clientNote')}
                                </label>
                                <textarea
                                    className="shadow-xl form-textarea block w-full focus:bg-white mb-6 bg-gray-100"
                                    id="Notatka"
                                    name="Notatka"
                                    value={wizyta.NotatkaKlient}
                                    rows="5"
                                    disabled/>
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 mt-6 md:ml-14 md:mb-0">
                                <div className="mb-6">
                                    <label className="block tracking-wide text-s font-bold mb-2"
                                           form="grid-city">
                                        {t('wizyta.table.isPaid')}
                                    </label>
                                    {wizyta.CzyOplacona === true &&
                                        <svg className="h-12 w-12 text-black mb-5"
                                             viewBox="0 0 24 24"
                                             stroke="currentColor"
                                             fill="none">
                                            <path stroke="none" d="M0 0h24v24H0z"/>
                                            <path d="M5 12l5 5l10 -10"/>
                                        </svg>
                                    }
                                    {wizyta.CzyOplacona === false &&
                                        <svg className="h-12 w-12 text-black mb-5"
                                             fill="none"
                                             viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap mb-6">
                            <div className="w-full md:w-2/6">
                                <label className="block tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-last-name">
                                    {t('wizyta.table.status')}
                                </label>
                                <input
                                    className="shadow-xl form-textarea block w-full md:w-4/6 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight mb-6 bg-gray-100"
                                    name="Status"
                                    id="Status"
                                    type="text"
                                    value={t('wizyta.status.' + wizyta.Status)} placeholder=""
                                    disabled/>
                            </div>
                            <div className="w-full md:w-2/6 mb-6 md:mb-0 md:ml-8">
                                <label className="block tracking-wide text-gray-700 text-s font-bold mb-2">
                                    {t('wizyta.table.price')}
                                </label>
                                <input
                                    className="shadow-xl form-textarea block w-full md:w-4/6 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight mb-6 bg-gray-100"
                                    name="Cena" id="Cena" type="text" value={wizyta.Cena} placeholder=""
                                    disabled/>
                            </div>
                        </div>
                    </form>

                    {(chorobyWizyta.length !== 0) &&
                        <div>
                            <div className="flex justify-between mt-12">
                                <h2 className=" w-1/3 my-2  mb-6 text-xl font-black leading-tight text-gray-600">
                                    {t('choroba.title')}</h2>
                            </div>
                            <div className="relative overflow-x-auto  shadow-xl sm:rounded-lg ">
                                <table className="w-full shadow-xl text-sm text-left text-gray-700 dark:text-gray-400">
                                    <thead
                                        className="text-s text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {chorobyWizyta.map(x => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600"
                                            key={x.ID_Choroba}>
                                            <td className=" px-8 py-2 ">• {x.Nazwa}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>}

                    {(uslugi.length !== 0) &&
                        <div>
                            <div className="flex justify-between mt-14">
                                <h2 className=" w-1/3 my-2 mb-6 text-2xl  font-black leading-tight text-gray-800">
                                    {t('usluga.title')}</h2>
                            </div>
                            <div className="relative overflow-x-auto shadow-xl sm:rounded-lg ">
                                <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
                                    <thead
                                        className="text-s text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 uppercase py-3 text-center">
                                            {t("usluga.fields.name")}</th>
                                        <th scope="col" className="px-6 uppercase py-3 text-center">
                                            {t("usluga.fields.narcosis")}</th>
                                        <th scope="col" className="px-6 uppercase py-3 text-center">
                                            {t("usluga.fields.price")}</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {uslugi.map(x => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600"
                                            key={x.idUsluga}>
                                            <td className="px-6 py-2 text-center">{x.NazwaUslugi}</td>
                                            <td className="px-6 py-2 text-center">{x.Narkoza === false ? t("other.no") : t("other.yes")} </td>
                                            <td className="px-6 py-2 text-center">{x.Cena}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                    {recepta !== '' &&
                        <div>
                            <div className="flex justify-between mt-14">
                                <h2 className=" w-1/3 my-2 mb-6 text-2xl font-black leading-tight text-gray-800">
                                    {t('recepta.title')}</h2>
                            </div>
                            <div className="border-4 border-blue-200  h-fit ml-3 shadow-xl rounded-md mx-20">
                                <h2 className=" w-1/3 my-8 mb-5 ml-4 text-lg font-bold leading-tight  text-gray-600">
                                    {t('recepta.fields.medicines')}</h2>
                                <div className="overflow-x-auto shadow-xl">
                                    <table className="w-full    text-sm text-left text-gray-700 dark:text-gray-400">
                                        <thead
                                            className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 uppercase py-3 text-center">
                                                {t("lek.fields.name")}</th>
                                            <th scope="col" className="px-6 uppercase py-3 text-center">
                                                {t("lek.fields.quantity")}</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {lekiRecepta.map(x => (
                                            <tr className="bg-white  dark:bg-gray-800  dark:hover:bg-gray-600"
                                                key={x.ID_lek}>
                                                <td className="px-6 py-2 text-center">{x.Nazwa}</td>
                                                <td className="px-6 py-2 text-center">{x.Ilosc} {x.JednostkaMiary}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                                <h2 className=" w-1/3 my-8 mb-5 ml-4 text-lg font-bold leading-tight  text-gray-600">
                                    {t('recepta.fields.recommendations')}</h2>
                                <textarea
                                    className="shadow-xl form-textarea block w-4/5 focus:bg-white mb-4 px-2 ml-4"
                                    id="Notatka"
                                    name="Notatka"
                                    value={recepta.Zalecenia}
                                    rows="6"
                                    disabled/>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const withRouter = WrappedComponent => props => {
    const params = useParams();

    return (
        <WrappedComponent
            {...props}
            params={params}
        />
    );
};
const withNavigate = Component => props => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate}/>;
};


export default withTranslation()(withNavigate(withRouter(VisitDetails)));