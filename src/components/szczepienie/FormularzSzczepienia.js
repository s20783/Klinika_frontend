import React from "react";
import formMode from "../helpers/FormMode";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {getSzczepionkaList} from "../../axios/SzczepionkaAxiosCalls";
import {CheckTextRange} from "../helpers/CheckTextRange";
import dayjs from "dayjs";
import Calendar from "react-calendar";
import {addSzczepienie, getSzczepienieDetails, updateSzczepienie} from "../../axios/SzczepienieAxionCalls";
import {getPacjentDetails} from "../../axios/PacjentAxiosCalls";

class FormularzSzczepienia extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdSzczepienie = this.props.params.idSzczepienie
        const currentFormMode = paramsIdSzczepienie ? formMode.EDIT : formMode.NEW
        const paramsIdPacjent = this.props.params.idPacjent

        this.state = {
            data:{
                IdLek:'',
                IdPacjent:paramsIdPacjent,
                Dawka:'' ,
                Data:''
            },
            errors:{
                IdLek:'',
                Dawka:'' ,
                Data:''
            },
            date: new Date(),
            szczepionki: [],
            idSzczepienie:paramsIdSzczepienie,
            idPacjent: paramsIdPacjent,
            error: '',
            isLoaded: false,
            notice: '',
            formMode: currentFormMode
        }
    }

    fetchSzczepionkiList = async () => {
        try {
            const res = await getSzczepionkaList();
            var data = await res.data

            this.setState({
                isLoaded: true,
                szczepionki: data
            });
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
         this.fetchSzczepionkiList()

        if (this.state.idSzczepienie) {
             this.fetchSzczepienieDetails();
        }

    }

    fetchSzczepienieDetails = async () => {
        try{
            const res = await getSzczepienieDetails(this.state.idSzczepienie);
            var data = await res.data

            this.setState({
                isLoaded: true,
                data: data
            });
        } catch (error){
            console.log(error)
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target
        const data = {...this.state.data}
        data[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = {...this.state.errors}
        errors[name] = errorMessage

        console.log(errors)

        this.setState({
            data: data,
            errors: errors
        })
    }
    onChange = (date) => {
        const data = {...this.state.data}
        console.log(dayjs(date).format())
        data['Data'] = dayjs(date).format()

        const errorMessage = this.validateField('Data', date)
        const errors = {...this.state.errors}
        errors['Data'] = errorMessage

        this.setState({
            data: data,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        const {t} = this.props;
        let errorMessage = '';

        if (fieldName === 'IdLek') {
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        if (fieldName === 'Dawka') {
           /* if (fieldValue < 0 || fieldValue > 999) {
                errorMessage = `Pole powinno być liczbą z przedziału od 0 do 1000.`
            }*/

            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        if (fieldName === 'Data') {
            if (dayjs(fieldValue).diff(dayjs(new Date())) > 0) {
                errorMessage = t('validation.date')
            }
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        return errorMessage
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
        const isValid = this.validateForm()
        const dane = {...this.state}

        if (isValid) {
            if (dane.formMode === formMode.NEW) {
                try {
                    await addSzczepienie(dane.data);
                    await navigate(-1, {replace: true});
                } catch (error) {
                    console.log(error)
                }
            } else if (dane.formMode === formMode.EDIT) {
                try {
                    await updateSzczepienie(dane.data, dane.idSzczepienie)
                    await navigate(-1, {replace: true});
                } catch (error) {
                    console.log(error)
                }
            }
        }
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
        const { szczepionki, errors, data, date} = this.state
        const {t, navigate} = this.props;
        const {i18n} = this.props;
        let language = i18n.language

        const pageTitle = this.state.formMode === formMode.NEW ? t('szczepienie.addVaccination') : t('szczepienie.editVaccination')

        return (
            <div class="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3">
                <div class="w-full lg:w-1/6 lg:px-6 text-gray-800 leading-normal">
                    <p class="text-base font-bold py-2 text-xl lg:pb-6 text-gray-700">{pageTitle}</p>
                </div>

                <div
                    className="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                    <form onSubmit={this.handleSubmit} className="w-full max-w">




                        <div className="flex flex-wrap -mx-3 mb-6 border-b">
                            <div className="w-full md:w-4/6 px-3 mb-6 md:mb-0">
                                <label className="block  tracking-wide text-gray-600 text-s font-bold mb-2">
                                    {t('szczepienie.fields.vaccine')}
                                </label>
                                <select name="IdLek" id="IdLek" onChange={this.handleChange}
                                        className="shadow-xl form-select  w-full focus:bg-white">
                                    <option value="">{t('szczepienie.selectVaccine')}</option>
                                    {
                                        szczepionki.map(szczepionka => (
                                            <option selected={data.IdLek === szczepionka.ID_lek}
                                                    value={szczepionka.ID_lek}>{szczepionka.Nazwa} - {szczepionka.Zastosowanie}</option>
                                        ))}
                                </select>
                                <span id="errorGatunek" className="errors-text2 mb-6 ">{errors.IdLek}</span>
                            </div>

                            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0 ml-12">
                                <label className="block  tracking-wide text-gray-600 text-s font-bold mb-2">
                                    {t('szczepienie.fields.dose')}
                                </label>
                                <input
                                    className="shadow-xl form-textarea appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:border-blue-600 "
                                    name="Dawka" id="Dawka" type="number" value={data.Dawka} placeholder=""
                                    onChange={this.handleChange}/>
                                <span id="errorDawka" className="errors-text2 mb-4 ">{errors.Dawka}</span>
                            </div>
                        </div>




                        <div className="flex flex-wrap -mx-3 mb-6 ">
                            <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                                <label className="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-city">
                                    {t('szczepienie.fields.date')}
                                </label>
                                <Calendar className="mb-7 calendarForm"
                                          value={date}
                                          onClickDay={this.onChange}
                                          locale={language}
                                />
                                <span id="" className="">
                                 {data.Data === '' || errors.Data !== '' ?
                                     '' : t('other.selectedDate') + dayjs(data.Data).format('YYYY-MM-DD')}</span>
                                <span id="errorData" className="errors-text2 mb-4">{errors.Data}</span>
                            </div>
                        </div>

                        <div className=" md:flex mb-6 mt-8 ">
                            <div className="flex pb-3">
                                <button onClick={() => navigate(-1)}
                                        className="shadow-xl bg-red-500 hover:bg-white  hover:text-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                        type="button">
                                    {t('button.back')}
                                </button>
                                <button type="submit"
                                        className=" ml-4 shadow-xl bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                    {t('button.confirm')}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
const withNavigate = Component => props => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate}/>;
};

const withRouter = WrappedComponent => props => {
    const params = useParams();

    return (
        <WrappedComponent
            {...props}
            params={params}
        />
    );
};

export default withTranslation()(withRouter(withNavigate(FormularzSzczepienia)));