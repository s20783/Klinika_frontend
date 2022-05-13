import {Navigate, useNavigate, useParams} from "react-router";
import React from "react";
import {Link} from "react-router-dom";
import {loginCall} from "../../api/authApiCalls";

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
            message: ''
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
        const { navigate } = this.props;
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
                                 console.log(data)
                                 const userString = JSON.stringify(data)
                                 this.props.handleLogin(userString)

                                 navigate("/", { replace: true });
                            }
                        }
                        else if (response.status === 401) {
                             console.log(data)
                             this.setState({
                                 message: data.message
                             })
                        } else {
                             console.log(data)
                             this.setState({
                                 message: data.message
                             })
                        }
                    },
                    (error) => {
                        this.setState({
                            error: error
                        })
                    })
        }
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if (fieldName === 'NazwaUzytkownika') {
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
            <main>
                <div className="w-full flex flex-wrap ">
                    <div className="bg-white max-w-lg mx-auto p-6 md:p-8 my-10 rounded-lg shadow-2xl">
                        <div className="mx-10">
                            <p className="text-center text-4xl">Witamy w Klinice PetMed</p>
                            <form className="flex flex-col pt-5 md:pt-6" onSubmit={this.handleSubmit}>

                                <div className=" py-1">
                                    <label htmlFor="logowanie" className="text-lg font-bold text-3xl">Logowanie</label>
                                </div>

                                <div className="my-3 pt-3  rounded bg-gray-200">
                                    <input type="text" id="NazwaUzytkownika" name="NazwaUzytkownika" placeholder="Nazwa uzytkownika" onChange={this.handleChange}
                                           className={this.state.errors.NazwaUzytkownika ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                               : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                </div>
                                <span id="errorLogin" className="errors-text">{this.state.errors.NazwaUzytkownika}</span>

                                <div className="my-3 pt-3 rounded bg-gray-200">
                                    <input type="password" id="Haslo" name="Haslo" placeholder="Hasło" onChange={this.handleChange}
                                           className={this.state.errors.Haslo ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                               : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                </div>
                                <span id="errorHaslo" className="errors-text">{this.state.errors.Haslo}</span>

                                <span id="error" className="errors-text2">{this.state.message}</span>

                                <input type="submit" value="Zaloguj się"
                                       className="bg-black text-white font-bold rounded-lg text-lg hover:bg-gray-700 p-2 mt-6"/>
                            </form>

                            <div className="text-center pt-3">
                                <p><Link to="#" className="underline font-semibold">Nie pamiętam hasła</Link></p>
                            </div>

                            <div className="text-center pt-12 pb-12">
                                <p>Nie masz konta? <Link to="/register" className="underline font-semibold">Zarejestruj się tutaj.</Link></p>
                            </div>
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
    return <Component {...props} navigate={navigate} />;
};

export default  withNavigate(withRouter(Login));