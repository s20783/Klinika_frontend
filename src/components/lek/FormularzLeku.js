import React from "react";
import formMode from "../helpers/FormMode";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {CheckTextRange} from "../helpers/CheckTextRange";
import {addLek, getLekDetails, updateLek} from "../../api/LekApiCalls";

class FormularzLeku extends React.Component {
    constructor(props) {
        super(props);

        const paramsIdLek = this.props.params.IdLek
        const currentFormMode = paramsIdLek ? formMode.EDIT : formMode.NEW

        this.state = {
            data: {
                Nazwa: '',
                JednostkaMiary: '',
                Producent: '',
            },
            errors: {
                Nazwa: '',
                JednostkaMiary: '',
                Producent: '',
            },

            idLek: paramsIdLek,
            error: '',
            isLoaded: false,
            notice: '',
            formMode: currentFormMode
        }
    }


    componentDidMount() {

        console.log(this.state.formMode)

        if (this.state.formMode === formMode.EDIT) {
            getLekDetails(this.state.idLek)
                .then(res => res.json())
                .then(
                    (data) => {
                        console.log(data)
                        if (data.message) {
                            this.setState({
                                notice: data.message
                            })
                        } else {
                            this.setState({
                                data: data,
                                notice: null
                            })
                        }
                        this.setState({
                            isLoaded: true,
                        })
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        })
                    }
                );
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
        if (fieldName === 'JednostkaMiary') {
            if (!CheckTextRange(fieldValue, 2, 50)) {
                errorMessage = t('validation.max50')
            }
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        if (fieldName === 'Producent') {
            if (!CheckTextRange(fieldValue, 0, 50)) {
                errorMessage = t('validation.max50')
            }
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        return errorMessage;
    }

    hasErrors = () => {
        const errors = this.state.errors
        console.log(errors)
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


    handleSubmit = (event) => {
        event.preventDefault();
        const {navigate} = this.props;
        const dane = {...this.state}
        let response, promise;
        console.log(dane.data)
        const isValid = this.validateForm()
        console.log(isValid)


        if (isValid) {

            if (dane.formMode === formMode.NEW) {
                promise = addLek(dane.data)
            } else if (dane.formMode === formMode.EDIT) {
                promise = updateLek(dane.data, dane.idLek)
            }
            if (promise) {
                promise
                    .then(res => {
                        response = res
                        console.log(response.status)
                        if (response.ok) {
                            console.log(response.status)
                            navigate(-1);
                        } else if (response.status === 401) {
                            console.log("Brak autoryzacji")

                        } else {
                            console.log(response.status)
                        }
                    })
            }
        }
    }


    render() {
        const {data, errors} = this.state
        const {t} = this.props;
        const {navigate} = this.props
        const pageTitle = this.state.formMode === formMode.NEW ? t('lek.addNewMedicine') : t('lek.editMedicine')

        return (
            <div class="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3">
                <div class="w-full lg:w-1/6 lg:px-6 text-gray-800 leading-normal">
                    <p class="text-base font-bold py-2 text-xl lg:pb-6 text-gray-700">{pageTitle}</p>
                    <div class="block lg:hidden sticky inset-0">
                        <button id="menu-toggle"
                                class="flex w-full justify-end px-3 py-3 bg-white lg:bg-transparent border rounded border-gray-600 hover:border-purple-500 appearance-none focus:outline-none">
                            <svg class="fill-current h-3 float-right" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div
                    className="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                    <form onSubmit={this.handleSubmit}>
                        <section class="bg-white-100 border-b  mb-7">
                            <div class=" flex flex-wrap md:flex mb-6 mt-4">
                                <label className="block text-gray-600 font-bold md:text-left mb-3 mt-2 md:mb-0 pr-7"
                                       htmlFor="Nazwa">
                                    {t('lek.fields.name')}
                                </label>
                                <div class="md:w-3/5">
                                    <input
                                        class={errors.Nazwa ? "form-textarea block w-full focus:bg-red" : "form-textarea block w-full focus:bg-white"}
                                        name="Nazwa" id="Nazwa" type="text" value={data.Nazwa}
                                        onChange={this.handleChange} placeholder=""/>
                                </div>
                                <span id="errorNazwa" className="errors-text2 ml-24 mt-4">
                                    {errors.Nazwa}</span>
                            </div>
                        </section>

                        <div className="flex flex-wrap -mx-3 mb-6 border-b">
                            <div className="w-full md:w-2/6 px-3 mb-6 md:mb-0">
                                <label className="block  tracking-wide text-gray-600 text-s font-bold mb-2">
                                    {t('lek.fields.unitOfMeasure')}
                                </label>
                                <input
                                    className=" form-textarea appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:border-blue-600 "
                                    name="JednostkaMiary" id="JednostkaMiary" type="text" value={data.JednostkaMiary}
                                    placeholder=""
                                    onChange={this.handleChange}/>
                                <span id="errorJednostkaMiary"
                                      className="errors-text2 mb-4 ">{errors.JednostkaMiary}</span>
                            </div>
                            <div className="w-full md:w-2/6 px-3 ml-8">
                                <label className="block  tracking-wide text-gray-600 text-s font-bold mb-2"
                                       form="grid-last-name">
                                    {t('lek.fields.manufacturer')}
                                </label>
                                <input
                                    className=" form-textarea appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="Producent" id="Producent" type="text" value={data.Producent} placeholder=""
                                    onChange={this.handleChange}/>
                                <span id="errorProducent" className="errors-text2 mb-4 ">{errors.Producent}</span>
                            </div>
                        </div>

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

export default withTranslation()(withNavigate(withRouter(FormularzLeku)));