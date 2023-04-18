import React from "react";
import formMode from "../../helpers/FormMode";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {CheckTextRange} from "../../helpers/CheckTextRange";
import {addMedicament, getMedicamentDetails, updateMedicament} from "../../axios/MedicamentApiCalls";
import axios from "axios";
let CancelToken
let source
class MedicamentForm extends React.Component {
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
    componentWillUnmount() {
        if (source) {
            source.cancel('Operation canceled by the user.');
        }
    }

    async componentDidMount() {
        CancelToken = axios.CancelToken;
        source = CancelToken.source();
        if (this.state.formMode === formMode.EDIT) {
            try {

                await getMedicamentDetails(this.state.idLek, source)
                    .then((res) => {
                    if (res) {
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
            if (fieldValue.length > 50) {
                errorMessage = t('validation.max50nullable')
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


    handleSubmit = async (event) => {
        event.preventDefault();
        const {navigate} = this.props;
        const dane = {...this.state}
        const isValid = this.validateForm()

        if (isValid) {
            if (dane.formMode === formMode.NEW) {
                try {
                    await addMedicament(dane.data,source)
                    navigate(-1, {replace: true});
                } catch (error) {
                    console.log(error)
                }
            } else if (dane.formMode === formMode.EDIT) {
                try {
                    await updateMedicament(dane.data, dane.idLek, source)
                    navigate(-1, {replace: true});
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
        const pageTitle = this.state.formMode === formMode.NEW ? t('lek.addNewMedicine') : t('lek.editMedicine')
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
                                    {t('lek.fields.name')}
                                </label>
                                <div className="md:w-3/5">
                                    <input
                                        className="shadow-xl form-textarea block w-full focus:bg-white"
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
                                    className="shadow-xl form-textarea appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:border-blue-600 "
                                    name="JednostkaMiary" id="JednostkaMiary" type="text" value={data.JednostkaMiary}
                                    placeholder=""
                                    onChange={this.handleChange}/>
                                <span id="errorJednostkaMiary"
                                      className="errors-text2 mb-4 ">{errors.JednostkaMiary}</span>
                            </div>
                            <div className="w-full md:w-2/6 px-3 md:ml-8">
                                <label className="block  tracking-wide text-gray-600 text-s font-bold mb-2"
                                       form="grid-last-name">
                                    {t('lek.fields.manufacturer')}
                                </label>
                                <input
                                    className="shadow-xl form-textarea appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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

export default withTranslation()(withNavigate(withRouter(MedicamentForm)));