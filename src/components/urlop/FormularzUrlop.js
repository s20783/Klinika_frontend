import React from 'react';
import Calendar from 'react-calendar';
import {useNavigate, useParams} from "react-router";
import dayjs from 'dayjs';
import {addUrlop, getUrlopDetails, editUrlop} from "../../api/UrlopApiCall";
import {CheckTextRange} from "../helpers/CheckTextRange";
import formMode from "../helpers/FormMode";
import {withTranslation} from "react-i18next";
import SzczegolyVetMenu from "../fragments/SzczegolyVetMenu";


class FormularzUrlop extends React.Component {
    constructor(props) {
        super(props);

        const IdVet = this.props.params.IdVet
        const paramsIdUrlop = this.props.params.IdUrlop
        const currentFormMode = paramsIdUrlop ? formMode.EDIT : formMode.NEW
        console.log(paramsIdUrlop)
        this.state = {
            data: {
                ID_weterynarz: IdVet,
                Dzien: ''
            },
            errors: {
                Dzien: ''
            },
            idUrlop: paramsIdUrlop,
            idVet: IdVet,
            date: new Date(),
            formMode: currentFormMode,
            message: ''
        }
    }

    componentDidMount() {

        if (this.state.idUrlop) {
            getUrlopDetails(this.state.idUrlop)
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
        let errorMessage = '';
        if (fieldName === 'Dzien') {
            if (!fieldValue) {
                errorMessage = `Pole wymagane`
            }
        }
        return errorMessage
    }

    onChange = (date) => {
        const data = {...this.state.data}
        console.log(dayjs(date).format())
        data['Dzien'] = dayjs(date).format()

        const errorMessage = this.validateField('Dzien', date)
        const errors = {...this.state.errors}
        errors['Dzien'] = errorMessage

        this.setState({
            data: data,
            errors: errors
        })
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
        const isValid = this.validateForm()
        const dane = {...this.state}
        let response, promise;
        console.log(dane.data)

        if (isValid) {

            if (dane.formMode === formMode.NEW) {
                promise = addUrlop(dane.data)
            } else if (dane.formMode === formMode.EDIT) {
                promise = editUrlop(dane.idUrlop, dane.data)
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
        const {data, errors, date} = this.state
        const {t} = this.props;
        const {i18n} = this.props;
        let language = i18n.language
        const pageTitle = this.state.formMode === formMode.NEW ? t('urlop.addNewVacation') : t('urlop.editVacation')


        return (
            <div className="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3">
                <div className="w-full lg:w-1/6 lg:px-6 text-gray-800 leading-normal">
                    <p className="text-base font-bold py-2 text-xl lg:pb-6 text-gray-700">{pageTitle}</p>
                </div>
                <div
                    className="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                    <form onSubmit={this.handleSubmit} className="w-full max-w">
                        <div class="flex flex-wrap -mx-3 mb-6 ">
                            <div class="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                                <abel class="block  tracking-wide text-gray-700 text-s font-bold mb-2" form="grid-city">
                                    Data urlopu
                                </abel>
                                <Calendar className="mb-7 calendarForm"
                                          value={date}
                                          onClickDay={this.onChange}
                                          locale={language}
                                />
                                <span id="" className="">
                                 {data.Dzien === '' || errors.Dzien !== '' ?
                                     '' : t('other.selectedDate') + dayjs(data.Dzien).format('YYYY-MM-DD')}</span>
                                <span id="errorData" className="errors-text2 mb-4">
                                {errors.Dzien}
                            </span>
                            </div>
                        </div>

                        <div className=" md:flex mb-6 mt-8 ">
                            <div className="flex pb-3">
                                <button onClick={() => navigate(-1)}
                                        className="shadow bg-red-500 hover:bg-white  hover:text-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                        type="button">
                                    {t('button.back')}
                                </button>
                                <button type="submit"
                                        className=" ml-4 shadow bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
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
    return (<WrappedComponent
            {...props}
            params={params}
        />
    );
};

export default withTranslation()(withNavigate(withRouter(FormularzUrlop)));