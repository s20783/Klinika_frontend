import {useNavigate, useParams} from "react-router";
import React from "react";
import {Link} from "react-router-dom";
import {loginCall} from "../../axios/AuthApiCalls";
import {withTranslation} from "react-i18next";
import axios from "axios";
import Lottie from "react-lottie";
import * as loading from '../../Loading.json';

let CancelToken
let source

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                NazwaUzytkownika: '',
                Haslo: ''
            },
            errors: {
                NazwaUzytkownika: '',
                Haslo: ''
            },
            error: '',
            message: '',
            isLoading: false
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

    async componentDidMount() {
        CancelToken = axios.CancelToken;
        source = CancelToken.source();
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
            this.setState({
                isLoading: true
            })
            try {
                const res = await loginCall(this.state.user, source)
                const data = await res.data

                const userString = JSON.stringify(data)
                this.props.handleLogin(userString)
                navigate("/", {replace: true});
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

    validateField = (fieldName, fieldValue) => {
        const {t} = this.props;
        let errorMessage = '';
        if (fieldName === 'NazwaUzytkownika') {
            if (!fieldValue) {
                errorMessage = `${t('validation.required')}`
            }
        }
        if (fieldName === 'Haslo') {
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
        const {t} = this.props;
        const {isLoading} = this.state

        return (
            <main>
                <div className="w-full flex flex-wrap ">
                    <div className="bg-white max-w-lg mx-auto p-6 md:p-8 my-10 rounded-lg shadow-2xl">
                        <div className="mx-10">
                            <p className="text-center text-4xl">{t('login.title')}</p>
                            <form className="flex flex-col pt-4 md:pt-5 lg:pt-8" onSubmit={this.handleSubmit}>
                                <div className=" py-1">
                                    <label htmlFor="logowanie"
                                           className="text-lg font-bold text-3xl">{t('login.signIn')}</label>
                                </div>
                                <div className="my-3 pt-3  rounded bg-gray-200">
                                    <input type="text" id="NazwaUzytkownika" name="NazwaUzytkownika"
                                           placeholder={t('login.fields.nazwaUzytkownika')} onChange={this.handleChange}
                                           className={this.state.errors.NazwaUzytkownika ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                               : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                </div>
                                <span id="errorLogin"
                                      className="errors-text">{this.state.errors.NazwaUzytkownika}</span>

                                <div className="my-3 pt-3 rounded bg-gray-200">
                                    <input type="password" id="Haslo" name="Haslo" placeholder={t('login.fields.haslo')}
                                           onChange={this.handleChange}
                                           className={this.state.errors.Haslo ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                               : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                </div>
                                <span id="errorHaslo" className="errors-text">{this.state.errors.Haslo}</span>
                                {this.state.message !== '' && <span id="error"
                                                                    className="errors-text2">{t('errors.' + this.state.message)}</span>}
                                <input type="submit" value={t('login.signIn')}
                                       className="bg-blue-500 text-white font-bold rounded text-lg hover:bg-blue-300 p-2 mt-6"/>
                            </form>

                            <div className="text-center pt-12 pb-12">
                                <p>
                                    {t('login.text')} <Link to="/register" className="underline font-semibold hover:text-blue-500">{t('login.register')}.</Link>
                                </p>
                            </div>
                            {isLoading &&
                                <Lottie options={this.defaultOptions} height={120} width={120}/>
                            }
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

export default withTranslation()(withNavigate(withRouter(Login)));