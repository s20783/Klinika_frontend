import React from 'react';
import Calendar from 'react-calendar';
import {useNavigate} from "react-router";
import Time from "../other/Time";
import dayjs from 'dayjs';
import {getHarmonogram} from "../../api/HarmonogramApiCalls";
import {postWizyta} from "../../api/WizytaApiCalls";
import {getFormattedDateWithHour} from "../other/dateFormat";
import {addPacjent} from "../../api/PacjentApiCalls";
import {updatePacjent} from "../../api/PacjentApiCalls";
import {CheckTextRange} from "../helpers/CheckTextRange";
import {getPacjentDetails1} from "../../api/PacjentApiCalls";
import formMode from "../helpers/FormMode";
import {withTranslation} from "react-i18next";


class DodaniePacjentaForm extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdPacjent = this.props.idPacjent
        const currentFormMode = paramsIdPacjent ? formMode.EDIT : formMode.NEW

        console.log(this.props)
        this.state = {
            data: {
                IdOsoba: '',
                Nazwa:'',
                Gatunek:'',
                Rasa:'',
                Waga: null,
                Masc:'',
                Plec:'',
                DataUrodzenia:'',
                Agresywne:false,
                Ubezplodnienie: false
            },
            errors: {
                IdOsoba: '',
                Nazwa:'',
                Gatunek:'',
                Rasa:'',
                Waga:'',
                Masc:'',
                Plec:'',
                DataUrodzenia:'',
                Agresywne:'',
                Ubezplodnienie: ''
            },
            klienci: this.props.klienci,
            date: new Date(),
            idPacjent:paramsIdPacjent,
            formMode:currentFormMode,
            message:''
        }
    }
    componentDidMount() {

        if(this.state.idPacjent){
            getPacjentDetails1(this.state.idPacjent)
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
        if (fieldName === 'IdOsoba') {
            if (!fieldValue) {
                errorMessage = `Pole wymagane`
            }
        }
        if (fieldName === 'Nazwa') {
            if (!CheckTextRange(fieldValue, 2, 50)) {
                errorMessage = `To pole wymaga od 2 do 50 znaków`
            }
            if (!fieldValue) {
                errorMessage = `Pole wymagane`
            }
        }
        if (fieldName === 'Gatunek') {
            if (!CheckTextRange(fieldValue, 2, 50)) {
                errorMessage = `To pole wymaga od 2 do 50 znaków`
            }
            if (!fieldValue) {
                 errorMessage = `Pole wymagane`
            }
        }
        if (fieldName === 'Rasa') {
            if (!CheckTextRange(fieldValue, 2, 50)) {
                errorMessage = `To pole wymaga od 2 do 50 znaków`
            }
            if (!fieldValue) {
                errorMessage = `Pole wymagane`
            }
        }
        if (fieldName === 'Waga') {
            if (fieldValue < 0 || fieldValue > 999 ) {
                errorMessage = `Pole powinno być liczbą z przedziału od 0 do 1000.`
            }
            if (!fieldValue) {
                errorMessage = `Pole wymagane`
            }
        }
        if (fieldName === 'Masc') {
            if (!CheckTextRange(fieldValue, 2, 50)) {
                errorMessage = `To pole wymaga od 2 do 50 znaków`
            }
            if (!fieldValue) {
                errorMessage = `Pole wymagane`
            }
        }
        if (fieldName === 'DataUrodzenia') {
            if (dayjs(fieldValue).diff(dayjs(new Date()))>0) {
                errorMessage = `Data nie moze byc z przyszłości`
            }
            if (!fieldValue) {
                errorMessage = `Pole wymagane`
            }
        }
        if (fieldName === 'Plec') {
            if (!fieldValue) {
                errorMessage = `Pole wymagane`
            }
        }
        return errorMessage
    }

    onChange = (date) => {
         const data = {...this.state.data}
         console.log(dayjs(date).format() )
         data['DataUrodzenia'] = dayjs(date).format()

         const errorMessage = this.validateField('DataUrodzenia', date)
         const errors = {...this.state.errors}
         errors['DataUrodzenia'] = errorMessage

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
        event.preventDefault();
        const {navigate} = this.props;
        const isValid = this.validateForm()
        const dane = {...this.state}
        let response, promise;
        console.log(dane.data)

        if (isValid) {

            if(dane.formMode === formMode.NEW){
                promise = addPacjent(dane.data)
            }
            else if (dane.formMode === formMode.EDIT){
                promise = updatePacjent(dane.data, dane.idPacjent)
            }
             if (promise) {
            promise
                .then(res => {
                    response = res
                    return res.json()
                    console.log(res)
                })
                .then(
                    (data) => {
                    console.log(data)
                        if (response.status === 200 ) {
                            console.log(response.status)
                            navigate("/pacjenci", {replace: true});

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
        const {klienci, pacjent, data} = this.state
        const {t} = this.props;
        const { i18n } = this.props;
        let language = i18n.language
        console.log(language)
        return (
            <div className="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                 <form onSubmit={this.handleSubmit} className="w-full max-w">
                    <section class="bg-white-100 border-b  mb-5">
                        <div class=" md:flex mb-6 mt-4">
                            <label className="block text-gray-600 font-bold md:text-left mb-3 mt-2 md:mb-0 pr-7" htmlFor="Wlasciciel">
                                   {t('pacjent.fields.owner')}
                            </label>
                            <div class="md:w-3/5">
                                <select name="IdOsoba" id="Wlasciciel" onChange={this.handleChange}
                                     className={this.state.errors.IdOsoba ? "form-select block w-full focus:bg-red" : "form-select block w-full focus:bg-white"}>
                                     <option value="">{t('pacjent.selectOwner')}</option>
                                     {
                                         klienci.map(klient => (
                                         <option selected={this.state.data.IdOsoba === klient.IdOsoba} value={klient.IdOsoba}>{klient.Imie} {klient.Nazwisko}</option>
                                     ))}
                                </select>
                            </div>
                            <span id="errorWlasciciel" className="errors-text2 mt-4">{this.state.errors.IdOsoba}</span>
                        </div>
                    </section>

                    <div class="flex flex-wrap -mx-3 mb-4 border-b">
                         <div class="w-full px-3">
                             <label class="block tracking-wide text-gray-600 text-s font-bold mb-2" >
                                  {t('pacjent.fields.name')}
                             </label>
                             <input class="form-textarea appearance-none block w-4/6 bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 mb-1 leading-tight focus:outline-none focus:bg-white "
                                 name="Nazwa" id="Nazwa" type="text" value={this.state.data.Nazwa} onChange={this.handleChange} placeholder="" />
                         </div>
                         <span id="errorNazwa" className="errors-text2 mb-4 ml-4">{this.state.errors.Nazwa}</span>
                    </div>

                    <div class="flex flex-wrap -mx-3 mb-6 border-b">
                        <div class="w-full md:w-2/6 px-3 mb-6 md:mb-0">
                            <label class="block  tracking-wide text-gray-600 text-s font-bold mb-2" >
                               {t('pacjent.fields.species')}
                            </label>
                            <input class=" form-textarea appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:border-blue-600 "
                            name="Gatunek" id="Gatunek" type="text"  value={this.state.data.Gatunek} placeholder="" onChange={this.handleChange}/>
                            <span id="errorGatunek" className="errors-text2 mb-4 ">{this.state.errors.Gatunek}</span>
                        </div>
                        <div class="w-full md:w-2/6 px-3 ml-8">
                            <label class="block  tracking-wide text-gray-600 text-s font-bold mb-2" for="grid-last-name">
                                {t('pacjent.fields.breed')}
                            </label>
                            <input class=" form-textarea appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            name="Rasa" id="Rasa" type="text"  value={this.state.data.Rasa} placeholder="" onChange={this.handleChange}/>
                            <span id="errorRasa" className="errors-text2 mb-4 ">{this.state.errors.Rasa}</span>
                        </div>
                    </div>

                    <div class="flex flex-wrap -mx-3 mb-6 border-b">
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                                {t('pacjent.fields.weight')}
                            </label>
                            <input class=" form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            name="Waga" id="Waga" step="0.01" type="number" value={this.state.data.Waga} onChange={this.handleChange} placeholder="" />
                            <span id="errorWaga" className="errors-text2 mb-4 ">{this.state.errors.Waga}</span>

                        </div>
                        <div class="w-full md:w-1/3 px-3 mb-6 ml-8 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                                {t('pacjent.fields.color')}
                            </label>
                            <input class="appearance-none form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            name="Masc" id="Masc" type="text"value={this.state.data.Masc} placeholder="" onChange={this.handleChange}/>
                            <span id="errorMasc" className="errors-text2 mb-4 ">{this.state.errors.Masc}</span>
                        </div>
                    </div>

                    <div class="flex flex-wrap -mx-3 mb-6 ">
                        <div class="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                                {t('pacjent.fields.birthdate')}
                            </label>
                            <Calendar className="mb-7 calendarForm"
                                value={ this.state.date}
                                onClickDay={this.onChange}
                                locale={language}
                            />
                           <span id="" className="">
                                 {this.state.data.DataUrodzenia === '' || this.state.errors.DataUrodzenia != '' ?
                                 '' : t('other.selectedDate') + dayjs(this.state.data.DataUrodzenia).format('YYYY-MM-DD')}</span>
                            <span id="errorData" className="errors-text2 mb-4">
                                {this.state.errors.DataUrodzenia}
                            </span>
                        </div>
                        <div class="w-full md:w-1/3 px-3 mb-6 mt-6 ml-2 md:mb-0">
                            <div className="border-b mb-4">
                                <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                                    {t('pacjent.fields.gender')}
                                </label>
                                <label class="inline-flex  items-center">
                                    <input name="Plec" id="Plec" type="radio" checked={this.state.data.Plec==="M"} class="form-radio text-indigo-600"
                                    value="M" onChange={this.handleChange}/>
                                    <span class="ml-2">{t('pacjent.gender.male')}</span>
                                </label>
                                <label class="inline-flex items-center  ml-4 mb-4">
                                    <input name="Plec" id="Plec" type="radio" class="form-radio" checked={this.state.data.Plec==="F"}
                                     value="F" onChange={this.handleChange}/>
                                    <span class="ml-2">{t('pacjent.gender.female')}</span>
                                </label>
                            <span id="errorPlec" className="errors-text2 mb-3 ">{this.state.errors.Plec}</span>
                            </div>
                            <div className="border-b mb-6">
                                <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                                    {t('pacjent.fields.infertile')}
                                </label>
                                <input type="checkbox"  name="Ubezplodnienie" checked={this.state.data.Ubezplodnienie===true} class="form-checkbox mb-4 w-8 h-8 text-blue-600" onChange={this.onChange1}/>
                            </div>
                            <div className="border-b mb-6">
                                <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                                    {t('pacjent.fields.aggressive')}
                                </label>
                                <input type="checkbox" value="1" name="Agresywne" checked={this.state.data.Agresywne===true}class=" form-checkbox  mb-8  text-blue-600" onChange={this.onChange1}/>
                            </div>
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

export default  withTranslation() (withNavigate(DodaniePacjentaForm));