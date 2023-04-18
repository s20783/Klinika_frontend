import React from "react";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import {getSchedule} from "../../axios/ScheduleApiCalls";
import Schedule from "../schedule/Schedule";
import AccountMenu from "./AccountMenu";
import axios from "axios";

let CancelToken
let source

class AccountSchedule extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                Data: '',
            },
            errors: {
                Data: '',
            },

            date: new Date(),
            error: '',
            isLoaded: false,
            harmonogram: [],
            start: '',
            end: ''
        }
    }

    componentDidMount() {
        CancelToken = axios.CancelToken;
        source = CancelToken.source();
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

        if (fieldName === 'Data') {
            if (!fieldValue) {
                errorMessage = t('validation.required')
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
        const dane = {...this.state}
        const isValid = this.validateForm()

        if (isValid) {
            try {
                await getSchedule(dane.data.Data, source)
                    .then((res) => {
                        if (res) {
                            this.setState({
                                isLoaded: true,
                                harmonogram: res.data.harmonogramy,
                                start: res.data.Start,
                                end: res.data.End
                            });
                        }
                    })
            } catch (error) {
                console.log(error)
            }
        }
    }


    render() {
        const {data, errors, date, harmonogram, start, end} = this.state
        const {t} = this.props;
        const {navigate} = this.props
        const {i18n} = this.props;
        let language = i18n.language;
        let content;

        if (harmonogram.length !== 0) {
            content = <Schedule harmonogram={harmonogram} start={start} end={end} weterynarz={null}/>
        } else {
            content = <div></div>
        }

        return (
            <div className="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3 mb-3">
                <AccountMenu/>
                <div
                    className="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                    <form onSubmit={this.handleSubmit}>
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
                                        className="shadow-lg bg-red-500 hover:bg-white  hover:text-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                        type="button">
                                    {t("button.back")}
                                </button>
                                <button type="submit"
                                        className=" ml-4 shadow-lg bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                    {t("harmonogram.button.check")}
                                </button>
                            </div>
                        </div>
                    </form>
                    {content}
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

export default withTranslation()(withNavigate(withRouter(AccountSchedule)));