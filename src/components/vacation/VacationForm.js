import React from 'react';
import Calendar from 'react-calendar';
import {useNavigate, useParams} from "react-router";
import dayjs from 'dayjs';
import {addVacation, getVacationDetails, editVacation} from "../../axios/VacationApiCalls";
import formMode from "../../helpers/FormMode";
import {withTranslation} from "react-i18next";
import axios from "axios";
let CancelToken
let source
class VacationForm extends React.Component {
    constructor(props) {
        super(props);
        const IdVet = this.props.params.IdVet
        const paramsIdUrlop = this.props.params.IdUrlop
        const currentFormMode = paramsIdUrlop ? formMode.EDIT : formMode.NEW
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
            formMode: currentFormMode
        }
    }

    async componentDidMount() {
        CancelToken = axios.CancelToken;
        source = CancelToken.source();
        if (this.state.idUrlop) {
            try {
                await getVacationDetails(this.state.idUrlop, source).then((res) => {
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

    handleSubmit = async (event) => {
        event.preventDefault();
        const {navigate} = this.props;
        const isValid = this.validateForm()
        const dane = {...this.state}

        if (isValid) {
            if (dane.formMode === formMode.NEW) {
                try {
                    await addVacation(dane.data, source)
                    await navigate(-1, {replace: true});
                } catch (error) {
                    console.log(error)
                }
            } else if (dane.formMode === formMode.EDIT) {
                try {
                    await editVacation(dane.idUrlop, dane.data, source)
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
                        <div className="flex flex-wrap -mx-3 mb-6 ">
                            <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                                <label className="block  tracking-wide text-gray-700 text-s font-bold mb-2" form="grid-city">
                                    Data urlopu
                                </label>
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
                                        className="shadow-lg bg-red-500 hover:bg-white hover:text-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                        type="button">
                                    {t('button.back')}
                                </button>
                                <button type="submit"
                                        className=" ml-4 shadow-lg bg-blue-400 hover:bg-white hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
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

export default withTranslation()(withNavigate(withRouter(VacationForm)));