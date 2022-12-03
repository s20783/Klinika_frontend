import React from "react";
import formMode from "../helpers/FormMode";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {CheckTextRange} from "../helpers/CheckTextRange";
import {addChoroba, getChorobaDetails, updateChoroba} from "../../axios/ChorobaAxiosCalls";

class FormularzChoroby extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdChoroba = this.props.params.IdChoroba
        const currentFormMode = paramsIdChoroba ? formMode.EDIT : formMode.NEW
        this.state = {
            data: {
                Nazwa: '',
                Opis: ''
            },
            errors: {
                Nazwa: '',
                Opis: '',
            },
            idChoroba: paramsIdChoroba,
            error: '',
            isLoaded: false,
            formMode: currentFormMode
        }
    }

    async componentDidMount() {
        if (this.state.formMode === formMode.EDIT) {
            try {
                const res = await getChorobaDetails(this.state.idChoroba)
                const data = await res.data
                this.setState({
                    isLoaded: true,
                    data: data
                });
            } catch (error) {
                console.log(error)
            }
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

    validateField = (fieldName, fieldValue) => {
        const {t} = this.props;
        let errorMessage = '';
        if (fieldName === 'Nazwa') {
            if (!CheckTextRange(fieldValue, 2, 50)) {
                errorMessage = t('validation.max50')
            }
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        if (fieldName === 'Opis') {
            if (!CheckTextRange(fieldValue, 0, 300)) {
                errorMessage = t('validation.max300nullable')
            }
        }
        return errorMessage;
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

    validateForm = () => {
        const data = this.state.data
        const errors = this.state.errors
        for (const fieldName in data) {
            const fieldValue = data[fieldName]
            const errorMessage = this.validateField(fieldName, fieldValue)
            errors[fieldName] = errorMessage
        }

        this.setState({
            errors: errors
        })
        return !this.hasErrors();
    }


    handleSubmit = async (event) => {
        event.preventDefault();
        const {navigate} = this.props;
        const dane = {...this.state}
        const isValid = this.validateForm()

        if (isValid) {
            if (dane.formMode === formMode.NEW) {
                try {
                    await addChoroba(dane.data)
                    await navigate(-1, {replace: true});
                } catch (error) {
                    console.log(error)
                }
            } else if (dane.formMode === formMode.EDIT) {
                try {
                    await updateChoroba(dane.data, dane.idChoroba)
                    await navigate(-1, {replace: true});
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }

    render() {
        const {t} = this.props;
        const {navigate} = this.props
        const pageTitle = this.state.formMode === formMode.NEW ? t('choroba.addNewDisease') : t('choroba.editDisease')

        return (
            <div class="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3">
                <div class="w-full lg:w-1/6 lg:px-6 text-gray-800 leading-normal">
                    <p class="text-base font-bold py-2 text-xl lg:pb-6 text-gray-700">{pageTitle}</p>
                </div>
                <div
                    className="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                    <form onSubmit={this.handleSubmit}>
                        <section class="bg-white-100 border-b  mb-7">
                            <div class=" flex flex-wrap md:flex mb-6 mt-4">
                                <label className="block text-gray-600 font-bold md:text-left mb-3 mt-2 md:mb-0 pr-7"
                                       htmlFor="Nazwa">
                                    {t('choroba.fields.name')}
                                </label>
                                <div class="md:w-3/5">
                                    <input
                                        class={this.state.errors.Nazwa ? "form-textarea block w-full focus:bg-red" : "form-textarea block w-full focus:bg-white"}
                                        name="Nazwa" id="Nazwa" type="text" value={this.state.data.Nazwa}
                                        onChange={this.handleChange} placeholder=""/>

                                </div>
                                <span id="errorNazwa"
                                      className="errors-text2 ml-24 mt-4">{this.state.errors.Nazwa}</span>
                            </div>
                        </section>
                        <label class="block mt-5 text-gray-600 font-bold md:text-left mb-6 " id="Opis">
                            {t('choroba.fields.description')}
                        </label>
                        <div class="md:w-3/4 mt-5">
                        <textarea class="form-textarea block w-full focus:bg-white " id="Opis" name="Opis"
                                  placeholder={t('choroba.addDescription')}
                                  rows="5" value={this.state.data.Opis} onChange={this.handleChange}/>
                        </div>
                        <span id="errorOpis" className="errors-text2 mt-4">{this.state.errors.Opis}</span>

                        <div className=" md:flex mb-6 mt-8 ">
                            <div className="flex pb-3">
                                <button onClick={() => navigate(-1)}
                                        className="shadow bg-red-500 hover:bg-white  hover:text-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                        type="button">
                                    {t("button.back")}
                                </button>
                                <button type="submit"
                                        className=" ml-4 shadow bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                    {t("button.confirm")}
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

export default withTranslation()(withNavigate(withRouter(FormularzChoroby)));