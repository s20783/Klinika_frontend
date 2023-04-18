import React from "react";
import formMode from "../../helpers/FormMode";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {CheckTextRange} from "../../helpers/CheckTextRange";
import {addDisease, getDiseaseDetails, updateDisease} from "../../axios/DiseaseApiCalls";
import axios from "axios";

let CancelToken
let source
class DiseaseForm extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdChoroba = this.props.params.IdChoroba
        const currentFormMode = paramsIdChoroba ? formMode.EDIT : formMode.NEW
        this.state = {
            data: {
                Nazwa: '',
                Opis: '',
                NazwaLacinska: ''
            },
            errors: {
                Nazwa: '',
                Opis: '',
                NazwaLacinska: ''
            },
            idChoroba: paramsIdChoroba,
            error: '',
            isLoaded: false,
            formMode: currentFormMode
        }
    }

    async componentDidMount() {
        CancelToken = axios.CancelToken;
        source = CancelToken.source();
        if (this.state.formMode === formMode.EDIT) {
            try {
                await getDiseaseDetails(this.state.idChoroba, source)
                    .then((res) => {
                    if (res) {
                        this.setState({
                            isLoaded: true,
                            data: res.data
                        });
                    }
                })
            } catch (e) {
                console.log(e)
            }
        }
    }

     componentWillUnmount() {
         if (source) {
             source.cancel('Operation canceled by the user.');
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
            errors[fieldName] = this.validateField(fieldName, fieldValue)
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
                     await addDisease(dane.data, source)
                     await navigate(-1, {replace: true});
                } catch (e) {
                    console.log(e)
                }
            } else if (dane.formMode === formMode.EDIT) {
                try {
                    await updateDisease(dane.data, dane.idChoroba, source)
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
            <div className="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3">
                <div className="w-full lg:w-1/6 lg:px-6 text-gray-800 leading-normal">
                    <p className="text-base font-bold py-2 text-xl lg:pb-6 text-gray-700">{pageTitle}</p>
                </div>
                <div
                    className="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                    <form onSubmit={this.handleSubmit}>
                        <section className="bg-white-100 border-b  mb-7">
                            <div className=" flex flex-wrap md:flex mb-6 mt-4">
                                <label className="block text-gray-600 font-bold md:text-left mb-3 mt-2 md:mb-0 pr-7"
                                       htmlFor="Nazwa">
                                    {t('choroba.fields.name')}
                                </label>
                                <div className="md:w-3/5">
                                    <input
                                        className= "shadow-xl form-textarea block w-full focus:bg-white"
                                        name="Nazwa" id="Nazwa" type="text" value={this.state.data.Nazwa}
                                        onChange={this.handleChange} placeholder=""/>

                                </div>
                                <span id="errorNazwa"
                                      className="errors-text2 ml-24 mt-4">{this.state.errors.Nazwa}</span>
                            </div>
                        </section>
                        <div className="flex flex-wrap -mx-3 mb-4 border-b">
                            <div className="w-full px-3">
                                <label className="block tracking-wide text-gray-600 text-s font-bold mb-2">
                                    {t('choroba.fields.latinName')}
                                </label>
                                <input
                                    className="shadow-xl form-textarea appearance-none block w-full md:w-4/6  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-blue-600"
                                    name="NazwaLacinska" id="NazwaLacinska" type="text" value={this.state.data.NazwaLacinska}
                                    onChange={this.handleChange}/>
                            </div>
                            <span id="errorNazwaLacinska" className="errors-text2 mb-4 ml-4">{this.state.errors.NazwaLacinska}</span>
                        </div>

                        <label className="block mt-5 text-gray-600 font-bold md:text-left mb-6 " id="Opis">
                            {t('choroba.fields.description')}
                        </label>
                        <div className="md:w-3/4 mt-5">
                        <textarea className="shadow-xl form-textarea block w-full focus:bg-white " id="Opis" name="Opis"
                                  placeholder={t('choroba.addDescription')}
                                  rows="5" value={this.state.data.Opis} onChange={this.handleChange}/>
                        </div>
                        <span id="errorOpis" className="errors-text2 mt-4">{this.state.errors.Opis}</span>

                        <div className=" md:flex mb-6 mt-8 ">
                            <div className="flex pb-3">
                                <button onClick={() => navigate(-1)}
                                        className="shadow-lg bg-red-500 hover:bg-white  hover:text-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                        type="button">
                                    {t("button.back")}
                                </button>
                                <button type="submit"
                                        className="shadow-lg ml-4 shadow bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
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

export default withTranslation()(withNavigate(withRouter(DiseaseForm)));