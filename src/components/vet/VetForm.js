import React from "react";
import formMode from "../../helpers/FormMode";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {CheckTextRange} from "../../helpers/CheckTextRange";
import {addWeterynarz, getWeterynarzDetails, updateWeterynarz} from "../../axios/VetApiCalls";
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import {ValidateEmail} from "../../helpers/ValidateEmail";
import {ValidatePhoneNumber} from "../../helpers/ValidatePhoneNumber";
import {checkNumberRange} from "../../helpers/CheckNRange";
import {getFormattedDate} from "../../helpers/dateFormat";
import axios from "axios";

let CancelToken
let source

class VetForm extends React.Component {
    constructor(props) {
        super(props);

        const paramsIdWeterynarz = this.props.params.IdOsoba
        const currentFormMode = paramsIdWeterynarz ? formMode.EDIT : formMode.NEW

        this.state = {
            data: {
                Imie: '',
                Nazwisko: '',
                NumerTelefonu: '',
                Email: '',
                DataUrodzenia: '',
                DataZatrudnienia: '',
                Pensja: null,
            }, errors: {
                Imie: '',
                Nazwisko: '',
                NumerTelefonu: '',
                Email: '',
                DataUrodzenia: '',
                DataZatrudnienia: '',
                Pensja: '',
            }, dataUroZatr: {
                Data1: false,
            },
            idWeterynarz: paramsIdWeterynarz,
            error: '',
            isLoaded: false,
            formMode: currentFormMode
        }
    }

    async componentDidMount() {
        CancelToken = axios.CancelToken;
        source = CancelToken.source();
        if (this.state.formMode === formMode.EDIT) {
            try {
                await getWeterynarzDetails(this.state.idWeterynarz, source).then((res) => {
                    if (res) {
                        this.setState({
                            isLoaded: true,
                            data: res.data
                        });
                    }
                })
            } catch (e) {
                console.log(e)
            }
        }
    }

