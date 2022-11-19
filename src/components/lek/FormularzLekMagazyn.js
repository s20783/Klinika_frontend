import React from "react";
import formMode from "../helpers/FormMode";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {checkNumberRange} from "../helpers/CheckNRange";
import {addLekMagazyn, getLekMagazyn, updateLekMagazyn} from "../../api/LekWMagazynieApiCalls";
import Calendar from "react-calendar";
import dayjs from "dayjs";

class FormularzLekMagazyn extends React.Component {
    constructor(props) {
        super(props);

        const paramsIdStanLeku = this.props.params.IdStanLeku
        const paramsIdLek = this.props.params.IdLek
        const currentFormMode = paramsIdStanLeku ? formMode.EDIT : formMode.NEW

        this.state = {
            data: {
                Ilosc: '',
                DataWaznosci: '',
            },
            errors: {
                Nazwa: '',
                DataWaznosci: '',
            },

            idStanLeku: paramsIdStanLeku,
            idLek:paramsIdLek,
            date: new Date(),
            error: '',
            isLoaded: false,
            notice: '',
            formMode: currentFormMode
        }
    }


    componentDidMount() {

        console.log(this.state.formMode)

        if (this.state.formMode === formMode.EDIT) {
            getLekMagazyn(this.state.idStanLeku)
                .then(res => res.json())
                .then(
                    (data) => {
                        console.log(data + "sddddddddddddddddd")
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

    onChange = (date) => {
        const data = {...this.state.data}
        console.log(dayjs(date).format())
        data['DataWaznosci'] = dayjs(date).format()

        const errorMessage = this.validateField('DataWaznosci', date)
        const errors = {...this.state.errors}
        errors['DataWaznosci'] = errorMessage

        this.setState({
            data: data,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        const {t} = this.props;
        let errorMessage = '';
        if (fieldName === 'Ilosc') {
            if (!checkNumberRange(fieldValue, 0, 500)) {
                errorMessage = t('validation.max50')
            }
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        if (fieldName === 'DataWaznosci') {
            if (fieldValue < Date.now()) {
                errorMessage = t('validation.date1')
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


        if (isValid) {

            if (dane.formMode === formMode.NEW) {
                promise = addLekMagazyn(dane.idLek, dane.data)
                console.log(dane.data )

            } else if (dane.formMode === formMode.EDIT) {
                promise = updateLekMagazyn(dane.data, dane.idStanLeku)
                console.log(dane.data +" "+ dane.idStanLeku)
            }
            if (promise) {
                promise
                    .then(res => {
                        response = res
                        if (response.ok ) {
                            navigate(-1, {replace: true});
                            return res.json()
                        }
                    })
                    .then(
                        (data) => {
                            console.log(data)
                            console.log(response)
                            if (response.ok ) {
                                console.log(response)
                                navigate(-1, {replace: true});

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
    }


    render() {
        const {data, errors, date} = this.state
        const {t} = this.props;
        const {navigate} = this.props
        const pageTitle = this.state.formMode === formMode.NEW ? t('lek.addNewMedicineWarehouse') : t('lek.editMedicineWarehouse')

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

                        <div className="flex flex-wrap -mx-3 mb-6 border-b">
                            <div className="w-full md:w-2/6 px-3 mb-6 md:mb-0">
                                <label className="block  tracking-wide text-gray-600 text-s font-bold mb-2">
                                    {t('lek.fields.quantity')}
                                </label>
                                <input
                                    className=" form-textarea appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:border-blue-600 "
                                    name="Ilosc" id="Ilosc" type="text" value={data.Ilosc}
                                    placeholder=""
                                    onChange={this.handleChange}/>
                                <span id="errorIlosc"
                                      className="errors-text2 mb-4 ">{errors.Ilosc}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6 ">
                            <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                                <label className="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-city">
                                    {t('lek.fields.expirationDate')}
                                </label>
                                <Calendar className="mb-7 calendarForm"
                                          value={date}
                                          onClickDay={this.onChange}
                                    //locale={language}
                                />
                                <span id="" className="">
                                 {data.DataWaznosci === '' || errors.DataWaznosci !== '' ?
                                     '' : t('other.selectedDate') + dayjs(data.DataWaznosci).format('YYYY-MM-DD')}</span>
                                <span id="errorData" className="errors-text2 mb-4">
                                {errors.DataWaznosci}
                            </span>
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

export default withTranslation()(withNavigate(withRouter(FormularzLekMagazyn)));