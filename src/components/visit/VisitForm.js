import React from 'react';
import Calendar from 'react-calendar';
import {useNavigate, useParams} from "react-router";
import AvailableVisitDates from "./AvailableVisitDates";
import dayjs from 'dayjs';
import {getScheduleForVisit} from "../../axios/ScheduleApiCalls";
import {getFormattedDateWithHour} from "../../helpers/dateFormat";
import {withTranslation} from "react-i18next";
import {getVisitDetails, rescheduleVisit, createVisit} from "../../axios/VisitApiCalls";
import formMode from "../../helpers/FormMode";
import {getPatientClientList, getPatientClientList2} from "../../axios/PatientApiCalls";
import {isAdmin, isClient, isVet} from "../../helpers/authHelper";
import axios from "axios";

let CancelToken
let source

class VisitForm extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdWizyta = this.props.params.IdWizyta
        const currentFormMode = paramsIdWizyta ? formMode.EDIT : formMode.NEW
        const paramsIdKlient = this.props.params.IdKlient
        this.state = {
            data: {
                Pacjent: '',
                Notatka: '',
                Termin: ''
            },
            errors: {
                Pacjent: '',
                Notatka: '',
                Termin: ''
            },
            wizyta: {
                Data: '',
                Dzien: '',
                weterynarz: ''
            },
            ID_klient: paramsIdKlient,
            list: [],
            date: new Date(),
            harmonogram: [],
            day: '',
            idWizyta: paramsIdWizyta,
            formMode: currentFormMode,
            idKlient: paramsIdKlient
        }
    }

    async componentDidMount() {
        CancelToken = axios.CancelToken;
        source = CancelToken.source();
        if (this.state.formMode === formMode.EDIT) {
            try {
                await getVisitDetails(this.state.idWizyta, source).then((res) => {
                    if (res) {
                        const data1 = {...this.state.data}
                        data1['Pacjent'] = res.data.IdPacjent
                        data1['Notatka'] = res.data.NotatkaKlient
                        data1['ID_klient'] = res.data.IdKlient

                        this.setState({
                            data: data1
                        });
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }

        if (isClient()) {
            try {
                await getPatientClientList2(source).then((res) => {
                    if (res) {
                        console.log(res.data)
                        this.setState({
                            isLoaded: true,
                            list: res.data
                        });
                    }
                })
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                await getPatientClientList(this.state.idKlient, source).then((res) => {
                    if (res) {
                        console.log(res.data)
                        this.setState({
                            isLoaded: true,
                            list: res.data
                        });
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
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
        if (fieldName === 'Pacjent') {
            if (!fieldValue) {
                errorMessage = `${t('validation.required')}`
            }
        }
        if (fieldName === 'Termin') {

            if (!fieldValue) {
                errorMessage = `${t('validation.required')}`
            }
        }
        if (fieldName === 'Notatka') {
            if (fieldValue.length > 300) {
                errorMessage = `${t('validation.max300nullable')}`
            }
        }
        return errorMessage
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

    handleVisit = async () => {
        const {navigate} = this.props;
        const data = {...this.state.data}
        const wizyta = {...this.state.wizyta}

        const isValid = this.validateForm()
        if (isValid) {
            let newData
            if (isVet() || isAdmin()) {
                newData = {
                    ID_Harmonogram: data["Termin"],
                    ID_Pacjent: data["Pacjent"],
                    Notatka: data["Notatka"],
                    ID_Klient: this.state.idKlient
                }
            } else {
                newData = {
                    ID_Harmonogram: data["Termin"],
                    ID_Pacjent: data["Pacjent"],
                    Notatka: data["Notatka"]
                    //ID_klient: ''
                }
            }

            console.log(newData)
            try {
                if (this.state.formMode === formMode.NEW) {
                    await createVisit(newData, source)
                } else {
                    await rescheduleVisit(this.state.idWizyta, newData, source)
                }
                navigate(
                    "/potwierdzenieWizyty",
                    {
                        state: {
                            Data: wizyta.Data
                        }
                    })
            } catch (error) {
                console.log(error)
            }
        }
    }

    componentWillUnmount() {
        if (source) {
            source.cancel('Operation canceled by the user.');
        }
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


    onChange = async (date) => {
        const {t} = this.props;
        this.setState({selectedDate: date});
        const errors = {...this.state.errors}

        if (date > new Date()) {
            try {
                await getScheduleForVisit(dayjs(date).format('YYYY-MM-DD'), source).then((res) => {
                    if (res) {
                        console.log(res.data)
                        this.setState({
                            isLoaded: true,
                            harmonogram: res.data
                        });
                    }
                })
            } catch (error) {
                console.log(error)
            }
            errors["Termin"] = ""
        } else {

            const wizyta = {...this.state.wizyta}
            const data = {...this.state.data}

            errors["Termin"] = `${t('validation.date1')}`
            data["Termin"] = ''
            wizyta["Data"] = ''
            wizyta["Dzien"] = ''
            wizyta["Weterynarz"] = ''
            this.setState({
                harmonogram: [],
                data: data,
                wizyta: wizyta,
                errors: errors
            });

        }
        this.setState({
            errors: errors
        })
    }

    handleHarmonogramSelect = (harmonogram) => {
        const data = {...this.state.data}
        const wizyta = {...this.state.wizyta}
        const errors = {...this.state.errors}

        console.log(harmonogram)
        errors["Data"] = ''
        data["Termin"] = harmonogram.IdHarmonogram
        wizyta["Data"] = getFormattedDateWithHour(harmonogram.Data)
        wizyta["Dzien"] = harmonogram.Dzien
        wizyta["Weterynarz"] = harmonogram.Weterynarz
        this.setState({
            wizyta: wizyta,
            data: data,
            errors: errors
        })
    }

    render() {
        const {navigate} = this.props
        const {list, harmonogram, errors, date, wizyta, data} = this.state
        const {t} = this.props;
        const pageTitle = this.state.formMode === formMode.NEW ? t('wizyta.makeAnAppointment') : t('wizyta.postpone')

        return (
            <div className="container w-full flex flex-wrap mx-auto px-2 lg:pt-3 mt-3 mb-3">
                <div className="w-full lg:w-1/6 lg:px-6 text-gray-800 leading-normal">
                    <p className="text-base font-bold py-2 text-xl lg:pb-6 text-gray-700">{pageTitle}</p>
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
                                <select name="Pacjent" id="Pacjent" onChange={this.handleChange}
                                        className="shadow-xl form-select block w-full focus:bg-white">
                                    <option value="">{t("wizyta.selectPatient")}</option>
                                    {
                                        list.map(pacjent => (
                                            <option
                                                selected={pacjent.IdPacjent === data.Pacjent}
                                                value={pacjent.IdPacjent}>{pacjent.Nazwa}</option>
                                        ))}
                                    <option value="0">{t("wizyta.other")}</option>
                                </select>
                            </div>
                            <span id="errorPacjent" className="errors-text2">{errors.Pacjent}</span>
                        </div>
                    </section>
                    <section className="bg-white-100 border-b mt-7">
                        <label className="block  text-gray-600 font-bold md:text-left mb-6" form="my-select">
                            {t("wizyta.field.date")}
                        </label>
                        <Calendar className="mb-7"
                                  value={date}
                                  onClickDay={this.onChange}
                        />
                        {<AvailableVisitDates showTime={harmonogram.length} harmonogram={harmonogram}
                                     timeChange={this.handleHarmonogramSelect}/>}
                        <span id="errorData" className="errors-text2 mb-4">{errors.Termin}</span>
                        <span id="" className="">{wizyta.Data === '' ? '' :
                            t("wizyta.selectedDate") + wizyta.Data.replaceAll("-", ".") + " (" + t('other.day.' + wizyta.Dzien) + ") - " + wizyta.Weterynarz}
                            </span>
                    </section>
                    <div>
                        <label className="block mt-5 text-gray-600 font-bold md:text-left mb-6 " id="Notatka">
                            {t("wizyta.field.description")}
                        </label>
                        <div className="md:w-3/4 mt-5">
                            <textarea className="shadow-xl form-textarea block w-full focus:bg-white " id="Notatka"
                                      name="Notatka" value={data.Notatka}
                                      rows="5" onChange={this.handleChange}/>
                        </div>
                    </div>
                    <span id="errorOpis" className="errors-text2">{errors.Notatka}</span>
                    <div className=" md:flex mb-6 mt-8 ">
                        <div className="flex pb-3">
                            <button onClick={() => navigate(-1)}
                                    className="shadow-xl bg-red-500 hover:bg-white  hover:text-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                    type="button">
                                {t("button.back")}
                            </button>
                            <button onClick={() => this.handleVisit()}
                                    className="shadow-xl ml-4 shadow bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                {t("button.next")}
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

export default withTranslation()(withNavigate(withRouter(VisitForm)))