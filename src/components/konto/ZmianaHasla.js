import {useNavigate, useParams} from "react-router";
import React from "react";
import {Link} from "react-router-dom";
import {changePassword} from "../../api/authApiCalls";
import {CheckTextRange} from "../helpers/CheckTextRange";
import {ValidateHaslo} from "../helpers/ValidateHaslo";
import {withTranslation} from "react-i18next";

class ZmianaHasla extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                currentHaslo: '',
                newHaslo: '',
                newHaslo2: ''
            },
            errors: {
                currentHaslo: '',
                newHaslo: '',
                newHaslo2: ''
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
        const {navigate} = this.props;
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
                            console.log(response.status)
                            navigate("/konto", {replace: true});

                        } else if (response.status === 401) {
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
        const {t} = this.props;
        const user = this.state.user;
        if (fieldName === 'currentHaslo') {
            if (!CheckTextRange(fieldValue, 2, 30)) {
                errorMessage = `${t('validation.max30')}`
            }
            if (!fieldValue) {
                errorMessage = `${t('validation.required')}`
            }
        }
        if (fieldName === 'newHaslo') {
            if (!ValidateHaslo(fieldValue)) {
                errorMessage = `${t('validation.password')}`
            }
            if (!CheckTextRange(fieldValue, 5, 30)) {
                errorMessage = `${t('validation.from8to30')}`
            }
            if (!fieldValue) {
                errorMessage = `${t('validation.required')}`
            }
        }
        if (fieldName === 'newHaslo2') {
            if (!ValidateHaslo(fieldValue)) {
                errorMessage = `${t('validation.password')}`
            }
            if (fieldValue !== user['newHaslo']) {
                errorMessage = `${t('validation.notSame')}`
            }
            if (!CheckTextRange(fieldValue, 5, 30)) {
                errorMessage = `${t('validation.from8to30')}`
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
        const {navigate} = this.props
        const {t} = this.props
        return (
            <main>
                <div className="w-full flex flex-wrap ">
                    <div className="bg-white max-w-2lx mx-auto p-6 md:p-8 my-10 rounded-lg shadow-2xl">
                        <div className="mx-8 my-10">
                            <p className="text-center mx-48 mb-6 font-bold text-4xl">{t("konto.changePassword")}</p>
                            <form className="flex flex-col pt-5 md:pt-6" onSubmit={this.handleSubmit}>
                                <div className="my-3 pt-3  rounded bg-gray-200">
                                    <p className=" pl-2 text-sm text-gray-600 font-bold">{t("konto.field.currentPassword")}</p>

                                    <input type="text" id="currentHaslo" name="currentHaslo"
                                           onChange={this.handleChange}
                                           className={this.state.errors.currentHaslo ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                               : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                </div>
                                <span id="errorHaslo" className="errors-text">{this.state.errors.currentHaslo}</span>
                                <div className="my-5 pt-3 rounded bg-gray-200">
                                    <p className=" pl-2 text-sm text-gray-600 font-bold">{t("konto.field.newPassword")}</p>

                                    <input type="password" id="newHaslo" name="newHaslo"
                                           onChange={this.handleChange}
                                           className={this.state.errors.newHaslo ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                               : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                </div>
                                <span id="errornewHaslo" className="errors-text">{this.state.errors.newHaslo}</span>
                                <div className="my-3 pt-3 rounded bg-gray-200">
                                    <p className=" pl-2 text-sm text-gray-600 font-bold">{t("konto.field.newPassword2")}</p>

                                    <input type="password" id="newHaslo2" name="newHaslo2"
                                           onChange={this.handleChange}
                                           className={this.state.errors.newHaslo2 ? 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                                               : 'bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}/>
                                </div>
                                <span id="errornewHaslo2" className="errors-text">{this.state.errors.newHaslo2}</span>
                                <span id="error" className="errors-text2">{this.state.message}</span>
                                <div class="flex justify-between">
                                    <p className=" text-black font-bold  underline text-lg hover:text-red-400 p-2 mt-6">
                                        <button onClick={() => navigate(-1)}>{t("button.back")}</button>
                                    </p>
                                    <input type="submit" value={t("konto.saveChanges")}
                                           className="bg-blue-400 text-white font-bold rounded-lg text-lg hover:bg-black p-2 px-8 mt-6 "/>
                                </div>
                            </form>
                            <div className="text-center pt-3">
                                <p><Link to="#"
                                         className="underline font-semibold hover:text-blue-400">{t("konto.forgotPassword")}</Link>
                                </p>
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
    return <Component {...props} navigate={navigate}/>;
};

export default withTranslation()(withNavigate(withRouter(ZmianaHasla)));