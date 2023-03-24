import React from "react";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {getFormattedDateWithHour} from "../../helpers/dateFormat";
import {getWizytaDetails, updateWizyta} from "../../../axios/WizytaAxiosCalls";
import FormularzWizytaMenu from "../../fragments/FormularzWizytaMenu";
import {CheckTextRange} from "../../helpers/CheckTextRange";
import {acceptUslugaWizyta} from "../../../axios/WizytaUslugaAxionCalls";
import {getKlientPacjentList} from "../../../axios/PacjentAxiosCalls";
import axios from "axios";

let CancelToken
let source
class Info extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdWizyta = this.props.params.IdWizyta
        this.state = {
            wizyta: '',
            data: {
                Opis: '',
                ID_Pacjent:''
            },
            errors: {
                Opis: '',
                ID_Pacjent:''

            },
            idWizyta: paramsIdWizyta,
            pacjenci: [],
            message: ''
        }
    }


    componentDidMount = async () => {
        CancelToken = axios.CancelToken;
        source = CancelToken.source();
        try {
            let klientId;
            const res1 = await getWizytaDetails(this.state.idWizyta, source)
                if (res1) {
                    klientId = res1.data.IdKlient
                    this.setState({
                        isLoaded: true,
                        wizyta: res1.data
                    });
                    const data1 = this.state.data
                    data1['Opis'] = res1.data.Opis
                    data1['ID_Pacjent']= res1.data.IdPacjent
                    this.setState({
                        isLoaded: true,
                        data: data1
                    });
                }


            const res2 = await getKlientPacjentList(klientId, source)
                if (res2) {
                    this.setState({
                        isLoaded: true,
                        pacjenci: res2.data
                    });
                }
        } catch (error) {
            console.log(error)
        }
    }
    componentWillUnmount() {
        if (source) {
            source.cancel('Operation canceled by the user.');
        }
    }

    validateForm = () => {
        const data = this.state.data
        const errors = this.state.errors
        for (const fieldName in data) {
            const fieldValue = data[fieldName]
            errors[fieldName] = this.validateField(fieldName, fieldValue)
        }

        this.setState({
            errors: errors
        })
        return !this.hasErrors();
    }

    hasErrors = () => {
        const errors = this.state.errors
        for (const errorField in this.state.errors) {
            if (errors[errorField].length > 0) {
                return true
            }
        }
        return false
    }

    handleChange = (event) => {
        const {name, value} = event.target
        const data = {...this.state.data}
        data[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = {...this.state.errors}
        errors[name] = errorMessage

        this.setState({
            data: data,
            errors: errors
        })

    }
    validateField = (fieldName, fieldValue) => {
        const {t} = this.props;
        let errorMessage = '';
        if (fieldName === 'Opis') {
            if (!CheckTextRange(fieldValue, 2, 500)) {
                errorMessage = t('validation.max500')
            }
            if (!fieldValue) {
                errorMessage = `${t('validation.required')}`
            }
        }
        if (fieldName === 'ID_Pacjent') {
            if (!fieldValue) {
                errorMessage = `${t('validation.required')}`
            }
        }
        return errorMessage;
    }

    updateWizyta = async () => {
        if(this.validateForm()) {
            const {navigate} = this.props;
            try {
                await updateWizyta(this.state.idWizyta, this.state.data, source)
                await navigate(`/wizyty/${this.state.idWizyta}`, {replace: true});
            } catch (error) {
                console.log(error)
            }
        }
    }

    zaakceptujCene = async () => {
        const {navigate} = this.props;
        try {
            await acceptUslugaWizyta(this.state.idWizyta, source)
            navigate(0, {replace: true});
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const {wizyta, idWizyta, data, errors, pacjenci} = this.state
        const {t} = this.props;

        return (
            <div class="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3 mb-3">
                <div class="w-full lg:w-1/6 lg:px-6 text-gray-800 leading-normal">
                    <FormularzWizytaMenu idWizyta={idWizyta}/>

                </div>
                <div
                    className="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                        <section className="bg-white-100 border-b  mb-7">
                            <div className=" md:flex mb-6 mt-4">
                                <label className="block text-gray-600 font-bold md:text-left mb-3 mt-2 md:mb-0 pr-7"
                                       htmlFor="Pacjent">
                                    {t("wizyta.field.patient")}
                                </label>
                                <div className="md:w-3/5">

                                    <select  name="ID_Pacjent" id="Pacjent" onChange={this.handleChange}
                                            className="shadow-xl form-select block w-full focus:bg-white">
                                        <option value="">{t("wizyta.selectPatient")}</option>
                                        {
                                            pacjenci.map(pacjent => (
                                                <option
                                                    selected={pacjent.IdPacjent === data.ID_Pacjent}
                                                    value={pacjent.IdPacjent}>{pacjent.Nazwa}</option>
                                            ))}
                                        <option value="0">{t("wizyta.other")}</option>

                                    </select>
                                </div>
                                <span id="errorPacjent" className="errors-text2">{errors.ID_Pacjent}</span>
                            </div>
                        </section>

                        <div class="flex flex-wrap -mx-3 mb-4 border-b">
                            <div class="w-full px-3">
                                <label class="block tracking-wide text-gray-600 text-s font-bold mb-2">
                                    {t('wizyta.table.vet')}
                                </label>
                                <input
                                    class=" shadow-xl form-textarea appearance-none block w-4/6 bg-gray-200  text-gray-700 border border-gray-200 rounded py-1 px-4 mb-6 leading-tight focus:outline-none focus:bg-white "
                                    name="Nazwa" id="Nazwa" type="text" value={wizyta.Weterynarz}
                                    disabled placeholder=""/>
                            </div>
                        </div>

                        <div class="flex flex-wrap -mx-3 mb-6 border-b">
                            <div class="w-full md:w-2/6 px-3 mb-6 md:mb-0">
                                <label class="block  tracking-wide text-gray-600 text-s font-bold mb-2">
                                    {t('wizyta.table.startDate')}
                                </label>
                                <input
                                    class="shadow-xl form-textarea appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-6 leading-tight focus:border-blue-600 "
                                    name="DataRozpoczecia" id="DataRozpoczecia" type="text"
                                    value={wizyta.DataRozpoczecia != null ? getFormattedDateWithHour(wizyta.DataRozpoczecia) : "-"}
                                    placeholder="" disabled/>
                            </div>
                            <div class="w-full md:w-2/6 px-3 ml-8">
                                <label class="block  tracking-wide text-gray-600 text-s font-bold mb-2"
                                       form="grid-last-name">
                                    {t('wizyta.table.endDate')}
                                </label>
                                <input
                                    class="shadow-xl form-textarea appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="DataZakonczenia" id="DataZakonczenia" type="text"
                                    value={wizyta.DataZakonczenia != null ? getFormattedDateWithHour(wizyta.DataZakonczenia) : "-"}
                                    placeholder="" disabled/>
                            </div>
                        </div>
                        <div class=" mb-6 border-b">
                            <label class="block mt-5 text-gray-600 font-bold md:text-left mb-6 " id="Opis">
                                {t("wizyta.table.description")}
                            </label>
                            <div class="md:w-3/4 mt-5">
                          <textarea class="shadow-xl form-textarea block w-full focus:bg-white mb-6" id="Opis"
                                    name="Opis"
                                    value={data.Opis} rows="5" onChange={this.handleChange}/>
                            </div>
                            <span className="errors-text2 my-6">{errors.Opis}</span>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6 border-b">
                            <div class="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                                <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-city">
                                    {t('wizyta.table.clientNote')}
                                </label>
                                <textarea class="shadow-xl form-textarea block w-full focus:bg-white mb-6" id="Notatka"
                                          name="Notatka"
                                          value={wizyta.NotatkaKlient} rows="5"
                                          disabled/>
                            </div>
                            <div class="w-full md:w-1/3 px-3 mb-6 mt-6 ml-14 md:mb-0">
                                <div className=" mb-6">
                                    <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                           form="grid-city">
                                        {t('wizyta.table.isPaid')}
                                    </label>
                                    {wizyta.CzyOplacona === true &&
                                        <svg class="h-8 w-8 text-black mb-5 shadow-xl " width="24" height="24"
                                             viewBox="0 0 24 24"
                                             stroke="currentColor" fill="none" stroke-linecap="round"
                                             strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z"/>
                                            <path d="M5 12l5 5l10 -10"/>
                                        </svg>}
                                    {wizyta.CzyOplacona === false &&
                                        <svg class="h-8 w-8 text-black mb-5 shadow-xl" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path stroke-linecap="round" strokeLinejoin="round"
                                                  d="M6 18L18 6M6 6l12 12"/>
                                        </svg>}
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-wrap  mb-6 ">
                            <div class="w-full md:w-2/6 px-3 ">
                                <label class="block  tracking-wide text-gray-600 text-s font-bold mb-2"
                                       form="grid-last-name">
                                    {t('wizyta.table.status')}
                                </label>
                                <input
                                    class="shadow-xl form-textarea appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="Status" id="Status" type="text"
                                    value={t('wizyta.status.' + wizyta.Status)} placeholder=""
                                    disabled/>
                            </div>
                            <div className="w-full md:w-2/6 px-3 mb-6 md:mb-0 ml-8">
                                <label className="block  tracking-wide text-gray-600 text-s font-bold mb-2">
                                    {t('wizyta.table.price')}
                                </label>
                                <input
                                    className="shadow-xl form-textarea appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:border-blue-600 "
                                    name="Cena" id="Cena" type="text" value={wizyta.Cena} placeholder=""
                                    disabled/>
                            </div>
                            {wizyta.CzyZaakceptowanaCena === false &&
                                <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0 ml-8">
                                    <button onClick={() => this.zaakceptujCene()}
                                            className=" ml-4 mt-8 shadow-xl bg-green-400 hover:bg-white  hover:text-green-400  focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                        Zaakceptuj cene
                                    </button>
                                </div>
                            }
                        </div>
                    <div className=" md:flex mb-6 mt-8 ">
                        <div className="flex pb-3">
                            <button
                                className="shadow-xl bg-red-500 hover:bg-white  hover:text-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                type="button">
                                {t("button.back")}
                            </button>
                            <button onClick={() => this.updateWizyta()}
                                    className=" ml-4 shadow-xl bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                {t("button.confirm")}
                            </button>
                        </div>
                    </div>
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


export default withTranslation()(withNavigate(withRouter(Info)));