import React from "react";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {getWeterynarzDetails} from "../../api/WeterynarzApiCalls";
import {
    addWeterynarzSpecjalizacja,
    deleteWeterynarzSpecjalizacja,
    getWeterynarzSpecjalizacjaList
} from "../../api/WeterynarzSpecjalizacjaApiCalls";
import {getSpecjalizacjaList} from "../../api/SpecjalizacjaApiCalls";
import {getFormattedDate, getFormattedHour} from "../other/dateFormat";
import {getGodzinyPracyList} from "../../api/GodzinyPracyApiCalls";
import {Link} from "react-router-dom";

class SzczegolyWeterynarza extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.params)
        const paramsIdWeterynarz = this.props.params.IdOsoba
        this.state = {
            data: '',
            specjalizacje: [],
            specjalizacje1: [],
            data1: {
                IdSpecjalizacja: null,
            },
            errors1: {
                IdSpecjalizacja: '',
            },
            godzinyPracy: [],
            idWeterynarz: paramsIdWeterynarz,
            error: '',
            isLoaded: false,
            notice: '',

        }
    }

    componentDidMount() {
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

        getWeterynarzSpecjalizacjaList(this.state.idWeterynarz)
            .then(res => {
                console.log(res.status)
                return res.json()
            })
            .then(
                (data) => {
                    console.log(data)
                    this.setState({
                        isLoaded: true,
                        specjalizacje: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

        getGodzinyPracyList(this.state.idWeterynarz)
            .then(res => {
                console.log(res.status)
                return res.json()
            })
            .then(
                (data) => {
                    console.log(data)
                    this.setState({
                        isLoaded: true,
                        godzinyPracy: data
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

    showSelect() {
        if (this.state.specjalizacje1.length === 0) {
            getSpecjalizacjaList()
                .then(res => {
                    console.log(res.status)
                    return res.json()
                })
                .then(
                    (data) => {
                        console.log(data)
                        this.setState({
                            isLoaded: true,
                            specjalizacje1: data
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

        const helpDiv = document.getElementById("spec-content");
        const helpDiv1 = document.getElementById("spec-content1");

        if (helpDiv.classList.contains("hidden")) {
            helpDiv.classList.remove("hidden");
            helpDiv1.classList.remove("hidden");

        } else {
            helpDiv.classList.add("hidden");
            helpDiv1.classList.add("hidden");

            const data = {...this.state.data1}
            data['IdSpecjalizacja'] = null
            this.setState({
                data1: data,
            })
        }

    }

    deleteSpec = (idSpec) => {
        const {navigate} = this.props;
        let response;
        console.log(idSpec)
        deleteWeterynarzSpecjalizacja(idSpec, this.state.idWeterynarz)
            .then(res => {
                response = res
                console.log(response.status)
                if (response.ok) {
                    console.log(response.status)
                    navigate(0);
                } else if (response.status === 401) {
                    console.log("Brak autoryzacji")

                } else {
                    console.log(response.status)
                }
            })
    }

    handleChange = (event) => {
        const {name, value} = event.target
        const data = {...this.state.data1}
        data[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = {...this.state.errors1}
        errors[name] = errorMessage

        this.setState({
            data1: data,
            errors1: errors
        })

    }

    addSpec = () => {
        const {navigate} = this.props;
        let response;
        console.log(this.state.data1.IdSpecjalizacja)
        if (this.state.data1.IdSpecjalizacja !== null) {
            addWeterynarzSpecjalizacja(this.state.data1.IdSpecjalizacja, this.state.idWeterynarz)
                .then(res => {
                    response = res
                    console.log(response.status)
                    if (response.ok) {
                        console.log(response.status)
                        navigate(0);
                    } else if (response.status === 401) {
                        console.log("Brak autoryzacji")

                    } else {
                        console.log(response.status)
                    }
                })
        }
    }

    validateField = (fieldName, fieldValue) => {
        const {t} = this.props;
        let errorMessage = '';
        if (fieldName === 'IdSpecjalizacja') {
            if (!fieldValue) {
                errorMessage = `${t('validation.required')}`
            }
        }
        return errorMessage;
    }

    checkIfExist = (specjalizacjaArray, specjalizacjaID) => {
        for (let i = 0; i < specjalizacjaArray.length; i++) {
            if (specjalizacjaArray[i].IdSpecjalizacja === specjalizacjaID) {
                return true
            }
        }
        return false
    }

    render() {
        const {t} = this.props;
        const {navigate} = this.props
        const {data, idWeterynarz, specjalizacje, specjalizacje1, errors1, godzinyPracy} = this.state

        return (
            <div class="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3">
                <div class="w-full lg:w-1/6 lg:px-6 text-gray-800 leading-normal">
                    <p class="text-base font-bold py-2 text-xl lg:pb-6 text-gray-700">{t('weterynarz.detailsVet')}</p>
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
                    <section class="bg-white-100 border-b  mb-7">
                        <div class=" flex flex-wrap md:flex mb-6 mt-4">
                            <label className="block text-gray-600 font-bold md:text-left mb-3 mt-2 md:mb-0 pr-7"
                                   htmlFor="Nazwa">
                                {t('weterynarz.fields.login')}
                            </label>
                            <div class="md:w-3/5">
                                <input class="form-textarea block w-full focus:bg-white"
                                       name="Login" id="Login" type="text" value={data.Login}
                                       placeholder=""/>
                            </div>
                        </div>
                    </section>
                    <div class="flex flex-wrap -mx-3 mb-6 border-b">
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" form="grid-city">
                                {t('weterynarz.fields.firstName')}
                            </label>
                            <input
                                class=" form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name="Imie" id="Imie" type="text" value={data.Imie} placeholder=""/>
                        </div>
                        <div class="w-full md:w-1/3 px-3 mb-6 ml-8 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" form="grid-city">
                                {t('weterynarz.fields.lastName')}
                            </label>
                            <input
                                class="appearance-none form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name="Nazwisko" id="Nazwisko" type="text" value={data.Nazwisko}
                                placeholder=""/>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6 border-b">
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" form="grid-city">
                                {t('weterynarz.fields.phoneNumber')}
                            </label>
                            <input
                                class=" form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name="NumerTelefonu" id="NumerTelefonu" type="text"
                                value={data.NumerTelefonu} placeholder=""/>
                        </div>
                        <div class="w-full md:w-1/3 px-3 mb-6 ml-8 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" form="grid-city">
                                {t('weterynarz.fields.email')}
                            </label>
                            <input
                                class="appearance-none form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name="Email" id="Email" type="text" value={data.Email} placeholder=""/>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6 border-b">
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" form="grid-city">
                                {t('weterynarz.fields.birthDate')}
                            </label>
                            <input
                                class=" form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name="DataUrodzenia" id="DataUrodzenia" type="text"
                                value={getFormattedDate(data.DataUrodzenia)} placeholder=""/>

                        </div>
                        <div class="w-full md:w-1/3 px-3 mb-6 ml-8 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" form="grid-city">
                                {t('weterynarz.fields.salary')}
                            </label>
                            <input
                                class="appearance-none form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name="Pensja" id="Pensja" type="number" value={data.Pensja} placeholder=""/>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6  ">
                        <div class="w-full md:w-1/3 px-3 mb-6  md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" form="grid-city">
                                {t('weterynarz.fields.employmentDate')}
                            </label>
                            <input
                                class="appearance-none form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name="DataZatrudnienia" id="DataZatrudnienia" type="text"
                                value={getFormattedDate(data.DataZatrudnienia)} placeholder=""/>
                        </div>
                    </div>

                    <div className="flex justify-between mt-14">
                        <h2 className=" w-1/3 my-2 mb-6 text-2xl font-black leading-tight text-gray-800">
                            {t('specjalizacja.title')}</h2>
                        <div className="relative  w-1/3 ">
                            <button id="menu-toggle" onClick={() => {
                                this.showSelect()
                            }}
                                    className="absolute top-0 right-0 h-12 w-46 shadow bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                <span className="text-2xl font-bold ">+</span>
                            </button>
                        </div>
                    </div>
                    {(specjalizacje.length !== 0) &&
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                            <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
                                <thead
                                    className="text-s text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="text-center px-6 uppercase py-3">
                                        {t('specjalizacja.fields.name')}</th>
                                    <th scope="col" className="text-center px-6 uppercase py-3">
                                        {t('specjalizacja.fields.description')}</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {specjalizacje.map(x => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600"
                                        key={x.IdSpecjalizacja}>
                                        <td className="text-center px-6 py-2">{x.Nazwa}</td>
                                        <td className="text-center px-6 py-2">{x.Opis}</td>
                                        <div className="text-center list-actions py-2">
                                            <div className=" flex">
                                                <button onClick={() => {
                                                    this.deleteSpec(x.IdSpecjalizacja)
                                                }} className="list-actions-button-details flex-1">
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
                                                              d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56"
                                                              fill="none"
                                                              stroke="#000000" stroke-linecap="round"
                                                              strokeLinejoin="round" strokeWidth="16"></path>
                                                        <path className="details-icon-color"
                                                              d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56"
                                                              fill="none" stroke="#000000" stroke-linecap="round"
                                                              strokeLinejoin="round" strokeWidth="16"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    }
                    <div className=" md:flex mb-6 mt-4 hidden ">
                        <div class="md:w-full">
                            <select name="IdSpecjalizacja" id="spec-content" onChange={this.handleChange}
                                    className="form-select hidden block w-full focus:bg-white">
                                <option value="">{t('specjalizacja.selectSpecialization')}</option>
                                {
                                    specjalizacje1.map(spec => (
                                        <option
                                            className={this.checkIfExist(specjalizacje, spec.IdSpecjalizacja) === true ? "text-gray-300" : ""}
                                            value={spec.IdSpecjalizacja}>{spec.Nazwa} - {spec.Opis}</option>
                                    ))}
                            </select>
                            <span id="errorIdSpecjalizacja"
                                  className="errors-text2 mt-4">{errors1.IdSpecjalizacja}</span>
                            <div className="relative  w-full ">
                                <button id="spec-content1" onClick={() => {
                                    this.addSpec()
                                }}
                                        className="absolute hidden top-0 right-0  h-12 w-46 mt-2 shadow bg-white hover:bg-gray-300  hover:text-blue-400 focus:shadow-outline focus:outline-none text-blue-400 font-bold py-2 px-4 rounded">
                                    <span className="text-l font-bold ">+ {t('button.add')}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between mt-14">
                        <h2 className=" w-1/3 my-2 mb-6 text-2xl font-black leading-tight text-gray-800">
                            {t('godzinyPracy.title')}</h2>
                        <div className="relative  w-1/3 ">
                            <div className="absolute top-0 right-0">
                                <Link to={`/godzinyPracy/${idWeterynarz}`}>
                                    <button
                                        className=" h-12 w-46 shadow bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                        <span className="text-2xl font-bold">+</span><span
                                        className="text-l font-bold"> Zmień</span>
                                    </button>
                                </Link>

                            </div>
                        </div>
                    </div>
                    <table
                        className="w-full text-center flex flex-wrap text-gray-700 dark:text-gray-400">
                        <tr></tr>
                        <tr>
                            <th className=" mb-6  flex flex-wrap relative h-10 w-48  text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                <span
                                    className="absolute inset-0 uppercase underline">{t("harmonogram.weekdays.1")}</span>
                            </th>
                            {godzinyPracy.map(x => (
                                (x.DzienTygodnia === 1) &&
                                <td className="text-center w-full flex flex-wrap my-2 mb-10">
                                    <div className="w-full">
                                            <span className=' text-s '>
                                                {getFormattedHour(x.GodzinaRozpoczecia)} - {getFormattedHour(x.GodzinaZakonczenia)}
                                            </span>
                                    </div>
                                </td>
                            ))}
                        </tr>
                        <tr className="border-b-2 border-t-2">
                            <th className=" mb-6  flex flex-wrap relative h-10 w-48  text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                <span
                                    className="absolute inset-0 uppercase underline">{t("harmonogram.weekdays.2")}</span>
                            </th>
                            {godzinyPracy.map(x => (
                                (x.DzienTygodnia === 2) &&
                                <td className="text-center w-full flex flex-wrap my-2 mb-10">
                                    <div className="w-full">
                                            <span className=' text-s '>
                                                {getFormattedHour(x.GodzinaRozpoczecia)} - {getFormattedHour(x.GodzinaZakonczenia)}
                                            </span>
                                    </div>
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <th className=" mb-6  flex flex-wrap relative h-10 w-48  text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                <span
                                    className="absolute inset-0 uppercase underline">{t("harmonogram.weekdays.3")}</span>
                            </th>
                            {godzinyPracy.map(x => (
                                (x.DzienTygodnia === 3) &&
                                <td className="text-center w-full flex flex-wrap my-2 mb-10">
                                    <div className="w-full">
                                            <span className=' text-s '>
                                                {getFormattedHour(x.GodzinaRozpoczecia)} - {getFormattedHour(x.GodzinaZakonczenia)}
                                            </span>
                                    </div>
                                </td>
                            ))}
                        </tr>
                        <tr className="border-b-2 border-t-2">
                            <th className=" mb-6  flex flex-wrap relative h-10 w-48  text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                <span
                                    className="absolute inset-0 uppercase underline">{t("harmonogram.weekdays.4")}</span>
                            </th>
                            {godzinyPracy.map(x => (
                                (x.DzienTygodnia === 4) &&
                                <td className="text-center w-full flex flex-wrap my-2 mb-10">
                                    <div className="w-full">
                                            <span className=' text-s '>
                                                {getFormattedHour(x.GodzinaRozpoczecia)} - {getFormattedHour(x.GodzinaZakonczenia)}
                                            </span>
                                    </div>
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <th className=" mb-6  flex flex-wrap relative h-10 w-48  text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                <span
                                    className="absolute inset-0 uppercase underline">{t("harmonogram.weekdays.5")}</span>
                            </th>
                            {godzinyPracy.map(x => (
                                (x.DzienTygodnia === 5) &&
                                <td className="text-center w-full flex flex-wrap my-2 mb-10">
                                    <div className="w-full">
                                            <span className=' text-s '>
                                                {getFormattedHour(x.GodzinaRozpoczecia)} - {getFormattedHour(x.GodzinaZakonczenia)}
                                            </span>
                                    </div>
                                </td>
                            ))}
                        </tr>
                        <tr className="border-2">
                            <th className=" mb-6  flex flex-wrap relative h-10 w-48  text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                <span
                                    className="absolute inset-0 uppercase underline">{t("harmonogram.weekdays.6")}</span>
                            </th>
                            <td className="text-center w-full flex flex-wrap my-2 mb-10">
                                <div className="w-full">
                                    {godzinyPracy.map(x => (
                                        (x.DzienTygodnia === 6) &&
                                        <span className=' text-s '>
                                                {getFormattedHour(x.GodzinaRozpoczecia)} - {getFormattedHour(x.GodzinaZakonczenia)}
                                        </span>))}
                                </div>
                            </td>
                        </tr>
                    </table>

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

export default withTranslation()(withNavigate(withRouter(SzczegolyWeterynarza)));