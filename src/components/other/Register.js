import React from "react";
import {Navigate, useNavigate, useParams} from "react-router";
import {registerCall} from "../../axios/ClientApiCalls";
import {ValidateEmail} from "../../helpers/ValidateEmail";
import {withTranslation} from "react-i18next";
import {ValidatePhoneNumber} from "../../helpers/ValidatePhoneNumber";
import {ValidatePassword} from "../../helpers/ValidatePassword";
import {CheckTextRange} from "../../helpers/CheckTextRange";
import axios from "axios";
import Lottie from 'react-lottie';
import * as loading from '../../Loading.json';
let CancelToken
let source
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                Imie: '',
                Nazwisko: '',
                NazwaUzytkownika: '',
                Email: '',
                NumerTelefonu: '',
                Haslo: '',
                Haslo2: ''
            },
            errors: {
                Imie: '',
                Nazwisko: '',
                NazwaUzytkownika: '',
                Email: '',
                NumerTelefonu: '',
                Haslo: '',
                Haslo2: ''
            },
            error: '',
            redirect: false,
            message: '',
            isLoading:false
        }
    }
     defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loading.default,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }


    handleChange = (event) => {
        const {name, value} = event.target
        const user = {...this.state.user}
        user[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = {...this.state.errors}
        errors[name] = errorMessage

        this.setState({
            user: user,
            errors: errors
        })
    }

    handleSubmit = async (event) => {
        const {navigate} = this.props;
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const user = this.state.user
            this.setState({
                isLoading: true
            })
            try {
                await registerCall(user, source);
                navigate("/afterRegister", {replace: true});
            } catch (error) {
                console.log(error.message)
                this.setState({
                    message: error.message,
                    isLoading: false
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
    }

    validateField = (fieldName, fieldValue) => {
        const {t} = this.props;
        let errorMessage = '';
        if (fieldName === 'Imie') {
            if (!CheckTextRange(fieldValue, 2, 50)) {
                errorMessage = `${t('validation.max50')}`
            }
            if (!fieldValue) {
                errorMessage = `${t('validation.required')}`
            }
        }
        if (fieldName === 'Nazwisko') {
            if (!CheckTextRange(fieldValue, 2, 50)) {
                errorMessage = `${t('validation.max50')}`
            }
            if (!fieldValue) {
                errorMessage = `${t('validation.required')}`
            }
        }
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
            if (!ValidatePhoneNumber(fieldValue)) {
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
            if (!ValidatePassword(fieldValue)) {
                errorMessage = `${t('validation.password')}`
            }

            if (!fieldValue) {
                errorMessage = `${t('validation.required')}`
            }
        }
        if (fieldName === 'Haslo2') {
            if (!CheckTextRange(fieldValue, 5, 30)) {
                errorMessage = `${t('validation.from5to30')}`
            }
            if (!ValidatePassword(fieldValue)) {
                errorMessage = `${t('validation.password')}`
            }
            if (!fieldValue) {
                errorMessage = `${t('validation.required')}`
            }
        }
        return errorMessage
    }

    validateForm = () => {
        const user = this.state.user
        const errors = this.state.errors
        for (const fieldName in user) {
            const fieldValue = user[fieldName]
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

    render() {
        const {redirect,isLoading} = this.state
        const {t} = this.props;
        if (redirect) {
            return (
                <Navigate to={'/afterRegister'} state={""}/>
            )
        }

        return (
            <main>
                <div className="w-full flex flex-wrap">
                    <div className="bg-white max-w-lg mx-auto p-6 md:p-8 my-10 rounded-lg shadow-2xl">
                        <div className="mx-10">
                            <p className="text-center text-4xl">{t('register.title')}</p>
                            <form className="flex flex-col pt-4 md:pt-5 lg:pt-8" onSubmit={this.handleSubmit}>
                                <div className="py-2">
                                    <label htmlFor="Rejestracja"
                                           className="text-lg font-bold text-3xl">{t('register.signUp')}</label>
                                </div>

                                <div className="my-3 pt-3  rounded bg-gray-200">
                                    <input type="text" name="Imie" id="Imie"
                                           placeholder={t('register.fields.imie') + " *"}
                                           onChange={this.handleChange}
                                           className={this.state.errors.Imie ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                               : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                </div>
                                <span id="errorImie" className="errors-text">{this.state.errors.Imie}</span>

                                <div className="my-3 pt-3  rounded bg-gray-200">
                                    <input type="text" name="Nazwisko" id="Nazwisko"
                                           placeholder={t('register.fields.nazwisko') + " *"}
                                           onChange={this.handleChange}
                                           className={this.state.errors.Nazwisko ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                               : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                </div>
                                <span id="errorNazwisko" className="errors-text">{this.state.errors.Nazwisko}</span>

                                <div className="my-3 pt-3  rounded bg-gray-200">
                                    <input type="text" name="NazwaUzytkownika" id="NazwaUzytkownika"
                                           placeholder={t('register.fields.nazwaUzytkownika') + " *"}
                                           onChange={this.handleChange}
                                           className={this.state.errors.NazwaUzytkownika ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                               : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                </div>
                                <span id="errorNazwaUzytkownika"
                                      className="errors-text">{this.state.errors.NazwaUzytkownika}</span>

                                <div className="my-3 pt-3  rounded bg-gray-200">
                                    <input type="text" id="Email" name="Email"
                                           placeholder={t('register.fields.email') + " *"}
                                           onChange={this.handleChange}
                                           className={this.state.errors.Email ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                               : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                </div>
                                <span id="errorEmail" className="errors-text">{this.state.errors.Email}</span>

                                <div className="my-3 pt-3  rounded bg-gray-200">
                                    <input type="tel" id="NumerTelefonu" name="NumerTelefonu"
                                           placeholder={t('register.fields.numerTelefonu') + " *"}
                                           onChange={this.handleChange}
                                           className={this.state.errors.NumerTelefonu ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                               : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                </div>
                                <span id="errorNumerTelefonu"
                                      className="errors-text">{this.state.errors.NumerTelefonu}</span>

                                <div className="my-3 pt-3 rounded bg-gray-200">
                                    <input type="password" id="Haslo" name="Haslo"
                                           placeholder={t('register.fields.haslo') + " *"}
                                           onChange={this.handleChange}
                                           className={this.state.errors.Haslo ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                               : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                </div>
                                <span id="errorHaslo" className="errors-text">{this.state.errors.Haslo}</span>

                                <div className="my-3 pt-3 rounded bg-gray-200">
                                    <input type="password" id="Haslo2" name="Haslo2"
                                           placeholder={t('register.fields.haslo2') + " *"}
                                           onChange={this.handleChange}
                                           className={this.state.errors.Haslo2 ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                               : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                </div>
                                <span id="errorHaslo2" className="errors-text">{this.state.errors.Haslo2}</span>

                                <span className="text-gray-400">* - {t('register.required')}</span>

                                {this.state.message !== '' && <span id="error"
                                                                    className="errors-text2">{t('errors.' + this.state.message)}</span>}
                                <input type="submit" value={t('register.signUpButton')}
                                       className="bg-blue-500 text-white font-bold rounded text-lg hover:bg-blue-300 p-2 mt-6"/>
                                {isLoading &&
                                    <Lottie options={this.defaultOptions} height={120} width={120}/>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </main>
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

export default withTranslation()(withNavigate(withRouter(Register)));