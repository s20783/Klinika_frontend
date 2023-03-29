import React from 'react';
import Calendar from 'react-calendar';
import {useNavigate} from "react-router";
import dayjs from 'dayjs';
import {CheckTextRange} from "../helpers/CheckTextRange";
import formMode from "../helpers/FormMode";
import {withTranslation} from "react-i18next";
import {addPacjent, getPacjentDetails, updatePacjent} from "../../axios/PacjentAxiosCalls";
import axios from "axios";
let CancelToken
let source

class DodaniePacjentaForm extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdPacjent = this.props.idPacjent
        const currentFormMode = paramsIdPacjent ? formMode.EDIT : formMode.NEW
        this.state = {
            data: {
                IdOsoba: '',
                Nazwa: '',
                Gatunek: '',
                Rasa: '',
                Waga: null,
                Masc: '',
                Plec: '',
                DataUrodzenia: '',
                Agresywne: false,
                Ubezplodnienie: false
            },
            errors: {
                IdOsoba: '',
                Nazwa: '',
                Gatunek: '',
                Rasa: '',
                Waga: '',
                Masc: '',
                Plec: '',
                DataUrodzenia: '',
                Agresywne: '',
                Ubezplodnienie: ''
            },
            klienci: this.props.klienci,
            date: new Date(),
            idPacjent: paramsIdPacjent,
            formMode: currentFormMode,
            message: '',
        }
    }

    componentDidMount() {
        CancelToken = axios.CancelToken;
        source = CancelToken.source();
        if (this.state.formMode === formMode.EDIT) {
            this.fetchPatientDetails();
        }
    }

    componentWillUnmount() {
        if (source) {
            source.cancel('Operation canceled by the user.');
        }
    }

    fetchPatientDetails = async () => {
        try{
            await getPacjentDetails(this.state.idPacjent, source)
                .then((res) => {
                if (res) {
                    this.setState({
                        isLoaded: true,
                        data: res.data
                    });
                }
            })
        } catch (error){
            console.log(error)
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

        if (fieldName === 'IdOsoba') {
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        if (fieldName === 'Nazwa') {
            if (!CheckTextRange(fieldValue, 2, 50)) {
                errorMessage = t('validation.max50')
            }
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        if (fieldName === 'Gatunek') {
            if (!CheckTextRange(fieldValue, 2, 50)) {
                errorMessage = t('validation.max50')
            }
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        if (fieldName === 'Rasa') {
            if (!CheckTextRange(fieldValue, 2, 50)) {
                errorMessage = t('validation.max50')
            }
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        if (fieldName === 'Waga') {
            if (fieldValue < 0 || fieldValue > 999) {
                errorMessage = t('validation.weight')
            }
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        if (fieldName === 'Masc') {
            if (!CheckTextRange(fieldValue, 2, 50)) {
                errorMessage = t('validation.max50')
            }
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        if (fieldName === 'DataUrodzenia') {
            if (dayjs(fieldValue).diff(dayjs(new Date())) > 0) {
                errorMessage = t('validation.date')
            }
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        if (fieldName === 'Plec') {
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        return errorMessage
    }

    onChange = (date) => {
        const data = {...this.state.data}
        data['DataUrodzenia'] = dayjs(date).format()

        const errorMessage = this.validateField('DataUrodzenia', date)
        const errors = {...this.state.errors}
        errors['DataUrodzenia'] = errorMessage

        this.setState({
            data: data,
            errors: errors
        })
    }

    onChange1 = (event) => {
        const {name} = event.target
        const data = {...this.state.data}
        data[name] = !data[name]

        this.setState({
            data: data,
        })
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

    handleSubmit = async (event) => {
        event.preventDefault();
        const {navigate} = this.props;
        const isValid = this.validateForm()
        const dane = {...this.state}

        if (isValid) {
            if (dane.formMode === formMode.NEW) {
                try {
                    await addPacjent(dane.data, source)
                    await navigate("/pacjenci", {replace: true});
                } catch (error) {
                    console.log(error)
                }
            } else if (dane.formMode === formMode.EDIT) {
                try {
                    await updatePacjent(dane.data, dane.idPacjent, source)
                    await navigate("/pacjenci", {replace: true});
                } catch (error) {
                    console.log(error)
                }
            }
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

    render() {
        const {navigate} = this.props
        const {klienci, data, errors, date} = this.state
        const {t} = this.props;
        const {i18n} = this.props;
        let language = i18n.language

        return (
            <div
                className="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                <form onSubmit={this.handleSubmit} className="w-full max-w">
                    <section className="bg-white-100 border-b  mb-5">
                        <div className=" md:flex mb-6 mt-4">
                            <label className="block text-gray-600 font-bold md:text-left mb-3 mt-2 md:mb-0 pr-7"
                                   htmlFor="Wlasciciel">
                                {t('pacjent.fields.owner')}
                            </label>
                            <div class="md:w-3/5">
                                <select name="IdOsoba" id="Wlasciciel" onChange={this.handleChange}
                                        className={errors.IdOsoba ? "shadow-xl form-select block w-full focus:bg-red" : "shadow-xl form-select block w-full focus:bg-white"}>
                                    <option value="">{t('pacjent.selectOwner')}</option>
                                    {
                                        klienci.map(klient => (
                                            <option key={klient.IdOsoba} selected={data.IdOsoba === klient.IdOsoba}
                                                    value={klient.IdOsoba}>{klient.Imie} {klient.Nazwisko}</option>
                                        ))}
                                </select>
                            </div>
                            <span id="errorWlasciciel" className="errors-text2 mt-4">{errors.IdOsoba}</span>
                        </div>
                    </section>
                    <div className="flex flex-wrap -mx-3 mb-4 border-b">
                        <div className="w-full px-3">
                            <label class="block tracking-wide text-gray-600 text-s font-bold mb-2">
                                {t('pacjent.fields.name')}
                            </label>
                            <input
                                class="shadow-xl form-textarea appearance-none block w-full md:w-4/6  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-blue-600"
                                name="Nazwa" id="Nazwa" type="text" value={data.Nazwa}
                                onChange={this.handleChange} placeholder=""/>
                        </div>
                        <span id="errorNazwa" className="errors-text2 mb-4 ml-4">{errors.Nazwa}</span>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6 border-b">
                        <div className="w-full md:w-2/6 px-3 mb-6 md:mb-0">
                            <label class="block  tracking-wide text-gray-600 text-s font-bold mb-2">
                                {t('pacjent.fields.species')}
                            </label>
                            <input
                                className="shadow-xl form-textarea appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-6 leading-tight focus:border-blue-600"
                                name="Gatunek" id="Gatunek" type="text" value={data.Gatunek} placeholder=""
                                onChange={this.handleChange}/>
                            <span id="errorGatunek" className="errors-text2 mb-4 ">{errors.Gatunek}</span>
                        </div>
                        <div className="w-full md:w-2/6 px-3 md:ml-8">
                            <label class="block  tracking-wide text-gray-600 text-s font-bold mb-2"
                                   form="grid-last-name">
                                {t('pacjent.fields.breed')}
                            </label>
                            <input
                                className="shadow-xl form-textarea appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight leading-tight focus:border-blue-600 "
                                name="Rasa" id="Rasa" type="text" value={data.Rasa} placeholder=""
                                onChange={this.handleChange}/>
                            <span id="errorRasa" className="errors-text2 mb-4 ">{errors.Rasa}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6 border-b">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" form="grid-city">
                                {t('pacjent.fields.weight')}
                            </label>
                            <input
                                className="shadow-xl form-textarea appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-6 leading-tight focus:border-blue-600 "
                                name="Waga" id="Waga" step="0.01" type="number" value={data.Waga}
                                onChange={this.handleChange} placeholder=""/>
                            <span id="errorWaga" className="errors-text2 mb-4 ">{errors.Waga}</span>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:ml-8 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" form="grid-city">
                                {t('pacjent.fields.color')}
                            </label>
                            <input
                                className="shadow-xl form-textarea appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight leading-tight focus:border-blue-600 "
                                name="Masc" id="Masc" type="text" value={data.Masc} placeholder=""
                                onChange={this.handleChange}/>
                            <span id="errorMasc" className="errors-text2 mb-4 ">{errors.Masc}</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6 ">
                        <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                            <label className="block  tracking-wide text-gray-700 text-s font-bold mb-2" form="grid-city">
                                {t('pacjent.fields.birthdate')}
                            </label>
                            <Calendar className="mb-7 calendarForm"
                                      value={date}
                                      onClickDay={this.onChange}
                                      locale={language}
                            />
                            <span id="" className="">
                                 {data.DataUrodzenia === '' || errors.DataUrodzenia !== '' ?
                                     '' : t('other.selectedDate') + dayjs(data.DataUrodzenia).format('YYYY-MM-DD')}</span>
                            <span id="errorData" className="errors-text2 mb-4">
                                {errors.DataUrodzenia}
                            </span>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 mt-6 ml-2 md:mb-0">
                            <div className="border-b mb-4">
                                <label className="block  tracking-wide text-gray-700 text-s font-bold mb-2" form="grid-city">
                                    {t('pacjent.fields.gender')}
                                </label>
                                <label className="inline-flex  items-center">
                                    <input name="Plec" id="Plec" type="radio" checked={data.Plec === "M"}
                                           className="form-radio"
                                           value="M" onChange={this.handleChange}/>
                                    <span class="ml-2">{t('pacjent.gender.male')}</span>
                                </label>
                                <label className="inline-flex items-center  ml-4 mb-4">
                                    <input name="Plec" id="Plec" type="radio" className="form-radio"
                                           checked={data.Plec === "F"}
                                           value="F" onChange={this.handleChange}/>
                                    <span class="ml-2">{t('pacjent.gender.female')}</span>
                                </label>
                                <span id="errorPlec" className="errors-text2 mb-3 ">{errors.Plec}</span>
                            </div>
                            <div className="border-b mb-6">
                                <label class="block tracking-wide text-gray-700 text-s font-bold mb-2" form="grid-city">
                                    {t('pacjent.fields.infertile')}
                                </label>
                                <input type="checkbox" name="Ubezplodnienie"
                                       checked={data.Ubezplodnienie === true}
                                       className="form-checkbox mb-4 w-8 h-8 text-blue-600" onChange={this.onChange1}/>
                            </div>
                            <div className="border-b mb-6">
                                <label className="block tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-city">
                                    {t('pacjent.fields.aggressive')}
                                </label>
                                <input type="checkbox" value="1" name="Agresywne"
                                       checked={data.Agresywne === true}
                                       className="form-checkbox mb-4 w-8 h-8 text-blue-600" onChange={this.onChange1}/>
                            </div>
                        </div>
                    </div>
                    <div className=" md:flex mb-6 mt-8 ">
                        <div className="flex pb-3">
                            <button onClick={() => navigate(-1)}
                                    className="shadow-xl bg-red-500 hover:bg-white  hover:text-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                    type="button">
                                {t('button.back')}
                            </button>
                            <button type="submit"
                                    className=" ml-4 shadow-xl bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                {t('button.confirm')}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const withNavigate = Component => props => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate}/>;
};


export default withTranslation()(withNavigate(DodaniePacjentaForm));