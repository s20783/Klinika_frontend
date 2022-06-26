import {createSearchParams, Link} from "react-router-dom";
import React, {useState} from 'react';
import Calendar from 'react-calendar';
import {Navigate, useNavigate, useParams} from "react-router";
import Time from "../other/Time";
import dayjs from 'dayjs';
import {getHarmonogram} from "../../api/HarmonogramApiCalls";
import {postWizyta} from "../../api/WizytaApiCalls";
import {postTestApi} from "../../api/TestApiCalls";

class UmowienieWizytyForm extends React.Component {
    constructor(props) {
        super(props);
        // const { t } = useTranslation();
        this.state = {
            data: {
                Pacjent: '',
                Notatka: '',
                Termin: '',
                Data: ''
            },
            errors: {
                Pacjent: '',
                Notatka: '',
                Data: ''
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
        let errorMessage = '';
        if (fieldName === 'Pacjent') {
            if (!fieldValue) {
                errorMessage = `Pole wymagane`
            }
        }
        if (fieldName === 'Data') {
            if (!fieldValue) {
                errorMessage = `Pole wymagane`
            }
        }
        if (fieldName === 'Notatka') {
            if (fieldValue.length > 300) {
                errorMessage = `Pole może zawierać maksymalnie 300 znaków`
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

        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            let response
            //postTestApi()
            postWizyta(data["Termin"], data["Pacjent"], data["Notatka"])
                .then(res => {
                    response = res
                    return res.json()
                })
                .then(
                    (data1) => {
                        console.log(response.status)
                        if (response.status === 200) {
                            console.log(data1)

                            navigate(
                                "/potwierdzenieWizyty",
                                {
                                    state: {
                                        Data: data.Data
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
        //console.log(dayjs(date).format('YYYY-MM-DD'));

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
        const errors = {...this.state.errors}

        errors["Data"] = ''
        data["Termin"] = harmonogram.IdHarmonogram
        data["Data"] = harmonogram.Dzien + " " + harmonogram.Data.replace('T', ' ').replace(':00', '')
        this.setState({
            data: data,
            errors: errors
        })
    }

    render() {
        const {navigate} = this.props
        const {list, harmonogram} = this.state

        return (
            <div
                className="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                <form onSubmit={this.handleSubmit}>
                    <section class="bg-white-100 border-b  mb-7">
                        {/*<div class="container max-w-5xl mx-auto ">*/}
                        <div class=" md:flex mb-6 mt-4">
                            {/*<div class="md:w-1/5">*/}
                            <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-7"
                                   htmlFor="Pacjent">
                                {/*<label class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-2" for="my-select">*/}
                                Pacjent
                            </label>
                            {/*</div>*/}
                            <div class="md:w-3/5">

                                <select name="Pacjent" id="Pacjent" onChange={this.handleChange}
                                        className={this.state.errors.Pacjent ? "form-select block w-full focus:bg-red" : "form-select block w-full focus:bg-white"}>
                                    <option value="">Wybierz pacjenta</option>
                                    {
                                        list.map(pacjent => (
                                            <option value={pacjent.IdPacjent}>{pacjent.Nazwa}</option>
                                        ))}
                                    <option value="0">inny</option>
                                </select>
                            </div>
                            <span id="errorPacjent" className="errors-text2">{this.state.errors.Pacjent}</span>
                        </div>
                        {/*</div>*/}
                    </section>
                    <section class="bg-white-100 border-b mt-7">
                        <label class="block  text-gray-600 font-bold md:text-left mb-6 " for="my-select">
                            Wybierz termin
                        </label>
                        <Calendar className="mb-7"
                                  value={this.state.date}
                                  onClickDay={this.onChange}
                        />
                        <div>
                            {<Time showTime={this.state.harmonogram.length} harmonogram={harmonogram}
                                   timeChange={this.handleHarmonogramSelect}/>}
                            <span id="errorData" className="errors-text2 mb-4">{this.state.errors.Data}</span>
                            <span id="" className="">{this.state.data.Data === '' ? '' : 'Wybrano termin:  ' + this.state.data.Data}</span>

                        </div>
                    </section>
                    <label class="block mt-5 text-gray-600 font-bold md:text-left mb-6 " id="Notatka">
                        Dodaj opis
                    </label>
                    <div class="md:w-3/4 mt-5">
                        <textarea class="form-textarea block w-full focus:bg-white " id="Notatka" name="Notatka"
                                  rows="5" onChange={this.handleChange}/>
                    </div>
                    <span id="errorOpis" className="errors-text2">{this.state.errors.Notatka}</span>

                    <div className=" md:flex mb-6 mt-4 ">
                        <div className="flex pb-3">
                            <button onClick={() => navigate(-1)}
                                    className="shadow bg-red-500 hover:bg-white  hover:text-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                    type="button">
                                Powrót
                            </button>
                            <button type="submit"
                                    className=" shadow bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                Dalej
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

// const withRouter = WrappedComponent => props => {
//     const params = useParams();
//     return (
//         <WrappedComponent
//             {...props}
//             params={params}
//         />
//     );
// };

export default withNavigate(UmowienieWizytyForm)