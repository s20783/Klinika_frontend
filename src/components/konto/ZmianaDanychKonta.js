import React from "react";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {changeDaneKonta, getKontoData} from "../../api/authApiCalls";
import {ValidateEmail} from "../helpers/ValidateEmail";
import {ValidateNumerTelefonu} from "../helpers/ValidateNumerTelefonu";
import {CheckTextRange} from "../helpers/CheckTextRange";


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
            notice: '',
            message: ''
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target
        const data = {...this.state.data}
        console.log(data)
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
                errorMessage = `${t('validation.from8to30')}`
            }
            if (!fieldValue) {
                errorMessage = `${t('validation.required')}`
            }
        }
        return errorMessage
    }

    handleSubmit = (event) => {
        const {navigate} = this.props;
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const data = this.state.data
            console.log(data)
            let response;
            let promise = changeDaneKonta(data);
            if (promise) {
                promise
                    .then(res => {
                        response = res
                        console.log(response)
                        console.log(response.status)
                        if (response.status === 200) {
                            this.setState({redirect: true})
                            navigate("/konto", {replace: true});
                        }
                        return res.json()
                    })
                    .then(
                        (data) => {
                            console.log(data)
                            this.setState({
                                message: data.message
                            })
                            if (response.status === 500) {
                                for (const i in data) {
                                    const errorItem = data[i]
                                    const errorMessage = errorItem.message
                                    const fieldName = errorItem.path
                                    const errors = {...this.state.errors}
                                    errors[fieldName] = errorMessage
                                    this.setState({
                                        errors: errors,
                                        error: null
                                    })
                                }
                            }
                            //else {
                            //this.setState({redirect: true})
                            //this.setState({redirect: true})
                            //}
                        },
                        (error) => {
                            this.setState({
                                //isLoaded: true,
                                error: error
                            })
                        })
            }
        }
    }

    componentDidMount() {
        const data1 = this.state.data
        getKontoData()
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data)
                    data1['NazwaUzytkownika'] = data['NazwaUzytkownika']
                    data1['NumerTelefonu'] = data['NumerTelefonu']
                    data1['Email'] = data['Email']
                    this.setState({
                        isLoaded: true,
                        data: data1
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const {t} = this.props;
        const {navigate} = this.props

        return (
            <div class="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3">
                <div class="w-full lg:w-1/6 lg:px-6 text-gray-800 leading-normal">
                    <p class="text-base font-bold py-2 text-xl lg:pb-6 text-gray-700">{t('konto.changeData')}</p>
                    <div class="block lg:hidden sticky inset-0">
                        <button id="menu-toggle"
                                class="flex w-full justify-end px-3 py-3 bg-white lg:bg-transparent border rounded border-gray-600 hover:border-purple-500 appearance-none focus:outline-none">
                            <svg class="fill-current h-3 float-right" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div
                    className="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                    <form onSubmit={this.handleSubmit} className="w-full max-w">
                        <div class="flex flex-wrap -mx-3 mb-4 ">
                            <div class="w-full px-3">
                                <label class="block tracking-wide text-gray-600 text-s font-bold mb-2">
                                    {t('konto.login')}
                                </label>
                                <input
                                    class="form-textarea appearance-none block w-4/6 bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 mb-1 leading-tight focus:outline-none focus:bg-white "
                                    name="NazwaUzytkownika" id="NazwaUzytkownika" type="text"
                                    value={this.state.data.NazwaUzytkownika} onChange={this.handleChange}
                                    placeholder=""/>
                            </div>
                            <span id="errorNazwa"
                                  className="errors-text2 mb-4 ml-4">{this.state.errors.NazwaUzytkownika}</span>
                        </div>
                        <div class="flex flex-wrap -mx-3 border-b">
                            <div class="w-full md:w-1/3 px-3  md:mb-0">
                                <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-city">
                                    {t('klient.fields.phoneNumber')}
                                </label>
                                <input
                                    class=" form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="NumerTelefonu" id="NumerTelefonu" type="text"
                                    value={this.state.data.NumerTelefonu} onChange={this.handleChange} placeholder=""/>
                                <span id="errorNumerTelefonu" className="errors-text2 mb-4 ml-4">
                                    {this.state.errors.NumerTelefonu}</span>
                            </div>
                            <div class="w-full md:w-1/3 px-3 mb-6 ml-8 md:mb-0">
                                <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-city">
                                    {t('klient.fields.email')}
                                </label>
                                <input
                                    class="appearance-none form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="Email" id="Email" type="text" value={this.state.data.Email} placeholder=""
                                    onChange={this.handleChange}/>
                                <span id="errorEmail" className="errors-text2 mb-4 ml-4">
                                    {this.state.errors.Email}</span>
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-10 mt-16">
                            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-city">
                                    {t('konto.field.typePassword')}
                                </label>
                                <input
                                    class=" form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                                        className="shadow bg-red-500 hover:bg-white  hover:text-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                        type="button">
                                    {t("button.back")}
                                </button>
                                <button type="submit"
                                        className=" ml-4 shadow bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
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