import {useParams} from "react-router";
import React from "react";
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
import {loginCall} from "../../api/authApiCalls";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                Login: '',
                Haslo: ''
            },
            errors: {
                Login: '',
                Haslo: ''
            },
            error: ''
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

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const user = this.state.user
            console.log(user)
            let response
            loginCall(user)
                 .then(res => {
                     response = res
                     return res.json()
                 })
                 .then(
                     (data) => {
                         if (response.status === 200) {
                             if (data.Token) {
                                 console.log(data.Token)
                                 console.log(data.RefreshToken)
                                 const userString = JSON.stringify(data)
                                 //this.props.handleLogin(userString)
                                 //this.props.history.goBack();
                            }
                        }
                        else if (response.status === 401) {
                            console.log(401)
                            this.state({message: data.message})
                        }
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        })
                    })
        }
    }

    validateField = (fieldName, fieldValue) => {
        const {t} = this.props;
        let errorMessage = '';
        if (fieldName === 'Login') {
            if (!fieldValue) {
                errorMessage = "Pole wymagane"
            }
        }
        if (fieldName === 'Haslo') {
            if (!fieldValue) {
                errorMessage = "Pole wymagane"
            }
        }

        return errorMessage
    }

    validateForm = () => {
        const user = this.state.user
        const errors = this.state.errors
        for (const fieldName in user) {
            const fieldValue = user[fieldName]
            const errorMessage = this.validateField(fieldName, fieldValue)
            errors[fieldName] = errorMessage
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
        return (
            <body>
            <main>
                {/*<div className="relative bg-white">
                    <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                            <div className="py-6 px-5 space-y-6">
                                <div>
                                    <Link to="#" className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-400 hover:bg-blue-400"> Zaloguj
                                        się </Link>
                                    <p className="mt-6 text-center text-base font-medium text-gray-500">Nie masz konta?</p>
                                        <Link to="/register" className="text-blue-400 hover:text-blue-400"> Zarejestruj się tutaj. </Link>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>*/}

                <div className="w-full flex flex-wrap ">
                    <div className="bg-white max-w-lg mx-auto p-6 md:p-8 my-8 rounded-lg shadow-2xl">
                        <div className=" mx-10">
                            <p className="text-center text-4xl">Witamy w Klinice PetMed!</p>
                            <form className="flex flex-col pt-5 md:pt-6" onSubmit={this.handleSubmit}>

                                <div className=" py-1">
                                    <label htmlFor="logowanie" className="text-lg font-bold text-3xl">Logowanie</label>
                                </div>

                                <div className="my-3 pt-3  rounded bg-gray-200">
                                    <input type="text" id="Login" name="Login" placeholder="E-mail lub nazwa uzytkownika" onChange={this.handleChange}
                                           className={this.state.errors.Login ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                               : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                </div>
                                <span id="errorLogin" className="errors-text">{this.state.errors.Login}</span>

                                <div className="my-3 pt-3 rounded bg-gray-200">
                                    <input type="password" id="Haslo" name="Haslo" placeholder="Hasło" onChange={this.handleChange}
                                           className={this.state.errors.Haslo ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                               : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                </div>
                                <span id="errorHaslo" className="errors-text">{this.state.errors.Haslo}</span>

                                <input type="submit" value="Zaloguj się"
                                       className="bg-black text-white font-bold rounded-lg text-lg hover:bg-gray-700 p-2 mt-6"/>
                            </form>

                            <div className="text-center pt-12 pb-12">
                                <p>Nie masz konta? <Link to="/register" className="underline font-semibold">Zarejestruj się tutaj.</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            </body>
        )
    }
}
const withRouter = WrappedComponent => props => {
    const params = useParams();
    //const params2 = useHistory();
    return (
        <WrappedComponent
            {...props}
            params={params}
            //params2={params2}
        />
    );
};

export default withRouter(Login);