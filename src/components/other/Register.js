import React from "react";
import {Navigate, useNavigate, useParams} from "react-router";
import {Link} from "react-router-dom";
import {registerCall} from "../../api/KlientApiCalls";
import {ValidateEmail} from "../helpers/ValidateEmail";
import {ValidateHaslo} from "../helpers/ValidateHaslo";

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
        //const { navigate } = this.props;
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const user = this.state.user
            console.log(user)
            let response;
            let promise;
            promise = registerCall(user);
            if (promise) {
                promise
                    .then(res => {
                        response = res
                        console.log(response)
                        console.log(response.status)
                        if(response.status === 200) {
                            this.setState({redirect: true})
                            return res.json()
                        }
                    })
                    .then(
                        (data) => {
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
                                //navigate("/", { replace: true });
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

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if (fieldName === 'Imie') {
            if (!fieldValue) {
                errorMessage = "Pole wymagane"
            }
        }
        if (fieldName === 'Nazwisko') {
            if (!fieldValue) {
                errorMessage = "Pole wymagane"
            }
        }
        if (fieldName === 'NazwaUzytkownika') {
            if (!fieldValue) {
                errorMessage = "Pole wymagane"
            }
        }
        if (fieldName === 'Email') {
            if (!ValidateEmail(fieldValue)) {
                errorMessage = "Niepoprawny format"
            }
            if (!fieldValue) {
                errorMessage = "Pole wymagane"
            }
        }
        if (fieldName === 'NumerTelefonu') {
            if (fieldValue.length < 9 || fieldValue.length > 10) {
                errorMessage = "Pole wymaga od 9 do 10 znaków"
            }
            if (!fieldValue) {
                errorMessage = "Pole wymagane"
            }
        }
        if (fieldName === 'Haslo') {
            // if(!ValidateHaslo(fieldValue)){
            //     errorMessage = "Pole wymaga minimum 3 znaków, jednej wielkiej litery i cyfry"
            // }
            if (!fieldValue) {
                errorMessage = "Pole wymagane"
            }
        }
        if (fieldName === 'Haslo2') {
            // if(!ValidateHaslo(fieldValue)){
            //     errorMessage = "Pole wymaga minimum 3 znaków, jednej wielkiej litery i cyfry"
            // }
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
        const {redirect} = this.state
        if (redirect) {
            return (
                <Navigate to={{
                    pathname: "/",
                    state: {
                        //notice: notice
                    }
                }}/>
            )
        }

        return (
            <main>
                <div className="w-full flex flex-wrap">
                    <div className="bg-white max-w-lg mx-auto p-6 md:p-8 my-10 rounded-lg shadow-2xl">
                        <div className="mx-10">
                            <p className="text-center text-4xl">Witamy w Klinice PetMed</p>

                            <form className="flex flex-col pt-5 md:pt-4" onSubmit={this.handleSubmit}>
                                <div className=" py-2">
                                    <label htmlFor="Rejestracja"
                                           className="text-lg font-bold text-3xl">Rejestracja</label>
                                </div>


                                {/*<div className="grid grid-cols-2 gap-4">*/}
                                <div className="my-3 pt-3  rounded bg-gray-200">
                                    <input type="text" name="Imie" id="Imie" placeholder="Imię *"
                                           onChange={this.handleChange}
                                           className={this.state.errors.Imie ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                               : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                </div>
                                <span id="errorImie" className="errors-text">{this.state.errors.Imie}</span>

                                <div className="my-3 pt-3  rounded bg-gray-200">
                                    <input type="text" name="Nazwisko" id="Nazwisko" placeholder="Nazwisko *"
                                           onChange={this.handleChange}
                                           className={this.state.errors.Nazwisko ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                               : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                </div>
                                <span id="errorNazwisko" className="errors-text">{this.state.errors.Nazwisko}</span>
                                {/*</div>*/}

                                <div className="my-3 pt-3  rounded bg-gray-200">
                                    <input type="text" name="NazwaUzytkownika" id="NazwaUzytkownika"
                                           placeholder="Nazwa użytkownika *" onChange={this.handleChange}
                                           className={this.state.errors.NazwaUzytkownika ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                               : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                </div>
                                <span id="errorNazwaUzytkownika"
                                      className="errors-text">{this.state.errors.NazwaUzytkownika}</span>

                                <div className="my-3 pt-3  rounded bg-gray-200">
                                    <input type="text" id="Email" name="Email" placeholder="E-mail *"
                                           onChange={this.handleChange}
                                           className={this.state.errors.Email ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                               : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                </div>
                                <span id="errorEmail" className="errors-text">{this.state.errors.Email}</span>

                                <div className="my-3 pt-3  rounded bg-gray-200">
                                    <input type="tel" id="NumerTelefonu" name="NumerTelefonu"
                                           placeholder="Numer telefonu *" onChange={this.handleChange}
                                           className={this.state.errors.NumerTelefonu ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                               : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                </div>
                                <span id="errorNumerTelefonu"
                                      className="errors-text">{this.state.errors.NumerTelefonu}</span>

                                {/*<div className="my-3 pt-3  rounded bg-gray-200">*/}
                                {/*    <input datepicker type="text" id="Data_urodzenia" name="Data_urodzenia" placeholder="Data urodzenia *" onChange={this.handleChange}*/}
                                {/*           className={this.state.errors.Data_urodzenia ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'*/}
                                {/*               : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>*/}
                                {/*</div>*/}
                                {/*<span id="errorLogin" className="errors-text">{this.state.errors.Data_urodzenia}</span>*/}

                                <div className="my-3 pt-3 rounded bg-gray-200">
                                    <input type="password" id="Haslo" name="Haslo" placeholder="Hasło *"
                                           onChange={this.handleChange}
                                           className={this.state.errors.Haslo ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                               : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                </div>
                                <span id="errorHaslo" className="errors-text">{this.state.errors.Haslo}</span>

                                <div className="my-3 pt-3 rounded bg-gray-200">
                                    <input type="password" id="Haslo2" name="Haslo2" placeholder="Powtórz Hasło *"
                                           onChange={this.handleChange}
                                           className={this.state.errors.Haslo2 ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                               : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                </div>
                                <span id="errorHaslo2" className="errors-text">{this.state.errors.Haslo2}</span>

                                <span className="text-gray-400">* - wymagane</span>
                                <span id="error" className="errors-text">{this.state.error}</span>
                                <input type="submit" value="Zarejestruj się"
                                       className="modal-open bg-black text-white font-bold rounded-lg text-lg hover:bg-gray-700 p-2 mt-6"/>
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

// const withNavigate = Component => props => {
//     const navigate = useNavigate();
//     return <Component {...props} navigate={navigate} />;
// };

export default (withRouter(Register));