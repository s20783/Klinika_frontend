import React from "react";
import {useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {getFormattedDateWithHour} from "../other/dateFormat";
import {Link} from "react-router-dom";
import {getWizytaDetails} from "../../axios/WizytaAxiosCalls";

class SzczegolyWizyty extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdWizyta = this.props.params.IdWizyta
        this.state = {
            wizyta: {
                Pacjent: '',
                Weterynarz: '',
                DataRozpoczecia: null,
                DataZakonczenia: null,
                Opis: '',
                NotatkaKlient: '',
                Cena: null,
                CzyOplacona: false,
                Status: '',
            },
            idWizyta: paramsIdWizyta,
            message: '',
            uslugi: []
        }
    }

    fetchWizytaDetails = async () => {
        try {
            const res = await getWizytaDetails(this.state.idWizyta)
            var data = await res.data

            this.setState({
                isLoaded: true,
                wizyta: data
            });
        } catch (error) {
            console.log(error)
        }
    }


    componentDidMount() {
        this.fetchWizytaDetails()
        /*
                 getUslugaVisitList(this.state.idWizyta)
                     .then(res => {
                         console.log(res.status)
                         if (res.status === 401) {
                             console.log('Potrzebny aktualny access token')
                         }
                         return res.json()
                     })
                     .then(
                         (data) => {
                             console.log(data)
                             this.setState({
                                 isLoaded: true,
                                 uslugi: data
                             });
                         },
                         (error) => {
                             this.setState({
                                 isLoaded: true,
                                 error
                             });
                         }
                     )*/
    }

    render() {
        const {error, isLoaded, wizyta, uslugi} = this.state
        const {t} = this.props;
        let content;
        /*
                 if (error) {
                            content = <p>Błąd: {error.message}</p>
                        } else if (!isLoaded) {
                            content = <p>Ładowanie...</p>
                        } else {
                            content =
                                <div>
                                        gdy brak listy -> kontnet
                                </div>
                        }*/

        return (
            <div class="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3">
                <div class="w-full lg:w-1/6 lg:px-6 text-gray-800 leading-normal">
                    <p class="text-base font-bold py-2 text-xl lg:pb-6 text-gray-700">{t('wizyta.visitDetails')}</p>
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
                    <form className="w-full max-w">
                        <div class="flex flex-wrap -mx-3 mb-4 border-b">
                            <div class="w-full px-3">
                                <label class="block tracking-wide text-gray-600 text-s font-bold mb-2">
                                    {t('wizyta.table.patient')}
                                </label>
                                <input
                                    class="form-textarea appearance-none block w-4/6 bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 mb-4 leading-tight focus:outline-none focus:bg-white "
                                    name="Wlasciciel" id="Wlasciciel" type="text" value={wizyta.Pacjent}
                                    disabled placeholder=""/>
                            </div>
                        </div>

                        <div class="flex flex-wrap -mx-3 mb-4 border-b">
                            <div class="w-full px-3">
                                <label class="block tracking-wide text-gray-600 text-s font-bold mb-2">
                                    {t('wizyta.table.vet')}
                                </label>
                                <input
                                    class="form-textarea appearance-none block w-4/6 bg-gray-200  text-gray-700 border border-gray-200 rounded py-1 px-4 mb-4 leading-tight focus:outline-none focus:bg-white "
                                    name="Nazwa" id="Nazwa" type="text" value={wizyta.Weterynarz}
                                    disabled placeholder=""/>
                            </div>
                        </div>

                        <div class="flex flex-wrap -mx-3 mb-6 border-b">
                            <div class="w-full md:w-2/6 px-3 mb-6 md:mb-0">
                                <label class="block  tracking-wide text-gray-600 text-s font-bold mb-2">
                                    {t('wizyta.table.startDate')}
                                </label>
                                <input
                                    class=" form-textarea appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:border-blue-600 "
                                    name="DataRozpoczecia" id="DataRozpoczecia" type="text"
                                    value={wizyta.DataRozpoczecia != null ? getFormattedDateWithHour(wizyta.DataRozpoczecia) : "-"}
                                    placeholder="" disabled/>
                            </div>
                            <div class="w-full md:w-2/6 px-3 ml-8">
                                <label class="block  tracking-wide text-gray-600 text-s font-bold mb-2"
                                       form="grid-last-name">
                                    {t('wizyta.table.endDate')}
                                </label>
                                <input
                                    class=" form-textarea appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="DataZakonczenia" id="DataZakonczenia" type="text"
                                    value={wizyta.DataZakonczenia != null ? getFormattedDateWithHour(wizyta.DataZakonczenia) : "-"}
                                    placeholder="" disabled/>
                            </div>
                        </div>
                        <div class=" mb-6 border-b">
                            <label class="block mt-5 text-gray-600 font-bold md:text-left mb-6 " id="Opis">
                                {t("wizyta.table.description")}
                            </label>
                            <div class="md:w-3/4 mt-5">
                          <textarea class="form-textarea block w-full focus:bg-white mb-4" id="Opis" name="Opis"
                                    value={wizyta.Opis} rows="5" disabled/>
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6 border-b">
                            <div class="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                                <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-city">
                                    {t('wizyta.table.clientNote')}
                                </label>
                                <textarea class="form-textarea block w-full focus:bg-white mb-4" id="Notatka"
                                          name="Notatka"
                                          value={wizyta.NotatkaKlient} rows="5"
                                          disabled/>
                            </div>
                            <div class="w-full md:w-1/3 px-3 mb-6 mt-6 ml-14 md:mb-0">
                                <div className=" mb-6">
                                    <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                           form="grid-city">
                                        {t('wizyta.table.isPaid')}
                                    </label>
                                    {wizyta.CzyOplacona === true &&
                                        <svg class="h-8 w-8 text-black mb-5" width="24" height="24" viewBox="0 0 24 24"
                                             stroke="currentColor" fill="none" stroke-linecap="round"
                                             strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z"/>
                                            <path d="M5 12l5 5l10 -10"/>
                                        </svg>}
                                    {wizyta.CzyOplacona === false &&
                                        <svg class="h-8 w-8 text-black mb-5" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path stroke-linecap="round" strokeLinejoin="round"
                                                  d="M6 18L18 6M6 6l12 12"/>
                                        </svg>}
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-wrap  mb-6 ">
                            <div className="w-full md:w-2/6 px-3 mb-6 md:mb-0">
                                <label class="block  tracking-wide text-gray-600 text-s font-bold mb-2">
                                    {t('wizyta.table.price')}
                                </label>
                                <input
                                    class=" form-textarea appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:border-blue-600 "
                                    name="Cena" id="Cena" type="text" value={wizyta.Cena} placeholder=""
                                    disabled/>
                            </div>
                            <div class="w-full md:w-2/6 px-3 ml-8">
                                <label class="block  tracking-wide text-gray-600 text-s font-bold mb-2"
                                       form="grid-last-name">
                                    {t('wizyta.table.status')}
                                </label>
                                <input
                                    class=" form-textarea appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="Status" id="Status" type="text"
                                    value={t('wizyta.status.' + wizyta.Status)} placeholder=""
                                    disabled/>
                            </div>
                        </div>

                    </form>
                    <div className="flex justify-between mt-14">
                        <h2 className=" w-1/3 my-2 mb-6 text-2xl font-black leading-tight text-gray-800">
                            {t('usluga.title')}</h2>
                    </div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
                            <thead
                                className="text-s text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 uppercase py-3 text-center">
                                    {t("usluga.fields.narcosis")}</th>
                                <th scope="col" className="px-6 uppercase py-3 text-center">
                                    {t("usluga.fields.price")}</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {uslugi.map(x => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600"
                                    key={x.idUsluga}>
                                    <td className="px-6 py-2 text-center">{x.Nazwa}</td>
                                    <td className="px-6 py-2 text-center">{x.CzyNarkoza}</td>
                                    <td className="px-6 py-2 text-center">{x.Cena}</td>

                                    <div className="list-actions text-center py-2">
                                        <div className=" flex">
                                            <Link to={`/uslugi/${x.IdUsluga}`}
                                                  className="list-actions-button-details flex-1">
                                                <svg className="list-actions-button-details flex-1"
                                                     xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                     fill="#000000" viewBox="0 0 256 256">
                                                    <rect width="256" height="256" fill="none"/>
                                                    <g className="details-icon-color" opacity="0.1"></g>
                                                    <circle className="details-icon-color hover:white-100" cx="128"
                                                            cy="128"
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
                                            <Link to={`/wizyty/delete/${x.IdWizyta}`}
                                                  className="list-actions-button-details flex-1">
                                                <svg className="list-actions-button-delete flex-1"
                                                     xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                     fill="#000000" viewBox="0 0 256 256">
                                                    <rect width="256" height="256" fill="none"></rect>
                                                    <line className="details-icon-color" x1="215.99609" y1="56"
                                                          x2="39.99609" y2="56.00005" fill="none" stroke="#000000"
                                                          stroke-linecap="round" strokeLinejoin="round"
                                                          strokeWidth="16"></line>
                                                    <line className="details-icon-color" x1="104" y1="104" x2="104"
                                                          y2="168"
                                                          fill="none" stroke="#000000" stroke-linecap="round"
                                                          strokeLinejoin="round" strokeWidth="16"></line>
                                                    <line className="details-icon-color" x1="152" y1="104" x2="152"
                                                          y2="168"
                                                          fill="none" stroke="#000000" stroke-linecap="round"
                                                          strokeLinejoin="round" strokeWidth="16"></line>
                                                    <path className="details-icon-color"
                                                          d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56" fill="none"
                                                          stroke="#000000" stroke-linecap="round"
                                                          strokeLinejoin="round" strokeWidth="16"></path>
                                                    <path className="details-icon-color"
                                                          d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56"
                                                          fill="none" stroke="#000000" stroke-linecap="round"
                                                          strokeLinejoin="round" strokeWidth="16"></path>
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </tr>
                            ))}
                            </tbody>
                        </table>
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

export default withTranslation()(withRouter(SzczegolyWizyty));