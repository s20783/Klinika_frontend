import React from 'react';
import Calendar from 'react-calendar';
import {useNavigate} from "react-router";
import Time from "../other/Time";
import dayjs from 'dayjs';
import {getHarmonogram} from "../../api/HarmonogramApiCalls";
import {postWizyta} from "../../api/WizytaApiCalls";
import {getFormattedDateWithHour} from "../other/dateFormat";
import {withTranslation} from "react-i18next";

class UmowienieWizytyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                Pacjent: '',
                Notatka: '',
                Termin: '',
                ID_klient: ''
            },
            errors: {
                Pacjent: '',
                Notatka: '',
                Termin: ''
            },
            wizyta: {
                Data: '',
                Dzien: ''
            },
            list: this.props.pacjenci,
            date: new Date(),
            harmonogram: [],
            day: ''
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
        if (fieldName === 'Pacjent') {
            if (!fieldValue) {
                errorMessage = `${t('validation.required')}`
            }
        }
        if (fieldName === 'Termin') {
            if (!fieldValue) {
                errorMessage = `${t('validation.required')}`
            }
        }
        if (fieldName === 'Notatka') {
            if (fieldValue.length > 300) {
                errorMessage = `${t('validation.max300nullable')}`
            }
        }
        return errorMessage
    }

    validateForm = () => {
        const data = this.state.data
        const errors = this.state.errors
        for (const fieldName in data) {
            const fieldValue = data[fieldName]
            const errorMessage = this.validateField(fieldName, fieldValue)
            errors[fieldName] = errorMessage
        }

        this.setState({
            errors: errors
        })
        return !this.hasErrors();
    }

    handleSubmit = (event) => {
        const {navigate} = this.props;
        const data = {...this.state.data}
        const wizyta = {...this.state.wizyta}

        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            let response
            const newData = {
                ID_Harmonogram: data["Termin"],
                ID_Pacjent: data["Pacjent"],
                Notatka: data["Notatka"],
                ID_klient: data["ID_Klient"]
            }
            postWizyta(newData)
                .then(res => {
                    response = res
                    return res.json()
                })
                .then(
                    (data1) => {
                        console.log(response)
                        if (response.ok) {
                            //console.log(this.state.wizyta.Data)
                            navigate(
                                "/potwierdzenieWizyty",
                                {
                                    state: {
                                        Data: wizyta.Data
                                    }
                                })
                        } else if (response.status === 404) {
                            console.log(data1)
                        } else {
                            console.log(data1)
                            this.setState({
                                message: data1.message
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

    hasErrors = () => {
        const errors = this.state.errors
        for (const errorField in this.state.errors) {
            if (errors[errorField].length > 0) {
                return true
            }
        }
        return false
    }


    onChange = (date) => {
        this.setState({selectedDate: date});

        const {navigate} = this.props;
        getHarmonogram(dayjs(date).format('YYYY-MM-DD'))
            .then(res => {
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

    handleHarmonogramSelect = (harmonogram) => {
        const data = {...this.state.data}
        const wizyta = {...this.state.wizyta}
        const errors = {...this.state.errors}

        errors["Data"] = ''
        data["Termin"] = harmonogram.IdHarmonogram
        wizyta["Data"] =  getFormattedDateWithHour(harmonogram.Data)
        wizyta["Dzien"] =  harmonogram.Dzien
        this.setState({
            wizyta: wizyta,
            data: data,
            errors: errors
        })
    }

    render() {
        const {navigate} = this.props
        const {list, harmonogram} = this.state
        const {t} = this.props;

        return (
            <div
                className="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                <form onSubmit={this.handleSubmit}>
                    <section class="bg-white-100 border-b  mb-7">
                        <div class=" md:flex mb-6 mt-4">
                            <label className="block text-gray-600 font-bold md:text-left mb-3 mt-2 md:mb-0 pr-7"
                                   htmlFor="Pacjent">
                                {t("wizyta.field.patient")}
                            </label>
                            <div class="md:w-3/5">

                                <select name="Pacjent" id="Pacjent" onChange={this.handleChange}
                                        className={this.state.errors.Pacjent ? "form-select block w-full focus:bg-red" : "form-select block w-full focus:bg-white"}>
                                    <option value="">{t("wizyta.selectPatient")}</option>
                                    {
                                        list.map(pacjent => (
                                            <option value={pacjent.IdPacjent}>{pacjent.Nazwa}</option>
                                        ))}
                                    <option value="0">{t("wizyta.other")}</option>
                                </select>
                            </div>
                            <span id="errorPacjent" className="errors-text2">{this.state.errors.Pacjent}</span>
                        </div>
                    </section>
                    <section class="bg-white-100 border-b mt-7">
                        <label class="block  text-gray-600 font-bold md:text-left mb-6" form="my-select">
                            {t("wizyta.field.date")}
                        </label>
                        <Calendar className="mb-7"
                                  value={this.state.date}
                                  onClickDay={this.onChange}
                        />
                        <div>
                            {<Time showTime={this.state.harmonogram.length} harmonogram={harmonogram}
                                   timeChange={this.handleHarmonogramSelect}/>}
                            <span id="errorData" className="errors-text2 mb-4">{this.state.errors.Termin}</span>
                            <span id="" className="">{this.state.wizyta.Data === '' ? '' :
                                t("wizyta.selectedDate") + this.state.wizyta.Data.replaceAll("-", ".") + " (" + t('other.day.' + this.state.wizyta.Dzien) + ")"}
                            </span>

                        </div>
                    </section>
                    <label class="block mt-5 text-gray-600 font-bold md:text-left mb-6 " id="Notatka">
                        {t("wizyta.field.description")}
                    </label>
                    <div class="md:w-3/4 mt-5">
                        <textarea class="form-textarea block w-full focus:bg-white " id="Notatka" name="Notatka"
                                  rows="5" onChange={this.handleChange}/>
                    </div>
                    <span id="errorOpis" className="errors-text2">{this.state.errors.Notatka}</span>

                    <div className=" md:flex mb-6 mt-8 ">
                        <div className="flex pb-3">
                            <button onClick={() => navigate(-1)}
                                    className="shadow bg-red-500 hover:bg-white  hover:text-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                    type="button">
                                {t("button.back")}
                            </button>
                            <button type="submit"
                                    className=" ml-4 shadow bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                {t("button.next")}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const withNavigate = Component => props => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate}/>;
};

export default withTranslation() (withNavigate(UmowienieWizytyForm))