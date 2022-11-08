import React from "react";
import formMode from "../helpers/FormMode";
import {useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {useNavigate} from "react-router";
import {CheckTextRange} from "../helpers/CheckTextRange";
import {getUslugaDetails,addUsluga, updateUsluga} from "../../api/UslugaApiCalls";

class FormularzUslugi extends React.Component {
    constructor(props) {
            super(props);
            console.log(this.props.params)
            const paramsIdUsluga = this.props.params.idUsluga
            const currentFormMode = paramsIdUsluga ? formMode.EDIT : formMode.NEW

            this.state = {
              data: {
                  NazwaUslugi:'',
                  Opis:'',
                  Cena:null,
                  Narkoza:false,
                  Dolegliwosc:''
              },
              errors: {
                  Nazwa: '',
                  Opis: '',
                  Cena:'',
                  Dolegliwosc:''
              },
              idUsluga: paramsIdUsluga,
              error: '',
              isLoaded: false,
              notice: '',
              formMode:currentFormMode
            }
    }



    componentDidMount() {

        if(this.state.formMode === formMode.EDIT){
            getUslugaDetails(this.state.idUsluga)
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
        const {t} = this.props;
        let errorMessage = '';
        if (fieldName === 'NazwaUslugi') {
            if (!CheckTextRange(fieldValue, 2, 50)) {
                errorMessage = t('validation.max50')
            }
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        if (fieldName === 'Opis') {
        console.log(fieldValue.toString().trim().length)
            if (!CheckTextRange(fieldValue, 0, 300)) { /////////??????????????????????
                errorMessage = t('validation.max300nullable')
            }
        }
        if (fieldName === 'Cena') {
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        if (fieldName === 'Dolegliwosc') {
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
                const errorMessage = this.validateField(fieldName, fieldValue)
                errors[fieldName] = errorMessage
            }

            this.setState({
                errors: errors
            })
            return !this.hasErrors();
    }

    onChange1 = (event) => {
       const {name} = event.target
       const data = {...this.state.data}
          data[name] = !data[name]

          this.setState({
               data: data,
          })
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
                promise = addUsluga(dane.data)
            }
            else if (dane.formMode === formMode.EDIT){
                promise = updateUsluga(dane.data, dane.idUsluga)
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
                        if (response < 200 & response < 299) {
                            console.log(response.status)
                            navigate("/uslugi", {replace: true});

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
        const pageTitle = this.state.formMode === formMode.NEW ? t('usluga.addNewService') : t('usluga.editService')

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
                                {t('usluga.fields.name')}
                            </label>
                            <div class="md:w-3/5">
                                 <input class={this.state.errors.Nazwa ? "form-textarea block w-full focus:bg-red" : "form-textarea block w-full focus:bg-white"}
                                 name="NazwaUslugi" id="NazwaUslugi" type="text" value={this.state.data.NazwaUslugi} onChange={this.handleChange} placeholder="" />

                            </div>
                            <span id="errorNazwa" className="errors-text2 ml-24 mt-4">{this.state.errors.NazwaUslugi}</span>
                        </div>
                    </section>
                    <div className="border-b">
                    <label class="block mt-5 text-gray-600 font-bold md:text-left mb-6 " id="Opis">
                        {t('usluga.fields.description')}
                    </label>
                    <div class="md:w-3/4 mt-5">
                        <textarea class="form-textarea block w-full focus:bg-white " id="Opis" name="Opis" placeholder={t('usluga.addDescription')}
                                  rows="5" value={this.state.data.Opis} onChange={this.handleChange}/>
                    </div>
                    <span id="errorOpis" className="errors-text2 my-6  ">{this.state.errors.Opis}</span>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6 border-b">
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                                {t('usluga.fields.price')}
                            </label>
                            <input class=" form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            name="Cena" id="Cena" step="0.01" type="number" value={this.state.data.Cena} onChange={this.handleChange} placeholder="" />
                            <span id="errorCena" className="errors-text2 mb-6 ">{this.state.errors.Cena}</span>
                        </div>
                        <div class="w-full md:w-1/3 px-3 mb-6 ml-20 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                                {t('usluga.fields.narcosis')}
                            </label>
                            <input type="checkbox"  name="Narkoza" checked={this.state.data.Narkoza===true} class="form-checkbox mb-4 w-8 h-8 mt-3 text-blue-600" onChange={this.onChange1}/>
                        </div>
                    </div>

                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-full px-3 mb-6 md:mb-0">
                                <label class="block  tracking-wide text-gray-700 text-s font-bold mb-4" for="grid-city">
                                    {t('usluga.fields.painScale')}
                                </label>
                                <label class="inline-flex  items-center">
                                    <input name="Dolegliwosc" id="Dolegliwosc" type="radio" checked={this.state.data.Dolegliwosc==="Niska"} class="form-radio text-indigo-600"
                                    value="Niska" onChange={this.handleChange}/>
                                    <span class="ml-2">{t('usluga.fields.painScaleEnum.low')}</span>
                                </label>
                                <label class="inline-flex items-center  ml-14 mb-5">
                                    <input name="Dolegliwosc" id="Dolegliwosc" type="radio" class="form-radio" checked={this.state.data.Dolegliwosc==="Średnia"}
                                     value="Średnia" onChange={this.handleChange}/>
                                    <span class="ml-2">{t('usluga.fields.painScaleEnum.medium')}</span>
                                </label>
                                <label class="inline-flex items-center  ml-14 mb-4">
                                    <input name="Dolegliwosc" id="Dolegliwosc" type="radio" class="form-radio" checked={this.state.data.Dolegliwosc==="Wysoka"}
                                     value="Wysoka" onChange={this.handleChange}/>
                                    <span class="ml-2">{t('usluga.fields.painScaleEnum.high')}</span>
                                    <span id="errorDolegliwosc" className="errors-text2 ml-20 mt-1">{this.state.errors.Dolegliwosc}</span>
                                </label>
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

export default  withTranslation() (withNavigate(withRouter(FormularzUslugi)));