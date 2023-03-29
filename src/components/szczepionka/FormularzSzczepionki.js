import React from "react";
import formMode from "../helpers/FormMode";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {CheckTextRange} from "../helpers/CheckTextRange";
import {addSzczepionka, getSzczepionkaDetails, updateSzczepionka} from "../../axios/SzczepionkaAxiosCalls";
import axios from "axios";
let CancelToken
let source

class FormularzSzczepionki extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdSzczepionka = this.props.params.idSzczepionka
        const currentFormMode = paramsIdSzczepionka ? formMode.EDIT : formMode.NEW

        this.state = {
            data: {
                Nazwa: '',
                Zastosowanie: '',
                CzyObowiazkowa: false,
                OkresWaznosci: '',
                Producent: '',
            },
            errors: {
                Nazwa: '',
                Zastosowanie: '',
                CzyObowiazkowa: '',
                OkresWaznosci: '',
                Producent: '',
            },
            idSzczepionka: paramsIdSzczepionka,
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

                await getSzczepionkaDetails(this.state.idSzczepionka, source)
                    .then((res) => {
                    if (res) {
                        console.log(res.data)
                        this.setState({
                            isLoaded: true,
                            data: res.data
                        });
                    }
                })
            } catch (error) {
                console.log(error)
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
        if (fieldName === 'Zastosowanie') {
            if (fieldValue > 100) {
                errorMessage = t('validation.max100')
            }
        }
        if (fieldName === 'OkresWaznosci') {
            if (fieldValue) {
                if (fieldValue > 1000) {
                    errorMessage = t('validation.quantity')
                }
            }
        }
        if (fieldName === 'Producent') {
            if(fieldValue){
                if (fieldValue.length > 50) {
                    errorMessage = t('validation.max50nullable')
                }
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

    onChange1 = (event) => {
        const {name} = event.target
        const data = {...this.state.data}
        data[name] = !data[name]

        this.setState({
            data: data,
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const {navigate} = this.props;
        const dane = {...this.state}
        const isValid = this.validateForm()

        if (isValid) {
            if (dane.formMode === formMode.NEW) {
                try {
                    await addSzczepionka(dane.data, source)
                    navigate("/szczepionki", {replace: true});
                } catch (error) {
                    console.log(error)
                }
            } else if (dane.formMode === formMode.EDIT) {
                try {
                    await updateSzczepionka(dane.data, dane.idSzczepionka, source)
                    navigate("/szczepionki", {replace: true});
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }

    render() {
        const {data, errors} = this.state
        const {t} = this.props;
        const {navigate} = this.props
        const pageTitle = this.state.formMode === formMode.NEW ? t('szczepionka.addNewVaccine') : t('szczepionka.editVaccine')

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
                                    {t('szczepionka.fields.name')}
                                </label>
                                <div className="md:w-3/5">
                                    <input
                                        className= "shadow-xl form-textarea block w-full focus:bg-white"
                                        name="Nazwa" id="Nazwa" type="text" value={data.Nazwa}
                                        onChange={this.handleChange} placeholder=""/>
                                </div>
                                <span id="errorNazwa" className="errors-text2 ml-24 mt-4">
                                    {errors.Nazwa}</span>
                            </div>
                        </section>

                        <div className="flex flex-wrap -mx-3 mb-6 border-b">
                            <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                                <label className="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-city">
                                    {t('szczepionka.fields.application')}
                                </label>
                                <textarea className="shadow-xl form-textarea block w-full focus:bg-white mb-6" id="Zastosowanie"
                                          name="Zastosowanie"
                                          value={data.Zastosowanie} rows="5"
                                          onChange={this.handleChange}/>
                                <span id="errorNazwa" className="errors-text2  my-4">
                                    {errors.Zastosowanie}</span>
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 mt-6 md:ml-14 md:mb-0">
                                <div className=" mb-6">
                                    <label className="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                           form="grid-city">
                                        {t('szczepionka.fields.mandatory')}
                                    </label>

                                        <input type="checkbox" name="CzyObowiazkowa"
                                               checked={data.CzyObowiazkowa === true}
                                               className=" form-checkbox mb-4 w-8 h-8 text-blue-600"
                                               onChange={this.onChange1}/>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6 ">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-city">
                                    {t('szczepionka.fields.periodOfValidity')}
                                </label>
                                <input
                                    className="shadow-xl form-textarea block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="OkresWaznosci" id="OkresWaznosci" type="number" value={data.OkresWaznosci}
                                    onChange={this.handleChange} placeholder=""/>
                                <span id="errorOkresWaznosci" className="errors-text2 mb-4 ">{errors.OkresWaznosci}</span>
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:ml-8 md:mb-0">
                                <label className="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-city">
                                    {t('szczepionka.fields.manufacturer')}
                                </label>
                                <input
                                    className="shadow-xl appearance-none form-textarea block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="Producent" id="Producent" type="text" value={data.Producent} placeholder=""
                                    onChange={this.handleChange}/>
                                <span id="errorProducent" className="errors-text2 mb-4 ">{errors.Producent}</span>
                            </div>
                        </div>


                        <div className=" md:flex mb-6 mt-8 ">
                            <div className="flex pb-3">
                                <button onClick={() => navigate(-1)}
                                        className="shadow-xl bg-red-500 hover:bg-white  hover:text-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                        type="button">
                                    {t("button.back")}
                                </button>
                                <button type="submit"
                                        className="shadow-xl ml-4 shadow bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
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

export default withTranslation()(withNavigate(withRouter(FormularzSzczepionki)));