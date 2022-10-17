import React from 'react';
import Calendar from 'react-calendar';
import {useNavigate} from "react-router";
import Time from "../other/Time";
import dayjs from 'dayjs';
import {getHarmonogram} from "../../api/HarmonogramApiCalls";
import {postWizyta} from "../../api/WizytaApiCalls";
import {getFormattedDateWithHour} from "../other/dateFormat";
import {addPacjent} from "../../api/PacjentApiCalls";
import {CheckTextRange} from "../helpers/CheckTextRange";


class DodaniePacjentaForm extends React.Component {
    constructor(props) {
        super(props);
        // const { t } = useTranslation();
        this.state = {
            data: {
                idOsoba: '',
                nazwa:'',
                gatunek:'',
                rasa:'',
                waga:'',
                masc:'',
                plec:'',
                dataUrodzenia:'',
                agresywne:false,
                ubezplodnienie: false
            },
            errors: {
                idOsoba: '',
                nazwa:'',
                gatunek:'',
                rasa:'',
                waga:'',
                masc:'',
                plec:'',
                dataUrodzenia:'',
                agresywne:'',
                ubezplodnienie: ''
            },
            klienci: this.props.klienci,
            date: new Date()

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
        if (fieldName === 'idOsoba') {
            if (!fieldValue) {
                errorMessage = `Pole wymagane`
            }
        }
        if (fieldName === 'nazwa') {
            if (!CheckTextRange(fieldValue, 2, 50)) {
                errorMessage = `To pole wymaga od 2 do 50 znaków`
            }
            if (!fieldValue) {
                errorMessage = `Pole wymagane`
            }
        }
        if (fieldName === 'gatunek') {
            if (!CheckTextRange(fieldValue, 2, 50)) {
                errorMessage = `To pole wymaga od 2 do 50 znaków`
            }
            if (!fieldValue) {
                 errorMessage = `Pole wymagane`
            }
        }
        if (fieldName === 'rasa') {
            if (!CheckTextRange(fieldValue, 2, 50)) {
                errorMessage = `To pole wymaga od 2 do 50 znaków`
            }
            if (!fieldValue) {
                errorMessage = `Pole wymagane`
            }
        }
        if (fieldName === 'waga') {
            if (fieldValue<0) {
                errorMessage = `Pole powinno być liczbą większą od 0.`
            }
            if (!fieldValue) {
                errorMessage = `Pole wymagane`
            }
        }
        if (fieldName === 'masc') {
            if (!CheckTextRange(fieldValue, 2, 50)) {
                errorMessage = `To pole wymaga od 2 do 50 znaków`
            }
            if (!fieldValue) {
                errorMessage = `Pole wymagane`
            }
        }
        if (fieldName === 'dataUrodzenia') {
            if (dayjs(fieldValue).diff(dayjs(new Date()))>0) {
                errorMessage = `Data nie moze byc z przyszłości`
            }
            if (!fieldValue) {
                errorMessage = `Pole wymagane`
            }
        }
        if (fieldName === 'plec') {
            if (!fieldValue) {
                errorMessage = `Pole wymagane`
            }
        }
        return errorMessage
    }

    onChange = (date) => {
         const data = {...this.state.data}
         console.log(dayjs(date).format() )
         data['dataUrodzenia'] = dayjs(date).format()

         const errorMessage = this.validateField('dataUrodzenia', date)
         const errors = {...this.state.errors}
         errors['dataUrodzenia'] = errorMessage

         this.setState({
            data: data,
            errors: errors
         })
    }

    onChange1 = (event) => {
       const {name} = event.target
       const data = {...this.state.data}
          data[name] = !data[name]

          this.setState({
               data: data,
          })
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
        console.log(data)

        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const patient = this.state.data
            console.log(patient)
            let response
            addPacjent(patient)
                .then(res => {
                    response = res
                    return res.json()
                    console.log(res)
                })
                .then(
                    (data) => {
                        if (response.status === 200) {
                            console.log(response.status)
                            navigate("/moiPacjenci", {replace: true});

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
        const {klienci} = this.state


        return (
            <div className="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                 <form onSubmit={this.handleSubmit} className="w-full max-w">
                    <section class="bg-white-100 border-b  mb-5">
                        <div class=" md:flex mb-6 mt-4">
                            <label className="block text-gray-600 font-bold md:text-left mb-3 mt-2 md:mb-0 pr-7" htmlFor="Wlasciciel">
                                   Właściciel
                            </label>
                            <div class="md:w-3/5">
                                <select name="idOsoba" id="Wlasciciel" onChange={this.handleChange}
                                     className={this.state.errors.idOsoba ? "form-select block w-full focus:bg-red" : "form-select block w-full focus:bg-white"}>
                                     <option value="">Wybierz właściciela</option>
                                     {
                                         klienci.map(klient => (
                                         <option value={klient.IdOsoba}>{klient.IdOsoba} {klient.Imie} {klient.Nazwisko}</option>
                                     ))}
                                     <option value="0">inny</option>
                                </select>
                            </div>
                            <span id="errorWlasciciel" className="errors-text2 mt-4">{this.state.errors.idOsoba}</span>
                        </div>
                    </section>

                    <div class="flex flex-wrap -mx-3 mb-4 border-b">
                         <div class="w-full px-3">
                             <label class="block tracking-wide text-gray-600 text-s font-bold mb-2" >
                                  Nazwa
                             </label>
                             <input class="form-textarea appearance-none block w-4/6 bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 mb-1 leading-tight focus:outline-none focus:bg-white "
                                 name="nazwa" id="Nazwa"  placeholder="" onChange={this.handleChange}/>
                         </div>
                         <span id="errorNazwa" className="errors-text2 mb-4 ml-4">{this.state.errors.nazwa}</span>
                    </div>

                    <div class="flex flex-wrap -mx-3 mb-6 border-b">
                        <div class="w-full md:w-2/6 px-3 mb-6 md:mb-0">
                            <label class="block  tracking-wide text-gray-600 text-s font-bold mb-2" >
                               Gatunek
                            </label>
                            <input class=" form-textarea appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:border-blue-600 "
                            name="gatunek" id="Gatunek" type="text" placeholder="" onChange={this.handleChange}/>
                            <span id="errorGatunek" className="errors-text2 mb-4 ">{this.state.errors.gatunek}</span>
                        </div>
                        <div class="w-full md:w-2/6 px-3 ml-8">
                            <label class="block  tracking-wide text-gray-600 text-s font-bold mb-2" for="grid-last-name">
                                Rasa
                            </label>
                            <input class=" form-textarea appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            name="rasa" id="Rasa" type="text" placeholder="" onChange={this.handleChange}/>
                            <span id="errorRasa" className="errors-text2 mb-4 ">{this.state.errors.rasa}</span>
                        </div>
                    </div>

                    <div class="flex flex-wrap -mx-3 mb-6 border-b">
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                                Waga
                            </label>
                            <input class=" form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            name="waga" id="Waga" step="0.01" type="number" placeholder="" onChange={this.handleChange}/>
                            <span id="errorWaga" className="errors-text2 mb-4 ">{this.state.errors.waga}</span>

                        </div>
                        <div class="w-full md:w-1/3 px-3 mb-6 ml-8 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                                Maść
                            </label>
                            <input class="appearance-none form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            name="masc" id="Masc" type="text" placeholder="" onChange={this.handleChange}/>
                            <span id="errorMasc" className="errors-text2 mb-4 ">{this.state.errors.masc}</span>
                        </div>
                    </div>

                    <div class="flex flex-wrap -mx-3 mb-6 ">
                        <div class="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                                Data urodzenia
                            </label>
                            <Calendar className="mb-7 calendarForm"
                                value={this.state.date}
                                onClickDay={this.onChange}
                            />
                           <span id="" className="">
                                 {this.state.data.dataUrodzenia === '' || this.state.errors.dataUrodzenia != '' ?
                                 '' : 'Wybrano datę:  ' + dayjs(this.state.data.dataUrodzenia).format('YYYY-MM-DD')}</span>
                            <span id="errorData" className="errors-text2 mb-4">
                                {this.state.errors.dataUrodzenia}
                            </span>
                        </div>
                        <div class="w-full md:w-1/3 px-3 mb-6 mt-6 ml-2 md:mb-0">
                            <div className="border-b mb-4">
                                <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                                    Płeć
                                </label>
                                <label class="inline-flex  items-center">
                                    <input name="plec" id="Plec" type="radio" class="form-radio text-indigo-600"  value="M" onChange={this.handleChange}/>
                                    <span class="ml-2">Samiec</span>
                                </label>
                                <label class="inline-flex items-center  ml-4 mb-4">
                                    <input name="plec" id="Plec" type="radio" class="form-radio"  value="F" onChange={this.handleChange}/>
                                    <span class="ml-2">Samica</span>
                                </label>
                            <span id="errorPlec" className="errors-text2 mb-3 ">{this.state.errors.Plec}</span>
                            </div>
                            <div className="border-b mb-6">
                                <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                                    Czy ubezpłodniony?
                                </label>
                                <input type="checkbox"  name="ubezplodnienie" class="form-checkbox mb-4 w-8 h-8 text-blue-600" onChange={this.onChange1}/>
                            </div>
                            <div className="border-b mb-6">
                                <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                                    Czy agresywny?
                                </label>
                                <input type="checkbox" value="1" name="agresywne" class=" form-checkbox  mb-8  text-blue-600" onChange={this.onChange1}/>
                            </div>
                        </div>
                    </div>
                    <div className=" md:flex mb-6 mt-8 ">
                        <div className="flex pb-3">
                            <button onClick={() => navigate(-1)}
                                    className="shadow bg-red-500 hover:bg-white  hover:text-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                    type="button">
                                Powrót
                            </button>
                            <button type="submit"
                                    className=" ml-4 shadow bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                Zatwierdź
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

export default withNavigate(DodaniePacjentaForm)