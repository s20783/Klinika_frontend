import React from "react";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {changeDaneKonta} from "../../axios/AuthAxiosCalls";
import {ValidateEmail} from "../helpers/ValidateEmail";
import {ValidateNumerTelefonu} from "../helpers/ValidateNumerTelefonu";
import {CheckTextRange} from "../helpers/CheckTextRange";
import {getKontoData} from "../../axios/AuthAxiosCalls";
import axios from "axios";

let CancelToken
let source
class ZmianaDanychKonta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                NazwaUzytkownika: '',
                NumerTelefonu: '',
                Email: '',
                Haslo: '',
            },
            errors: {
                NazwaUzytkownika: '',
                NumerTelefonu: '',
                Email: '',
                Haslo: '',
            },
            error: '',
            isLoaded: false,
            message: ''
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

    validateField = (fieldName, fieldValue) => {
        const {t} = this.props;
        let errorMessage = '';
        if (fieldName === 'NazwaUzytkownika') {
            if (!CheckTextRange(fieldValue, 2, 50)) {
                errorMessage = `${t('validation.max50')}`
            }
            if (!fieldValue) {
                errorMessage = `${t('validation.required')}`
            }
        }
        if (fieldName === 'Email') {
            if (!CheckTextRange(fieldValue, 2, 50)) {
                errorMessage = `${t('validation.max50')}`
            }
            if (!ValidateEmail(fieldValue)) {
                errorMessage = `${t('validation.format')}`
            }
            if (!fieldValue) {
                errorMessage = `${t('validation.required')}`
            }
        }
        if (fieldName === 'NumerTelefonu') {
            if (!ValidateNumerTelefonu(fieldValue)) {
                errorMessage = `${t('validation.format')}`
            }
            if (!fieldValue) {
                errorMessage = `${t('validation.required')}`
            }
        }
        if (fieldName === 'Haslo') {
            if (!CheckTextRange(fieldValue, 5, 30)) {
                errorMessage = `${t('validation.from5to30')}`
            }
            if (!fieldValue) {
                errorMessage = `${t('validation.required')}`
            }
        }
        return errorMessage
    }

    handleSubmit = async (event) => {
        const {navigate} = this.props;
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const data = this.state.data
            try {
                await changeDaneKonta(data, source)
                await navigate("/konto", {replace: true});
            } catch (error) {
                console.log(error.message)
                this.setState({
                   message: error.message
                })
            }
        }
    }

    componentWillUnmount() {
        if (source) {
            source.cancel('Operation canceled by the user.');
        }
    }

    async componentDidMount() {
        CancelToken = axios.CancelToken;
        source = CancelToken.source();
        try {
            await getKontoData(source).then((res) => {
                if (res) {
                    console.log(res.data)
                    this.setState({
                        isLoaded: true,
                        data: res.data
                    });
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const {t} = this.props;
        const {navigate} = this.props

        return (
            <div className="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3">
                <div className="w-full lg:w-1/6 lg:px-6 text-gray-800 leading-normal">
                    <p className="text-base font-bold py-2 text-xl lg:pb-6 text-gray-700">{t('konto.changeData')}</p>

                </div>
                <div
                    className="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                    <form onSubmit={this.handleSubmit} className="w-full max-w">
                        <div className="flex flex-wrap -mx-3 mb-4 ">
                            <div className="w-full px-3">
                                <label className="block tracking-wide text-gray-600 text-s font-bold mb-2">
                                    {t('konto.login')}
                                </label>
                                <input
                                    className="shadow-xl form-textarea appearance-none block w-4/6 bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 mb-1 leading-tight focus:outline-none focus:bg-white "
                                    name="NazwaUzytkownika" id="NazwaUzytkownika" type="text"
                                    value={this.state.data.NazwaUzytkownika} onChange={this.handleChange}
                                    placeholder=""/>
                            </div>
                            <span id="errorNazwa"
                                  className="errors-text2 mb-4 ml-4">{this.state.errors.NazwaUzytkownika}</span>
                        </div>
                        <div className="flex flex-wrap -mx-3 border-b">
                            <div className="w-full md:w-1/3 px-3  md:mb-0">
                                <label className="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-city">
                                    {t('klient.fields.phoneNumber')}
                                </label>
                                <input
                                    className="shadow-xl form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="NumerTelefonu" id="NumerTelefonu" type="text"
                                    value={this.state.data.NumerTelefonu} onChange={this.handleChange} placeholder=""/>
                                <span id="errorNumerTelefonu" className="errors-text2 mb-4 ml-4">
                                    {this.state.errors.NumerTelefonu}</span>
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 ml-8 md:mb-0">
                                <label className="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-city">
                                    {t('klient.fields.email')}
                                </label>
                                <input
                                    className="shadow-xl appearance-none form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-6 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="Email" id="Email" type="text" value={this.state.data.Email} placeholder=""
                                    onChange={this.handleChange}/>
                                <span id="errorEmail" className="errors-text2 mb-4 ml-4">
                                    {this.state.errors.Email}</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-10 mt-16">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-city">
                                    {t('konto.field.typePassword')} *
                                </label>
                                <input
                                    className="shadow-xl form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="Haslo" id="Haslo" type="password" value={this.state.data.Haslo} placeholder=""
                                    onChange={this.handleChange}/>
                            </div>
                            <span id="errorHaslo"
                                  className="errors-text2 mb-4 mt-12 ml-4">{this.state.errors.Haslo}</span>
                        </div>
                        {this.state.message !== '' &&
                            <span id="error"
                                  className="errors-text2">{t('errors.' + this.state.message)}</span>}
                        <div className=" md:flex mb-6 mt-8 ">
                            <div className="flex pb-3">
                                <button onClick={() => navigate(-1)}
                                        className="shadow-xl bg-red-500 hover:bg-white  hover:text-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                        type="button">
                                    {t("button.back")}
                                </button>
                                <button type="submit"
                                        className=" ml-4 shadow-xl bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                    {t('button.confirm')}
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

export default withTranslation()(withNavigate(withRouter(ZmianaDanychKonta)));