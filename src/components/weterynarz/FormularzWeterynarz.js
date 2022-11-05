import React from "react";
import formMode from "../helpers/FormMode";
import {useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {useNavigate} from "react-router";
import {CheckTextRange} from "../helpers/CheckTextRange";
import {getWeterynarzDetails,addWeterynarz, updateWeterynarz} from "../../api/WeterynarzApiCalls";
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import {ValidateEmail} from "../helpers/ValidateEmail";
import {ValidateNumerTelefonu} from "../helpers/ValidateNumerTelefonu";
import {checkNumberRange} from "../helpers/CheckNRange";


class FormularzWeterynarz extends React.Component {
    constructor(props) {
            super(props);
            console.log(this.props.params)
            const paramsIdWeterynarz = this.props.params.IdOsoba
            const currentFormMode = paramsIdWeterynarz ? formMode.EDIT : formMode.NEW

            this.state = {
              data: {
                  NazwaUzytkownika:'',
                  Imie:'',
                  Nazwisko:'',
                  NumerTelefonu:'',
                  Email:'',
                  Login:'',
                  DataUrodzenia:'',
                  DataZatrudnienia:'',
                  Pensja:'',
              },
              errors: {
                  NazwaUzytkownika:'',
                  Imie:'',
                  Nazwisko:'',
                  NumerTelefonu:'',
                  Email:'',
                  Login:'',
                  DataUrodzenia:'',
                  DataZatrudnienia:'',
                  Pensja:'',
              },
              dataUroZatr: {
                  Data1: false,
              },
              idWeterynarz: paramsIdWeterynarz,
              error: '',
              isLoaded: false,
              notice: '',
              formMode:currentFormMode
            }
    }


    componentDidMount() {

        if(this.state.formMode === formMode.EDIT){
            getWeterynarzDetails(this.state.idWeterynarz)
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

    onChange = (date) => {
         const data = {...this.state.data}
         let dataUroLubZatr=''
         const data1 = {...this.state.dataUroZatr}

         if(data1['Data1']===true){
            dataUroLubZatr='DataZatrudnienia'
         }
         else{
            dataUroLubZatr='DataUrodzenia'
         }
         console.log(dayjs(date).format() )
         data[dataUroLubZatr] = dayjs(date).format()

         const errorMessage = this.validateField(dataUroLubZatr, date)
         const errors = {...this.state.errors}
         errors[dataUroLubZatr] = errorMessage

         this.setState({
            data: data,
            errors: errors
         })
    }

    validateField = (fieldName, fieldValue) => {
        const {t} = this.props;
        let errorMessage = '';
        if (fieldName === 'NazwaUzytkownika') {
            if (!CheckTextRange(fieldValue, 5, 50)) {
                errorMessage = t('validation.from5to50')
            }
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        if (fieldName === 'Imie') {
            if (!CheckTextRange(fieldValue, 2, 50)) {
                errorMessage = t('validation.max50')
            }
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        if (fieldName === 'Nazwisko') {
            if (!CheckTextRange(fieldValue, 2, 50)) {
                errorMessage = t('validation.max50')
            }
            if (!fieldValue) {
                errorMessage = `${t('validation.required')}`
            }
        }
        if (fieldName === 'NumerTelefonu') {
            if (!ValidateNumerTelefonu(fieldValue)) {
                errorMessage = `${t('validation.format')}`
            }
            if (!fieldValue) {
                errorMessage = `${t('validation.required')}`
            }
        }
        if (fieldName === 'DataZatrudnienia') {
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        if (fieldName === 'DataUrodzenia') {
             if (fieldValue > dayjs(new Date())) {
                 errorMessage = t('validation.date')
             }
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        if (fieldName === 'Email') {
            if (!CheckTextRange(fieldValue, 6, 50)) {
                errorMessage = t('validation.from6to50')
            }
            if (!ValidateEmail(fieldValue)) {
                errorMessage = `${t('validation.format')}`
            }
            if (!fieldValue) {
                errorMessage = `${t('validation.required')}`
            }
        }
        if (fieldName === 'Pensja') {
            if(!checkNumberRange(fieldValue, 0, 99999)){
                errorMessage = t('validation.salary')
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

   onChange1 = (event) => {
       const {name} = event.target
       const data = {...this.state.dataUroZatr}
          data['Data1'] = !data['Data1']

          this.setState({
               dataUroZatr: data,
          })
       }


    validateForm = () => {
            const data = this.state.data
            console.log(data)
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
        const dane = {...this.state}
        let response, promise;
        console.log(dane.data)
        const isValid = this.validateForm()


        if (isValid) {

            if(dane.formMode === formMode.NEW){
                promise = addWeterynarz(dane.data)
            }
            else if (dane.formMode === formMode.EDIT){
                promise = updateWeterynarz(dane.data, dane.idWeterynarz)
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
                            navigate("/weterynarze", {replace: true});

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
        const {t} = this.props;
        const {navigate} = this.props
        const { i18n } = this.props;
        let language = i18n.language
        const pageTitle = this.state.formMode === formMode.NEW ? t('weterynarz.addNewVet') : t('weterynarz.editVet')

        return(
        <div class="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3">
                 <div class="w-full lg:w-1/6 lg:px-6 text-gray-800 leading-normal">
                    <p class="text-base font-bold py-2 text-xl lg:pb-6 text-gray-700">{pageTitle}</p>
                    <div class="block lg:hidden sticky inset-0">
                       <button id="menu-toggle" class="flex w-full justify-end px-3 py-3 bg-white lg:bg-transparent border rounded border-gray-600 hover:border-purple-500 appearance-none focus:outline-none">
                          <svg class="fill-current h-3 float-right" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                             <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                          </svg>
                       </button>
                    </div>
                 </div>


             <div
                className="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                <form onSubmit={this.handleSubmit}>
                    <section class="bg-white-100 border-b  mb-7">
                        <div class=" flex flex-wrap md:flex mb-6 mt-4">
                            <label className="block text-gray-600 font-bold md:text-left mb-3 mt-2 md:mb-0 pr-7"
                                   htmlFor="Nazwa">
                                {t('weterynarz.fields.login')}
                            </label>
                            <div class="md:w-3/5">
                                 <input class={this.state.errors.NazwaUzytkownika ? "form-textarea block w-full focus:bg-red" : "form-textarea block w-full focus:bg-white"}
                                 name="NazwaUzytkownika" id="NazwaUzytkownika" type="text" value={this.state.data.NazwaUzytkownika} onChange={this.handleChange} placeholder="" />
                        <span id="errorNazwaUzytkownika" className="errors-text2  mt-4">{this.state.errors.NazwaUzytkownika}</span>

                            </div>
                        </div>
                    </section>
                    <div class="flex flex-wrap -mx-3 mb-6 border-b">
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                                {t('weterynarz.fields.firstName')}
                            </label>
                            <input class=" form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            name="Imie" id="Imie"  type="text" value={this.state.data.Imie} onChange={this.handleChange} placeholder="" />
                            <span id="errorImie" className="errors-text2 mb-4 ">{this.state.errors.Imie}</span>

                        </div>
                        <div class="w-full md:w-1/3 px-3 mb-6 ml-8 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                                {t('weterynarz.fields.lastName')}
                            </label>
                            <input class="appearance-none form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            name="Nazwisko" id="Nazwisko" type="text" value={this.state.data.Nazwisko} placeholder="" onChange={this.handleChange}/>
                            <span id="errorNazwisko" className="errors-text2 mb-4 ">{this.state.errors.Nazwisko}</span>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6 border-b">
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                                {t('weterynarz.fields.phoneNumber')}
                            </label>
                            <input class=" form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            name="NumerTelefonu" id="NumerTelefonu"  type="text" value={this.state.data.NumerTelefonu} onChange={this.handleChange} placeholder="" />
                            <span id="errorNumerTelefonu" className="errors-text2 mb-4 ">{this.state.errors.NumerTelefonu}</span>

                        </div>
                        <div class="w-full md:w-1/3 px-3 mb-6 ml-8 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                                {t('weterynarz.fields.email')}
                            </label>
                            <input class="appearance-none form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            name="Email" id="Email" type="text" value={this.state.data.Email} placeholder="" onChange={this.handleChange}/>
                            <span id="errorEmail" className="errors-text2 mb-4 ">{this.state.errors.Email}</span>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6 ">
                        <div class="w-full md:w-2/4  mb-6 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">

                            </label>
                            <Calendar className="mb-7 calendarForm"
                                value={ this.state.date}
                                onClickDay={this.onChange}
                                locale={language}
                            />


                        </div>
                        <div class="w-full md:w-1/3 px-3 mb-6 mt-6 md:mb-0">
                            <div className="border-b mb-6">
                                <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                                    {t('weterynarz.fields.employmentDate')}
                                </label>
                                <input type="radio" class="form-radio mb-4"  name="Data" checked={this.state.dataUroZatr.Data1===true}  onChange={this.onChange1}/>
                                 <span id="" className="ml-4">

                                {this.state.data.DataZatrudnienia === '' || this.state.errors.DataZatrudnienia != '' ?
                                            '' : t('other.selectedDate') + dayjs(this.state.data.DataZatrudnienia).format('YYYY-MM-DD')}</span>
                                            <span id="errorData" className="errors-text2 mb-4">
                                                                                                                      {this.state.errors.DataZatrudnienia}
                                                                                                                  </span>
                            </div>
                            <div className="border-b mb-6 ">
                                <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                                    {t('weterynarz.fields.birthDate')}
                                </label>
                                <input type="radio" class="form-radio mb-4"  name="Data1" checked={this.state.dataUroZatr.Data1===false} onChange={this.onChange1}/>

                                          <span id="" className="ml-4">

                                {this.state.data.DataUrodzenia === '' || this.state.errors.DataUrodzenia != '' ?
                                        '' : t('other.selectedDate') + dayjs(this.state.data.DataUrodzenia).format('YYYY-MM-DD')}</span>
                                        <span id="errorData" className="errors-text2 mb-4">
                                               {this.state.errors.DataUrodzenia}
                                        </span>
                            </div>
                          </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6 border-b">
                        <div class="w-full md:w-1/3 px-3 mb-6  md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                                {t('weterynarz.fields.salary')}
                            </label>
                            <input class="appearance-none form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            name="Pensja" id="Pensja" type="number" value={this.state.data.Pensja} placeholder="" onChange={this.handleChange}/>
                            <span id="errorEmail" className="errors-text2 mb-4 ">{this.state.errors.Pensja}</span>
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

export default  withTranslation() (withNavigate(withRouter(FormularzWeterynarz)));