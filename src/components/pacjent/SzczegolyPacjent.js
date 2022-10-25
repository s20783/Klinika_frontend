import React from "react";
import {getKlientList} from "../../api/KlientApiCalls";
import {getPacjentDetails1} from "../../api/PacjentApiCalls";
import DodaniePacjentaForm from "./DodaniePacjentaForm";
import formMode from "../helpers/FormMode";
import {useParams} from "react-router";
import dayjs from 'dayjs';
import {withTranslation} from "react-i18next";


class SzczegolyPacjent extends React.Component {
    constructor(props) {
            super(props);
            const paramsIdPacjent = this.props.params.idPacjent
         this.state = {
            pacjent: {
                IdOsoba: '',
                Wlasciciel:'',
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
            idPacjent:paramsIdPacjent,
            message:''
         }
    }

      fetchPatientDetails = () => {
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
                              pacjent: data,
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


    componentDidMount() {
       this.fetchPatientDetails()
    }

    render() {
        const {error, isLoaded, pacjent} = this.state
        const {t} = this.props;

        return(
        <div class="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3">
                 <div class="w-full lg:w-1/6 lg:px-6 text-gray-800 leading-normal">
                    <p class="text-base font-bold py-2 text-xl lg:pb-6 text-gray-700">{t('pacjent.detailsPatient')}</p>
                    <div class="block lg:hidden sticky inset-0">
                       <button id="menu-toggle" class="flex w-full justify-end px-3 py-3 bg-white lg:bg-transparent border rounded border-gray-600 hover:border-purple-500 appearance-none focus:outline-none">
                          <svg class="fill-current h-3 float-right" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                             <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                          </svg>
                       </button>
                    </div>
                 </div>
                 <div className="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                 <form onSubmit={this.handleSubmit} className="w-full max-w">
                     <div class="flex flex-wrap -mx-3 mb-4 border-b">
                         <div class="w-full px-3">
                             <label class="block tracking-wide text-gray-600 text-s font-bold mb-2" >
                                   {t('pacjent.fields.owner')}
                             </label>
                             <input class="form-textarea appearance-none block w-4/6 bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 mb-1 leading-tight focus:outline-none focus:bg-white "
                                 name="Wlasciciel" id="Wlasciciel" type="text" value="Adam Nowak"  onChange={this.handleChange} placeholder="" />
                         </div>
                    </div>

                    <div class="flex flex-wrap -mx-3 mb-4 border-b">
                         <div class="w-full px-3">
                             <label class="block tracking-wide text-gray-600 text-s font-bold mb-2" >
                                  {t('pacjent.fields.name')}
                             </label>
                             <input class="form-textarea appearance-none block w-4/6 bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 mb-1 leading-tight focus:outline-none focus:bg-white "
                                 name="Nazwa" id="Nazwa" type="text" value={this.state.pacjent.Nazwa} onChange={this.handleChange} placeholder="" />
                         </div>
                    </div>

                    <div class="flex flex-wrap -mx-3 mb-6 border-b">
                        <div class="w-full md:w-2/6 px-3 mb-6 md:mb-0">
                            <label class="block  tracking-wide text-gray-600 text-s font-bold mb-2" >
                               {t('pacjent.fields.species')}
                            </label>
                            <input class=" form-textarea appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:border-blue-600 "
                            name="Gatunek" id="Gatunek" type="text"  value={this.state.pacjent.Gatunek} placeholder="" onChange={this.handleChange}/>
                        </div>
                        <div class="w-full md:w-2/6 px-3 ml-8">
                            <label class="block  tracking-wide text-gray-600 text-s font-bold mb-2" for="grid-last-name">
                                {t('pacjent.fields.breed')}
                            </label>
                            <input class=" form-textarea appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            name="Rasa" id="Rasa" type="text"  value={this.state.pacjent.Rasa} placeholder="" onChange={this.handleChange}/>
                        </div>
                    </div>

                    <div class="flex flex-wrap -mx-3 mb-6 border-b">
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                                {t('pacjent.fields.weight')}
                            </label>
                            <input class=" form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            name="Waga" id="Waga" step="0.01" type="number" value={this.state.pacjent.Waga} onChange={this.handleChange} placeholder="" />

                        </div>
                        <div class="w-full md:w-1/3 px-3 mb-6 ml-8 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                                {t('pacjent.fields.color')}
                            </label>
                            <input class="appearance-none form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            name="Masc" id="Masc" type="text"value={this.state.pacjent.Masc} placeholder="" onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6 border-b">
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                               {t('pacjent.fields.birthdate')}
                            </label>
                            <input class=" form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            name="DataUrodzenia" id="DataUrodzenia"  type="text" value={dayjs(this.state.pacjent.DataUrodzenia).format('YYYY-MM-DD')}  placeholder="" />

                        </div>
                        <div class="w-full md:w-1/3 px-3 mb-6 ml-8 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                                {t('pacjent.fields.infertile')}
                            </label>
                            {this.state.pacjent.Ubezplodnienie===true && <svg class="h-8 w-8 text-black mb-5"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M5 12l5 5l10 -10" /></svg>}
                            {this.state.pacjent.Ubezplodnienie===false && <svg class="h-8 w-8 text-black mb-5"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                                                     </svg>}                        </div>
                    </div>

                    <div class="flex flex-wrap -mx-3 mb-6 ">
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                                {t('pacjent.fields.gender')}
                            </label>
                            {this.state.pacjent.Plec==="M" && <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" font-weight="bold" class="bi bi-gender-male" viewBox="0 0 16 16">
                                                                <path fill-rule="evenodd" d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2H9.5zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" stroke="black" stroke-width="0.5"/>
                                                              </svg>}
                            {this.state.pacjent.Plec==="F" && <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"  class="bi bi-gender-female" viewBox="0 0 16 16">
                                                                <path fill-rule="evenodd" d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5z" stroke="black" stroke-width="0.5"/>
                                                              </svg>}
                        </div>
                        <div class="w-full md:w-1/3 px-3 mb-6 ml-8 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                                {t('pacjent.fields.aggressive')}
                            </label>
                            {this.state.pacjent.Agresywne===true && <svg class="h-8 w-8 text-black"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M5 12l5 5l10 -10" /></svg>}
                            {this.state.pacjent.Agresywne===false && <svg class="h-8 w-8 text-black "  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                                                     </svg>}

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

export default withTranslation() (withRouter(SzczegolyPacjent));