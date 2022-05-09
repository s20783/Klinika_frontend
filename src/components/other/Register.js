import React from "react";
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import {loginCall} from "../../api/authApiCalls";
import {registerCall} from "../../api/kontoApiCalls";

class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: {
                Imie: '',
                Nazwisko: '',
                Nazwa_uzytkownika: '',
                Email: '',
                Numer_telefonu: '',
                Data_urodzenia: '',
                Haslo: '',
                Haslo2: ''
            },
            errors: {
                Imie: '',
                Nazwisko: '',
                Nazwa_uzytkownika: '',
                Email: '',
                Numer_telefonu: '',
                Data_urodzenia: '',
                Haslo: '',
                Haslo2: ''
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
            /*registerCall(user)
                .then(res => {
                    response = res
                    return res.json()
                })
                .then(
                    (data) => {
                        if (response.status === 200) {
                            console.log("Konto utworzone")
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
                    })*/
        }
    }

    validateField = (fieldName, fieldValue) => {
        const {t} = this.props;
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
        if (fieldName === 'Nazwa_uzytkownika') {
            if (!fieldValue) {
                errorMessage = "Pole wymagane"
            }
        }
        if (fieldName === 'Email') {
            if(!fieldValue.includes("@") || !fieldValue.includes(".")){
                errorMessage = "Niepoprawny format"
            }
            if (!fieldValue) {
                errorMessage = "Pole wymagane"
            }
        }
        if (fieldName === 'Numer_telefonu') {
            if(fieldValue.length < 9 || fieldValue.length > 10){
                errorMessage = "Pole wymaga od 9 do 10 znaków"
            }
            if (!fieldValue) {
                errorMessage = "Pole wymagane"
            }
        }
        if (fieldName === 'Data_urodzenia') {
            if (!fieldValue) {
                errorMessage = "Pole wymagane"
            }
        }
        if (fieldName === 'Haslo') {
            if(fieldValue.length < 2){
                errorMessage = "Pole wymaga minimum 2 znaków"
            }
            if (!fieldValue) {
                errorMessage = "Pole wymagane"
            }
        }
        if (fieldName === 'Haslo2') {
            if(fieldValue.length < 2){
                errorMessage = "Pole wymaga minimum 2 znaków"
            }
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
                <div className="w-full flex flex-wrap">
                    <div className="bg-white  max-w-lg mx-auto  md:p-3 my-4 rounded-lg shadow-2xl">
                        <div className=" mx-6">
                            <p className="text-center text-4xl">Witamy w Klinice PetMed!</p>

                            <form className="flex flex-col pt-5 md:pt-4" onSubmit={this.handleSubmit}>
                                <div className=" py-2">
                                    <label htmlFor="Rejestracja" className="text-lg font-bold text-3xl">Rejestracja</label>
                                </div>


                                <div className="grid grid-cols-2 gap-4">
                                    <div className="my-3 pt-3  rounded bg-gray-200">
                                        <input type="text" name="Imie" id="Imie" placeholder="Imię *" onChange={this.handleChange}
                                               className={this.state.errors.Imie ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                                   : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                    </div>

                                    <div className="my-3 pt-3  rounded bg-gray-200">
                                        <input type="text" name="Nazwisko" id="Nazwisko" placeholder="Nazwisko *" onChange={this.handleChange}
                                               className={this.state.errors.Nazwisko ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                                   : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                    </div>
                                </div>

                                <div className="my-3 pt-3  rounded bg-gray-200">
                                    <input type="text" name="Nazwa_uzytkownika" id="Nazwa_uzytkownika" placeholder="Nazwa użytkownika *" onChange={this.handleChange}
                                           className={this.state.errors.Nazwa_uzytkownika ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                               : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                </div>
                                <span id="errorLogin" className="errors-text">{this.state.errors.Nazwa_uzytkownika}</span>

                                <div className="my-3 pt-3  rounded bg-gray-200">
                                    <input type="email" id="Email" name="Email" placeholder="E-mail" onChange={this.handleChange}
                                           className={this.state.errors.Email ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                               : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                </div>
                                <span id="errorLogin" className="errors-text">{this.state.errors.Email}</span>

                                <div className="my-3 pt-3  rounded bg-gray-200">
                                    <input type="tel" id="Numer_telefonu" name="Numer_telefonu" placeholder="Numer telefonu *" onChange={this.handleChange}
                                           className={this.state.errors.Numer_telefonu ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                               : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                </div>
                                <span id="errorLogin" className="errors-text">{this.state.errors.Numer_telefonu}</span>

                                <div className="my-3 pt-3  rounded bg-gray-200">
                                    <input datepicker type="text" id="Data_urodzenia" name="Data_urodzenia" placeholder="Data urodzenia *" onChange={this.handleChange}
                                           className={this.state.errors.Data_urodzenia ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                               : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                </div>
                                <span id="errorLogin" className="errors-text">{this.state.errors.Data_urodzenia}</span>

                                <div className="my-3 pt-3 rounded bg-gray-200">
                                    <input type="password" id="Haslo" name="Haslo" placeholder="Hasło *" onChange={this.handleChange}
                                           className={this.state.errors.Haslo ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                               : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                </div>
                                <span id="errorLogin" className="errors-text">{this.state.errors.Haslo}</span>

                                <div className="my-3 pt-3 rounded bg-gray-200">
                                    <input type="password" id="Haslo2" name="Haslo2" placeholder="Powtórz Hasło *" onChange={this.handleChange}
                                           className={this.state.errors.Haslo2 ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                               : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                </div>
                                <span id="errorLogin" className="errors-text">{this.state.errors.Haslo2}</span>

                                <span className="text-gray-400">* - wymagane</span>

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

export default withRouter(Register);