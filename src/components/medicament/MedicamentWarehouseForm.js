import React from "react";
import formMode from "../../helpers/FormMode";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {checkNumberRange} from "../../helpers/CheckNRange";
import {addMedicamentWarehouse, getMedicamentWarehouse, updateMedicamentWarehouse} from "../../axios/MedicamentWarehouseApiCalls";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import axios from "axios";

let CancelToken
let source
class MedicamentWarehouseForm extends React.Component {
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
            formMode: currentFormMode
        }
    }


    async componentDidMount() {
        CancelToken = axios.CancelToken;
        source = CancelToken.source();

        if (this.state.formMode === formMode.EDIT) {
            try {
                await getMedicamentWarehouse(this.state.idStanLeku, source)
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

    onChange = (date) => {
        const data = {...this.state.data}
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
                errorMessage = t('validation.quantity1')
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


    handleSubmit = async (event) => {
        event.preventDefault();
        const {navigate} = this.props;
        const dane = {...this.state}
        const isValid = this.validateForm()

        if (isValid) {
            if (dane.formMode === formMode.NEW) {
                try {
                    await addMedicamentWarehouse(dane.idLek, dane.data, source)
                    navigate(-1, {replace: true});
                } catch (error) {
                    console.log(error)
                }
            } else if (dane.formMode === formMode.EDIT) {
                try {
                    await updateMedicamentWarehouse(dane.data, dane.idStanLeku, source)
                    navigate(-1, {replace: true});
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }


    render() {
        const {data, errors, date} = this.state
        const {t} = this.props;
        const {navigate} = this.props
        const pageTitle = this.state.formMode === formMode.NEW ? t('lek.addNewMedicineWarehouse') : t('lek.editMedicineWarehouse')

        return (
            <div className="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3">
                <div className="w-full lg:w-1/6 lg:px-6 text-gray-800 leading-normal">
                    <p className="text-base font-bold py-2 text-xl lg:pb-6 text-gray-700">{pageTitle}</p>
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
                                    className="shadow-xl form-textarea appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-6 leading-tight focus:border-blue-600 "
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
                                />
                                <span id="" className="">
                                 {data.DataWaznosci === '' || errors.DataWaznosci !== '' ?
                                     '' : t('other.selectedDate') + dayjs(data.DataWaznosci).format('YYYY-MM-DD')}</span>
                                <span id="errorData" className="errors-text2 mb-4">
                                {errors.DataWaznosci}
                            </span>
                            </div>
                        </div>

                        <div className="md:flex mb-6 mt-8">
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

export default withTranslation()(withNavigate(withRouter(MedicamentWarehouseForm)));