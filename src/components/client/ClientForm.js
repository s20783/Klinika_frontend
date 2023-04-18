import React from "react";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {CheckTextRange} from "../../helpers/CheckTextRange";
import {ValidateEmail} from "../../helpers/ValidateEmail";
import {ValidatePhoneNumber} from "../../helpers/ValidatePhoneNumber";
import {addClient} from "../../axios/ClientApiCalls";
import axios from "axios";

let CancelToken
let source

class ClientForm extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdKlient = this.props.params.IdOsoba

        this.state = {
            data: {
                Imie: '',
                Nazwisko: '',
                NumerTelefonu: '',
                Email: '',
            }, errors: {
                Imie: '',
                Nazwisko: '',
                NumerTelefonu: '',
                Email: '',
            },
            idKlient: paramsIdKlient,
            error: '',
            isLoaded: false,
        }
    }

    async componentDidMount() {
        CancelToken = axios.CancelToken;
        source = CancelToken.source();
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
            data: data,
            errors: errors
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
            try {
                await addClient(dane.data, source)
                await navigate(-1, {replace: true});
            } catch (error) {
                console.log(error)
            }
        }
    }

    render() {
        const {data, errors} = this.state
        const {t} = this.props;
        const {navigate} = this.props

        return (
            <div className="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3">
                <div className="w-full lg:w-1/6 lg:px-6 text-gray-800 leading-normal">
                    <p className="text-base font-bold py-2 text-xl lg:pb-6 text-gray-700">{t('klient.addNewClient')}</p>
                </div>
                <div
                    className="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                    <form onSubmit={this.handleSubmit}>
                        <div className="flex flex-wrap -mx-3 mb-6 border-b">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-city">
                                    {t('weterynarz.fields.firstName')}
                                </label>
                                <input
                                    className="shadow-xl form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="Imie" id="Imie" type="text" value={data.Imie}
                                    onChange={this.handleChange} placeholder=""/>
                                <span id="errorImie" className="errors-text2 mb-4 ">{errors.Imie}</span>

                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 ml-8 md:mb-0">
                                <label className="block tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-city">
                                    {t('weterynarz.fields.lastName')}
                                </label>
                                <input
                                    className="shadow-xl appearance-none form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-6 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="Nazwisko" id="Nazwisko" type="text" value={data.Nazwisko}
                                    placeholder="" onChange={this.handleChange}/>
                                <span id="errorNazwisko"
                                      className="errors-text2 mb-4 ">{errors.Nazwisko}</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6 ">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-city">
                                    {t('weterynarz.fields.phoneNumber')}
                                </label>
                                <input
                                    className="shadow-xl form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="NumerTelefonu" id="NumerTelefonu" type="text"
                                    value={data.NumerTelefonu} onChange={this.handleChange} placeholder=""/>
                                <span id="errorNumerTelefonu"
                                      className="errors-text2 mb-4 ">{errors.NumerTelefonu}</span>
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 ml-8 md:mb-0">
                                <label className="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-city">
                                    {t('weterynarz.fields.email')}
                                </label>
                                <input
                                    className="shadow-xl appearance-none form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-6 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="Email" id="Email" type="text" value={data.Email} placeholder=""
                                    onChange={this.handleChange}/>
                                <span id="errorEmail" className="errors-text2 mb-4 ">{errors.Email}</span>
                            </div>
                        </div>
                        <div className=" md:flex mb-6 mt-8 ">
                            <div className="flex pb-3">
                                <button onClick={() => navigate(-1)}
                                        className="shadow-lg bg-red-500 hover:bg-white  hover:text-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                        type="button">
                                    {t("button.back")}
                                </button>
                                <button type="submit"
                                        className=" ml-4 shadow-lg bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                    {t("button.confirm")}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>)
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

export default withTranslation()(withNavigate(withRouter(ClientForm)));