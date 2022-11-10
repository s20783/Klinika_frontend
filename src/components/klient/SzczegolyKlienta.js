import React from "react";
import formMode from "../helpers/FormMode";
import {useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {useNavigate} from "react-router";
import {getKlientDetails} from "../../api/KlientApiCalls";
import {getKlientPacjentList1} from "../../api/PacjentApiCalls";
import {getClientVisitList} from "../../api/WizytaApiCalls";
import dayjs from 'dayjs';
import {Link} from "react-router-dom";
import {getFormattedDateWithHour} from "../other/dateFormat";


class SzczegolyWeterynarza extends React.Component {
    constructor(props) {
            super(props);
            console.log(this.props.params)
            const paramsIdKlient = this.props.params.IdOsoba
            this.state = {
              data: {
                  Imie:'',
                  Nazwisko:'',
                  NumerTelefonu:'',
                  Email:'',
                  DataUrodzenia:'',
              },
              pacjenci: [],
              wizyty:[],
              idKlient: paramsIdKlient,
              error: '',
              isLoaded: false,
              notice: '',
            }
    }

    componentDidMount() {
            getKlientDetails(this.state.idKlient)
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

        const {navigate} = this.props;
        getKlientPacjentList1(this.state.idKlient)
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
                        pacjenci: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        getClientVisitList(this.state.idKlient)
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
                        wizyty: data
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







    render() {
        const {t} = this.props;
        const {navigate} = this.props
        const { i18n } = this.props;
        let language = i18n.language



        return(
        <div class="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3">
                 <div class="w-full lg:w-1/6 lg:px-6 text-gray-800 leading-normal">
                    <p class="text-base font-bold py-2 text-xl lg:pb-6 text-gray-700">{t('klient.detailsClient')}</p>
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
                    <div class="flex flex-wrap -mx-3 mb-6 border-b">
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                                {t('klient.fields.firstName')}
                            </label>
                            <input class=" form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            name="Imie" id="Imie"  type="text" value={this.state.data.Imie}  placeholder="" />

                        </div>
                        <div class="w-full md:w-1/3 px-3 mb-6 ml-8 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                                {t('klient.fields.lastName')}
                            </label>
                            <input class="appearance-none form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            name="Nazwisko" id="Nazwisko" type="text" value={this.state.data.Nazwisko} placeholder="" />
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6 border-b">
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                                {t('klient.fields.phoneNumber')}
                            </label>
                            <input class=" form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            name="NumerTelefonu" id="NumerTelefonu"  type="text" value={this.state.data.NumerTelefonu}  placeholder="" />

                        </div>
                        <div class="w-full md:w-1/3 px-3 mb-6 ml-8 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                                {t('klient.fields.email')}
                            </label>
                            <input class="appearance-none form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            name="Email" id="Email" type="text" value={this.state.data.Email} placeholder="" />
                        </div>
                    </div>

                    <div class="flex flex-wrap -mx-3 mb-6 ">
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
                                {t('klient.fields.birthDate')}
                            </label>
                            <input class=" form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            name="DataUrodzenia" id="DataUrodzenia"  type="text" value={dayjs(this.state.data.DataUrodzenia).format('YYYY-MM-DD')}  placeholder="" />

                        </div>

                    </div>


            <div className="flex justify-between mt-14">
             <h2 className=" w-1/3 my-2 mb-6 text-2xl font-black leading-tight text-gray-800">
                 {t("pacjent.title")}</h2>

                 <div className="relative  w-1/3 ">
                     <button id="menu-toggle" onClick={() => { this.showSelect()}}
                            className="absolute  top-0 right-0  h-12 w-46  shadow bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                         <span className="text-2xl font-bold ">+</span>
                     </button>
                 </div>
            </div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
            <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
                <thead className="text-s text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 uppercase py-3 text-center">{t('pacjent.fields.name')}</th>
                    <th scope="col" className="px-6 uppercase py-3 text-center">{t('pacjent.fields.species')}</th>
                    <th scope="col" className="px-6 uppercase py-3 text-center">{t('pacjent.fields.breed')}</th>
                    <th scope="col" className="px-6 uppercase py-3 text-center">{t('pacjent.fields.gender')}</th>
                    <th scope="col" className="px-6 uppercase py-3 text-center">{t('pacjent.fields.aggressive')}</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {this.state.pacjenci.map(x => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600"
                        key={x.IdPacjent}>
                        <td className="px-6 py-2 text-center">{x.Nazwa}</td>
                        <td className="px-6 py-2 text-center">{x.Gatunek}</td>
                        <td className="px-6 py-2 text-center">{x.Rasa}</td>
                        <td className="px-6 py-2 text-center">{x.Plec}</td>
                        <td className="px-6 py-2 text-center">{x.Agresywne ===true ? "Tak" : "Nie"}</td>
                            <div className="list-actions py-2">
                                <div className=" flex">
                                    <Link to={`/pacjenci/details/${x.IdPacjent}`} className="list-actions-button-details flex-1">
                                        <svg className="list-actions-button-details flex-1"
                                             xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                             fill="#000000" viewBox="0 0 256 256">
                                            <rect width="256" height="256" fill="none"/>
                                            <g className="details-icon-color" opacity="0.1"></g>
                                            <circle className="details-icon-color hover:white-100" cx="128" cy="128"
                                                    r="96"
                                                    fill="none" stroke="#000000" stroke-linecap="round"
                                                    stroke-linejoin="round" stroke-width="16"></circle>
                                            <polyline className="details-icon-color"
                                                      points="120 120 128 120 128 176 136 176" fill="none"
                                                      stroke="#000000" stroke-linecap="round"
                                                      stroke-linejoin="round" stroke-width="16"></polyline>
                                            <circle className="details-icon-color dot" cx="126" cy="84"
                                                    r="12"></circle>
                                        </svg>
                                    </Link>
                                    <Link to={`/pacjenci/edycjaPacjenta/${x.IdPacjent}`} className="list-actions-button-details flex-1">
                                        <svg className="list-actions-button-edit flex-1"
                                             xmlns="http://www.w3.org/2000/svg"
                                             width="20" height="20" fill="#000000" viewBox="0 0 256 256">
                                            <rect className="details-icon-color" width="256" height="256"
                                                  fill="none"></rect>
                                            <path className="details-icon-color"
                                                  d="M96,216H48a8,8,0,0,1-8-8V163.31371a8,8,0,0,1,2.34315-5.65686l120-120a8,8,0,0,1,11.3137,0l44.6863,44.6863a8,8,0,0,1,0,11.3137Z"
                                                  fill="none" stroke="#000000" stroke-linecap="round"
                                                  stroke-linejoin="round" stroke-width="16"></path>
                                            <line className="details-icon-color" x1="136" y1="64" x2="192" y2="120"
                                                  fill="none" stroke="#000000" stroke-linecap="round"
                                                  stroke-linejoin="round" stroke-width="16"></line>
                                            <polyline className="details-icon-color"
                                                      points="216 216 96 216 40.509 160.509" fill="none"
                                                      stroke="#000000" stroke-linecap="round"
                                                      stroke-linejoin="round" stroke-width="16"></polyline>
                                        </svg>
                                    </Link>
                                    <Link to={`/pacjenci/delete/${x.IdPacjent}`} className="list-actions-button-details flex-1">
                                        <svg className="list-actions-button-delete flex-1"
                                             xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                             fill="#000000" viewBox="0 0 256 256">
                                            <rect width="256" height="256" fill="none"></rect>
                                            <line className="details-icon-color" x1="215.99609" y1="56"
                                                  x2="39.99609" y2="56.00005" fill="none" stroke="#000000"
                                                  stroke-linecap="round" stroke-linejoin="round"
                                                  stroke-width="16"></line>
                                            <line className="details-icon-color" x1="104" y1="104" x2="104" y2="168"
                                                  fill="none" stroke="#000000" stroke-linecap="round"
                                                  stroke-linejoin="round" stroke-width="16"></line>
                                            <line className="details-icon-color" x1="152" y1="104" x2="152" y2="168"
                                                  fill="none" stroke="#000000" stroke-linecap="round"
                                                  stroke-linejoin="round" stroke-width="16"></line>
                                            <path className="details-icon-color"
                                                  d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56" fill="none"
                                                  stroke="#000000" stroke-linecap="round"
                                                  stroke-linejoin="round" stroke-width="16"></path>
                                            <path className="details-icon-color"
                                                  d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56"
                                                  fill="none" stroke="#000000" stroke-linecap="round"
                                                  stroke-linejoin="round" stroke-width="16"></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                    </tr>
                ))}
                </tbody>
            </table>

          </div>
            <div className="flex justify-between mt-14">
             <h2 className=" w-1/3 my-2 mb-6 text-2xl font-black leading-tight text-gray-800">
                 {t("wizyta.title")}</h2>

                 <div className="relative  w-1/3 ">
                     <button id="menu-toggle" onClick={() => { this.showSelect()}}
                            className="absolute  top-0 right-0  h-12 w-46  shadow bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                         <span className="text-2xl font-bold ">+</span>
                     </button>
                 </div>
            </div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
            <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
                <thead className="text-s text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 uppercase py-3 text-center">{t('wizyta.table.date')}</th>
                    <th scope="col" className="px-6 uppercase py-3 text-center">{t('wizyta.table.patient')}</th>
                    <th scope="col" className="px-6 uppercase py-3 text-center">{t('wizyta.table.vet')}</th>
                    <th scope="col" className="px-6 uppercase py-3 text-center">{t('wizyta.table.status')}</th>
                    <th scope="col" className="px-6 uppercase py-3 text-center">{t('wizyta.table.isPaid')}</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {this.state.wizyty.map(x => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600"
                        key={x.IdWizyta}>
                        <td scope="col" className="px-6 py-2 text-center">{x.Data != null ? getFormattedDateWithHour(x.Data) : "-"}</td>
                        <td scope="col" className="px-6 py-2 text-center">{x.Pacjent}</td>
                        <td scope="col" className="px-6 py-2 text-center">{x.Weterynarz}</td>
                        <td scope="col" className="px-6 py-2 text-center">{x.Status}</td>
                         <td scope="col" className="px-6 py-2 text-center">{x.CzyOplacona ? t("other.yes") : t("other.no")}</td>

                            <div className="list-actions text-center py-2">
                                <div className=" flex">
                                    <Link to={`/wizyty/${x.IdWizyta}`} className="list-actions-button-details flex-1">
                                        <svg className="list-actions-button-details flex-1"
                                             xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                             fill="#000000" viewBox="0 0 256 256">
                                            <rect width="256" height="256" fill="none"/>
                                            <g className="details-icon-color" opacity="0.1"></g>
                                            <circle className="details-icon-color hover:white-100" cx="128" cy="128"
                                                    r="96"
                                                    fill="none" stroke="#000000" strokeLinecap="round"
                                                    strokeLinejoin="round" strokeWidth="16"></circle>
                                            <polyline className="details-icon-color"
                                                      points="120 120 128 120 128 176 136 176" fill="none"
                                                      stroke="#000000" strokeLinecap="round"
                                                      strokeLinejoin="round" strokeWidth="16"></polyline>
                                            <circle className="details-icon-color dot" cx="126" cy="84"
                                                    r="12"></circle>
                                        </svg>
                                    </Link>
                                     <Link to={`/wizyty/edit/${x.IdWizyta}`} className="list-actions-button-details flex-1">
                                        <svg className="list-actions-button-edit flex-1"
                                             xmlns="http://www.w3.org/2000/svg"
                                             width="20" height="20" fill="#000000" viewBox="0 0 256 256">
                                            <rect className="details-icon-color" width="256" height="256"
                                                  fill="none"></rect>
                                            <path className="details-icon-color"
                                                  d="M96,216H48a8,8,0,0,1-8-8V163.31371a8,8,0,0,1,2.34315-5.65686l120-120a8,8,0,0,1,11.3137,0l44.6863,44.6863a8,8,0,0,1,0,11.3137Z"
                                                  fill="none" stroke="#000000" strokeLinecap="round"
                                                  strokeLinejoin="round" strokeWidth="16"></path>
                                            <line className="details-icon-color" x1="136" y1="64" x2="192" y2="120"
                                                  fill="none" stroke="#000000" strokeLinecap="round"
                                                  strokeLinejoin="round" strokeWidth="16"></line>
                                            <polyline className="details-icon-color"
                                                      points="216 216 96 216 40.509 160.509" fill="none"
                                                      stroke="#000000" strokeLinecap="round"
                                                      strokeLinejoin="round" strokeWidth="16"></polyline>
                                        </svg>
                                    </Link>
                                     <Link to={`/wizyty/delete/${x.IdWizyta}`} className="list-actions-button-details flex-1">
                                        <svg className="list-actions-button-delete flex-1"
                                             xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                             fill="#000000" viewBox="0 0 256 256">
                                            <rect width="256" height="256" fill="none"></rect>
                                            <line className="details-icon-color" x1="215.99609" y1="56"
                                                  x2="39.99609" y2="56.00005" fill="none" stroke="#000000"
                                                  stroke-linecap="round" stroke-linejoin="round"
                                                  stroke-width="16"></line>
                                            <line className="details-icon-color" x1="104" y1="104" x2="104" y2="168"
                                                  fill="none" stroke="#000000" stroke-linecap="round"
                                                  stroke-linejoin="round" stroke-width="16"></line>
                                            <line className="details-icon-color" x1="152" y1="104" x2="152" y2="168"
                                                  fill="none" stroke="#000000" stroke-linecap="round"
                                                  stroke-linejoin="round" stroke-width="16"></line>
                                            <path className="details-icon-color"
                                                  d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56" fill="none"
                                                  stroke="#000000" stroke-linecap="round"
                                                  stroke-linejoin="round" stroke-width="16"></path>
                                            <path className="details-icon-color"
                                                  d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56"
                                                  fill="none" stroke="#000000" stroke-linecap="round"
                                                  stroke-linejoin="round" stroke-width="16"></path>
                                        </svg>
                                    </Link>

                                </div>
                            </div>


                    </tr>
                ))}
                </tbody>
            </table>

          </div>

                    <div className=" md:flex mb-6 mt-8 ">
                        <div className="flex pb-3">
                            <button onClick={() => navigate(-1)}
                                    className="shadow bg-red-500 hover:bg-white  hover:text-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                    type="button">
                                {t("button.back")}
                            </button>
                        </div>
                    </div>
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

export default  withTranslation() (withNavigate(withRouter(SzczegolyWeterynarza)));