    componentWillUnmount() {
        if (source) {
            source.cancel('Operation canceled by the user.');
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
            data: data, errors: errors
        })
    }

    onChange = (date) => {
        const data = {...this.state.data}
        let dataUroLubZatr = ''
        const data1 = {...this.state.dataUroZatr}

        if (data1['Data1'] === true) {
            dataUroLubZatr = 'DataZatrudnienia'
        } else {
            dataUroLubZatr = 'DataUrodzenia'
        }
        console.log(dayjs(date).format())
        data[dataUroLubZatr] = dayjs(date).format()

        const errorMessage = this.validateField(dataUroLubZatr, date)
        const errors = {...this.state.errors}
        errors[dataUroLubZatr] = errorMessage

        this.setState({
            data: data, errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        const {t} = this.props;
        let errorMessage = '';
        if (fieldName === 'Imie') {
            if (!CheckTextRange(fieldValue, 2, 50)) {
                errorMessage = t('validation.max50')
            }
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        if (fieldName === 'Nazwisko') {
            if (!CheckTextRange(fieldValue, 2, 50)) {
                errorMessage = t('validation.max50')
            }
            if (!fieldValue) {
                errorMessage = `${t('validation.required')}`
            }
        }
        if (fieldName === 'NumerTelefonu') {
            if (!ValidatePhoneNumber(fieldValue)) {
                errorMessage = `${t('validation.format')}`
            }
            if (!fieldValue) {
                errorMessage = `${t('validation.required')}`
            }
        }
        if (fieldName === 'DataZatrudnienia') {
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        if (fieldName === 'DataUrodzenia') {
            if (fieldValue > dayjs(new Date())) {
                errorMessage = t('validation.date')
            }
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        if (fieldName === 'Email') {
            if (!CheckTextRange(fieldValue, 6, 50)) {
                errorMessage = t('validation.from6to50')
            }
            if (!ValidateEmail(fieldValue)) {
                errorMessage = `${t('validation.format')}`
            }
            if (!fieldValue) {
                errorMessage = `${t('validation.required')}`
            }
        }
        if (fieldName === 'Pensja') {
            if (!checkNumberRange(fieldValue, 0, 99999)) {
                errorMessage = t('validation.salary')
            }
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        return errorMessage;
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

    onChange1 = (event) => {
        const data = {...this.state.dataUroZatr}
        data['Data1'] = !data['Data1']

        this.setState({
            dataUroZatr: data,
        })
    }


    validateForm = () => {
        const data = this.state.data
        console.log(data)
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
        const dane = {...this.state}
        const isValid = this.validateForm()
        if (isValid) {
            if (dane.formMode === formMode.NEW) {
                try {
                    const response = await addWeterynarz(dane.data, source)
                    console.log(response.data.ID)
                    await navigate(`/czyDodacGodziny/${response.data.ID}`, {replace: true});
                } catch (error) {
                    console.log(error)
                }
            } else if (dane.formMode === formMode.EDIT) {
                try {
                    await updateWeterynarz(dane.data, this.state.idWeterynarz, source)
                    await navigate(-1, {replace: true});
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }

    render() {
        const {data, errors, dataUroZatr} = this.state
        const {t} = this.props;
        const {navigate} = this.props
        const {i18n} = this.props;
        let language = i18n.language
        const pageTitle = this.state.formMode === formMode.NEW ? t('weterynarz.addNewVet') : t('weterynarz.editVet')

        return (
            <div class="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3">
                <div class="w-full lg:w-1/6 lg:px-6 text-gray-800 leading-normal">
                    <p class="text-base font-bold py-2 text-xl lg:pb-6 text-gray-700">{pageTitle}</p>
                </div>
                <div className="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                    <form onSubmit={this.handleSubmit}>
                        <div class="flex flex-wrap -mx-3 mb-6 border-b">
                            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-city">
                                    {t('weterynarz.fields.firstName')}
                                </label>
                                <input
                                    class="shadow-xl form-textarea block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="Imie" id="Imie" type="text" value={data.Imie}
                                    onChange={this.handleChange} placeholder=""/>
                                <span id="errorImie" className="errors-text2 mb-4 ">{errors.Imie}</span>

                            </div>
                            <div class="w-full md:w-1/3 px-3 mb-6 md:ml-8 md:mb-0">
                                <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-city">
                                    {t('weterynarz.fields.lastName')}
                                </label>
                                <input
                                    class="shadow-xl appearance-none form-textarea block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-6 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="Nazwisko" id="Nazwisko" type="text" value={data.Nazwisko}
                                    placeholder="" onChange={this.handleChange}/>
                                <span id="errorNazwisko"
                                      className="errors-text2 mb-4 ">{errors.Nazwisko}</span>
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6 border-b">
                            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-city">
                                    {t('weterynarz.fields.phoneNumber')}
                                </label>
                                <input
                                    class="shadow-xl form-textarea block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="NumerTelefonu" id="NumerTelefonu" type="text"
                                    value={data.NumerTelefonu} onChange={this.handleChange} placeholder=""/>
                                <span id="errorNumerTelefonu"
                                      className="errors-text2 mb-4 ">{errors.NumerTelefonu}</span>
                            </div>
                            <div class="w-full md:w-1/3 px-3 mb-6 md:ml-8 md:mb-0">
                                <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-city">
                                    {t('weterynarz.fields.email')}
                                </label>
                                <input
                                    class="shadow-xl appearance-none form-textarea block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-6 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="Email" id="Email" type="text" value={data.Email} placeholder=""
                                    onChange={this.handleChange}/>
                                <span id="errorEmail" className="errors-text2 mb-4 ">{errors.Email}</span>
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6 ">
                            <div class="w-full md:w-2/4  mb-6 md:mb-0">
                                <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-city">
                                </label>
                                <Calendar className="mb-7 calendarForm"
                                          onClickDay={this.onChange}
                                          locale={language}
                                />
                            </div>
                            <div class="w-full md:w-1/3 px-3 mb-6 mt-6 md:mb-0">
                                <div className="border-b mb-6">
                                    <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                           form="grid-city">
                                        {t('weterynarz.fields.employmentDate')}
                                    </label>
                                    <input type="radio" class="form-radio mb-4" name="Data"
                                           checked={dataUroZatr.Data1 === true} onChange={this.onChange1}/>
                                    <span id="" className="ml-4">

                                {data.DataZatrudnienia === '' || errors.DataZatrudnienia !== '' ? '' : t('other.selectedDate') + getFormattedDate(data.DataZatrudnienia)}
                                    </span>
                                    <span id="errorData" className="errors-text2 mb-4">
                                    {errors.DataZatrudnienia}
                                </span>
                                </div>
                                <div className="border-b mb-6 ">
                                    <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                           form="grid-city">
                                        {t('weterynarz.fields.birthDate')}
                                    </label>
                                    <input type="radio" class="form-radio mb-4" name="Data1"
                                           checked={dataUroZatr.Data1 === false} onChange={this.onChange1}/>
                                    <span id="" className="ml-4">
                                {data.DataUrodzenia === '' || errors.DataUrodzenia !== '' ? '' : t('other.selectedDate') + getFormattedDate(data.DataUrodzenia)}</span>
                                    <span id="errorData" className="errors-text2 mb-4">
                                    {errors.DataUrodzenia}
                                </span>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6 ">
                            <div class="w-full md:w-1/3 px-3 mb-6  md:mb-0">
                                <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-city">
                                    {t('weterynarz.fields.salary')}
                                </label>
                                <input
                                    class="shadow-xl appearance-none form-textarea block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="Pensja" id="Pensja" type="number" value={data.Pensja}
                                    placeholder="" onChange={this.handleChange}/>
                                <span id="errorEmail" className="errors-text2 mb-4 ">{errors.Pensja}</span>
                            </div>
                        </div>
                        <div className=" md:flex mb-6 mt-8 ">
                            <div className="flex pb-3">
                                <button onClick={() => navigate(-1)}
                                        className="shadow-xl bg-red-500 hover:bg-white  hover:text-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                        type="button">
                                    {t("button.back")}
                                </button>
                                <button type="submit"
                                        className=" ml-4 shadow-xl bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                    {t("button.confirm")}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const withRouter = WrappedComponent => props => {
    const params = useParams();
    return (<WrappedComponent
        {...props}
        params={params}
    />);
};

const withNavigate = Component => props => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate}/>;
};

export default withTranslation()(withNavigate(withRouter(VetForm)));