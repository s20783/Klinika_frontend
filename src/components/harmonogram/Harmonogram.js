import React from "react";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import {getHarmonogramVet, getHarmonogram} from "../../api/HarmonogramApiCalls";
import {getWeterynarzList} from "../../api/WeterynarzApiCalls";


class Harmonogram extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                Weterynarz: '0',
                Data: '',
            },
            errors: {
                Weterynarz: '',
                Data: '',
            },

            date: new Date(),
            error: '',
            weterynarze: [],
            isLoaded: false,
            notice: '',
            harmonogram: []
        }
    }


    componentDidMount() {
        const {navigate} = this.props;
        getWeterynarzList()
            .then(res => {
                if (res.status === 401) {
                    console.log('Potrzebny aktualny access token')
                    navigate("/", {replace: true});
                }
                return res.json()
            })
            .then(
                (data) => {

                    this.setState({
                        isLoaded: true,
                        weterynarze: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
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
        console.log(dayjs(date).format("MM-DD-YYYY"))
        data['Data'] = dayjs(date).format("MM-DD-YYYY")

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
        if (fieldName === 'Weterynarz') {
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        if (fieldName === 'Data') {
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
        console.log(dane.data)
        const isValid = this.validateForm()
        let promise;


        if (isValid) {
            if (dane.data.Weterynarz === '0') {
                promise = getHarmonogram(dane.data.Data)
            } else {
                promise = getHarmonogramVet(dane.data.Weterynarz, dane.data.Data)
            }
            promise
                .then(res => {
                    console.log(res.status)
                    if (res.status === 401) {
                        console.log('Potrzebny aktualny access token')
                        navigate("/", {replace: true});
                    }
                    return res.json()
                })
                .then(
                    (data) => {
                        console.log(data)
                        this.setState({
                            isLoaded: true,
                            harmonogram: data
                        });
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
        }
    }


    render() {
        const {data, errors, date, weterynarze, harmonogram} = this.state
        const {t} = this.props;
        const {navigate} = this.props
        const {i18n} = this.props;
        let language = i18n.language;

        return (
            <div class="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3 mb-3">
                <div class="w-full lg:w-1/6 lg:px-6 text-gray-800 leading-normal">
                    <p class="text-base font-bold py-2 text-xl lg:pb-6 text-gray-700">{t('harmonogram.checkingTheVetsSchedule')}</p>
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

                        <section className="bg-white-100 border-b  mb-5">
                            <div className=" md:flex mb-6 mt-4">
                                <label className="block text-gray-600 font-bold md:text-left mb-3 mt-2 md:mb-0 pr-7"
                                       htmlFor="Wlasciciel">
                                    {t('harmonogram.fields.vet')}
                                </label>
                                <div className="md:w-3/5">
                                    <select name="Weterynarz" id="Weterynarz" onChange={this.handleChange}
                                            className={errors.IdOsoba ? "form-select block w-full focus:bg-red" : "form-select block w-full focus:bg-white"}>
                                        <option value="0">{t('harmonogram.all')}</option>
                                        {
                                            weterynarze.map(vet => (
                                                <option selected={data.IdOsoba === vet.IdOsoba}
                                                        value={vet.IdOsoba}>{vet.Imie} {vet.Nazwisko}</option>
                                            ))}
                                    </select>
                                </div>
                                <span id="errorWeterynarz" className="errors-text2 mt-4">{errors.Weterynarz}</span>
                            </div>
                        </section>

                        <div className="flex flex-wrap -mx-3 mb-6 ">
                            <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                                <label className="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-city">
                                    {t('harmonogram.fields.date')}
                                </label>
                                <Calendar className="mb-7 calendarForm"
                                          value={date}
                                          onClickDay={this.onChange}
                                          locale={language}
                                />
                                <span id="" className="">
                                 {data.Data === '' || errors.Data !== '' ?
                                     '' : t('other.selectedDate') + dayjs(data.Data).format('YYYY-MM-DD')}</span>
                                <span id="errorData" className="errors-text2 mb-4">
                                {errors.Data}
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
                                    {t("harmonogram.button.check")}
                                </button>
                            </div>
                        </div>
                    </form>
                    {(harmonogram.length !== 0) &&
                        <table
                            className="w-full text-center flex flex-wrap text-gray-700 dark:text-gray-400">
                            <tr></tr>
                            <tr>
                                <th className=" text-l mb-4 text-center flex flex-wrap mx-20 text-gray-700 uppercase underline decoration-double dark:bg-gray-700 dark:text-gray-400">
                                    {t("harmonogram.weekdays.pon")}</th>
                                {harmonogram.map(x => (
                                    (x.Dzien === 1) &&
                                    <td className="text-center w-full flex flex-wrap my-2 ">
                                        <div className={(x.CzyZajete === false)
                                            ? ' border-l-4 border-green-300 mx-2 w-full' :
                                            ' border-l-4 border-red-300 mx-2 w-full'
                                        }>
                                            <div className="w-full">
                                            <span className={(data.Weterynarz !== '0')
                                                ? ' text-s ' :
                                                'text-s font-bold'
                                            }>
                                                {dayjs(x.Data).format("HH:mm")} - {dayjs(x.Data).add(30, "minute").format("HH:mm")}
                                            </span>
                                            </div>
                                            <span className="w-full text-s">{x.Weterynarz}</span>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <th className=" text-l mb-4 text-center flex flex-wrap mx-20 text-gray-700 uppercase underline decoration-double dark:bg-gray-700 dark:text-gray-400">
                                    {t("harmonogram.weekdays.wt")}</th>
                                {harmonogram.map(x => (
                                    (x.Dzien === 2) &&
                                    <td className="text-center w-full flex flex-wrap my-2 ">
                                        <div className={(x.CzyZajete === false)
                                            ? ' border-l-4 border-green-300 mx-2 w-full' :
                                            ' border-l-4 border-red-300 mx-2 w-full'
                                        }>
                                            <div className="w-full">
                                            <span className={(data.Weterynarz !== '0')
                                                ? ' text-s ' :
                                                'text-s font-bold'
                                            }>
                                                {dayjs(x.Data).format("HH:mm")} - {dayjs(x.Data).add(30, "minute").format("HH:mm")}
                                            </span>
                                            </div>
                                            <span className="w-full text-s">{x.Weterynarz}</span>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <th className=" text-l mb-4 text-center flex flex-wrap mx-20 text-gray-700 uppercase underline decoration-double dark:bg-gray-700 dark:text-gray-400">
                                    {t("harmonogram.weekdays.sr")}</th>
                                {harmonogram.map(x => (
                                    (x.Dzien === 3) &&
                                    <td className="text-center w-full flex flex-wrap my-2 ">
                                        <div className={(x.CzyZajete === false)
                                            ? ' border-l-4 border-green-300 mx-2 w-full' :
                                            ' border-l-4 border-red-300 mx-2 w-full'
                                        }>
                                            <div className="w-full">
                                            <span className={(data.Weterynarz !== '0')
                                                ? ' text-s ' :
                                                'text-s font-bold'
                                            }>
                                                {dayjs(x.Data).format("HH:mm")} - {dayjs(x.Data).add(30, "minute").format("HH:mm")}
                                            </span>
                                            </div>
                                            <span className="w-full text-s">{x.Weterynarz}</span>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <th className=" text-l mb-4 text-center flex flex-wrap mx-20 text-gray-700 uppercase underline decoration-double dark:bg-gray-700 dark:text-gray-400">
                                    {t("harmonogram.weekdays.czw")}</th>
                                {harmonogram.map(x => (
                                    (x.Dzien === 4) &&
                                    <td className="text-center w-full flex flex-wrap my-2 ">
                                        <div className={(x.CzyZajete === false)
                                            ? ' border-l-4 border-green-300 mx-2 w-full' :
                                            ' border-l-4 border-red-300 mx-2 w-full'
                                        }>
                                            <div className="w-full">
                                            <span className={(data.Weterynarz !== '0')
                                                ? ' text-s ' :
                                                'text-s font-bold'
                                            }>
                                                {dayjs(x.Data).format("HH:mm")} - {dayjs(x.Data).add(30, "minute").format("HH:mm")}
                                            </span>
                                            </div>
                                            <span className="w-full text-s">{x.Weterynarz}</span>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <th className=" text-l mb-4 text-center flex flex-wrap mx-20 text-gray-700 uppercase underline decoration-double dark:bg-gray-700 dark:text-gray-400">
                                    {t("harmonogram.weekdays.pt")}</th>
                                {harmonogram.map(x => (
                                    (x.Dzien === 5) &&
                                    <td className="text-center w-full flex flex-wrap my-2 ">
                                        <div className={(x.CzyZajete === false)
                                            ? ' border-l-4 border-green-300 mx-2 w-full' :
                                            ' border-l-4 border-red-300 mx-2 w-full'
                                        }>
                                            <div className="w-full">
                                            <span className={(data.Weterynarz !== '0')
                                                ? ' text-s ' :
                                                'text-s font-bold'
                                            }>
                                                {dayjs(x.Data).format("HH:mm")} - {dayjs(x.Data).add(30, "minute").format("HH:mm")}
                                            </span>
                                            </div>
                                            <span className="w-full text-s">{x.Weterynarz}</span>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <th className=" text-l mb-2 text-center flex flex-wrap mx-20 text-gray-700 uppercase underline decoration-double dark:bg-gray-700 dark:text-gray-400">
                                    {t("harmonogram.weekdays.sob")}</th>
                                {harmonogram.map(x => (
                                    (x.Dzien === 1) &&
                                    <td className="text-center w-full flex flex-wrap my-2 ">
                                        <div className={(x.CzyZajete === false)
                                            ? ' border-l-4 border-green-300 mx-2 w-full' :
                                            ' border-l-4 border-red-300 mx-2 w-full'
                                        }>
                                            <div className="w-full">
                                            <span className={(data.Weterynarz !== '0')
                                                ? ' text-s ' :
                                                'text-s font-bold'
                                            }>
                                                {dayjs(x.Data).format("HH:mm")} - {dayjs(x.Data).add(30, "minute").format("HH:mm")}
                                            </span>
                                            </div>
                                            <span className="w-full text-s">{x.Weterynarz}</span>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        </table>
                    }
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

export default withTranslation()(withNavigate(withRouter(Harmonogram)));