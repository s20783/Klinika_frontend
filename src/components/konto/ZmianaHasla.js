import {Navigate, useNavigate, useParams} from "react-router";
import React from "react";
import {Link} from "react-router-dom";
import {changePassword} from "../../api/authApiCalls";
import {getCurrentUser} from "../../components/other/authHelper";


class ZmianaHasla extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                Haslo: '',
                NoweHaslo: '',
                NoweHaslo1: ''
            },
            errors: {
                Haslo: '',
                NoweHaslo: '',
                NoweHaslo1: ''

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
            changePassword(user)
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

    validateField = (fieldName, fieldValue, newPassword) => {
    const user = getCurrentUser()
                             console.log(user)
        let errorMessage = '';
        if (fieldName === 'Haslo') {
            if (!fieldValue) {
                errorMessage = "Pole wymagane"
            }
        }
        if (fieldName === 'NoweHaslo') {

            if (!fieldValue) {
                errorMessage = "Pole wymagane"
            }
        }
        if (fieldName === 'NoweHaslo1') {

           if( fieldValue != newPassword){
            errorMessage = "Hasła są niezgodne"
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
            const errorMessage = this.validateField(fieldName, fieldValue, user['NoweHaslo'])
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
                    <div className="bg-white max-w-2lx mx-auto p-6 md:p-8 my-10 rounded-lg shadow-2xl">
                       <div className="mx-8 my-10">
                            <p className="text-center mx-48 font-bold text-4xl">Zmiana Hasła </p>
                            <form className="flex flex-col pt-5 md:pt-6" onSubmit={this.handleSubmit}>
                                  <div className="my-3 pt-3  rounded bg-gray-200">
                                       <input type="text" id="Haslo" name="Haslo" placeholder="Stare hasło" onChange={this.handleChange}
                                          className={this.state.errors.Haslo ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                          : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                  </div>
                                  <span id="errorHaslo" className="errors-text">{this.state.errors.Haslo}</span>

                                  <div className="my-5 pt-3 rounded bg-gray-200">
                                       <input type="password" id="NoweHaslo" name="NoweHaslo" placeholder="Nowe hasło" onChange={this.handleChange}
                                           className={this.state.errors.NoweHaslo ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                           : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                  </div>
                                  <span id="errorNoweHaslo" className="errors-text">{this.state.errors.NoweHaslo}</span>

                                  <div className="my-3 pt-3 rounded bg-gray-200">
                                       <input type="password" id="NoweHaslo1" name="NoweHaslo1" placeholder="Potwierdź nowe hasło" onChange={this.handleChange}
                                           className={this.state.errors.NoweHaslo1 ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                           : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                  </div>
                                  <span id="errorNoweHaslo1" className="errors-text">{this.state.errors.NoweHaslo1}</span>

                                  <span id="error" className="errors-text2">{this.state.message}</span>

                                  <div class="flex justify-between">
                                      <p className=" text-black font-bold  underline text-lg hover:text-red-400 p-2 mt-6"><Link to="#" >Anuluj</Link></p>
                                      <input type="submit" value="Zapisz zmiany"
                                         className="bg-blue-400 text-white font-bold rounded-lg text-lg hover:bg-black p-2 px-8 mt-6 " />
                                  </div>
                            </form>
                            <div className="text-center pt-3">
                                 <p><Link to="#" className="underline font-semibold hover:text-blue-400">Nie pamiętam hasła</Link></p>
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

export default  withNavigate(withRouter(ZmianaHasla));