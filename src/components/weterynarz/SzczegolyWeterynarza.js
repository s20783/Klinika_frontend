import React from "react";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import { getWeterynarzDetails} from "../../axios/WeterynarzAxionCalls";
import {
    addWeterynarzSpecjalizacja,
    deleteWeterynarzSpecjalizacja,
} from "../../axios/WeterynarzSpecjalizajcaAziosCalls";

import {getSpecjalizacjaList} from "../../axios/SpecjalizacjaAxiosCalls";
import {getFormattedDate} from "../other/dateFormat";
import {Link} from "react-router-dom";
import SzczegolyVetMenu from "../fragments/SzczegolyVetMenu";
import {getWeterynarzSpecjalizacjaList} from "../../axios/WeterynarzSpecjalizajcaAziosCalls";
import axios from "axios";
import {getChorobaList} from "../../axios/ChorobaAxiosCalls";
let CancelToken
let source
class SzczegolyWeterynarza extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdWeterynarz = this.props.params.IdOsoba
        this.state = {
            data: '',
            specjalizacje: [],
            specjalizacje1: [],
            data1: {
                IdSpecjalizacja: '',
            },
            errors1: {
                IdSpecjalizacja: '',
            },
            godzinyPracy: [],
            idWeterynarz: paramsIdWeterynarz,
            error: '',
            isLoaded: false,
            notice: '',
            urlopy: []

        }
    }

    async componentDidMount() {
        CancelToken = axios.CancelToken;
        source = CancelToken.source();

        try {
            await getWeterynarzDetails(this.state.idWeterynarz, source).then((res) => {
                if (res) {
                    console.log(res.data)
                    this.setState({
                        isLoaded: true,
                        data: res.data
                    });
                }
            })
            await getWeterynarzSpecjalizacjaList(this.state.idWeterynarz, source).then((res) => {
                if (res) {
                    console.log(res.data)
                    this.setState({
                        isLoaded: true,
                        specjalizacje: res.data
                    });
                }
            })
        } catch (e) {
            console.log(e)
        }
    }
    componentWillUnmount() {
        if (source) {
            source.cancel('Operation canceled by the user.');
        }
    }
    async showSelect() {
        if (this.state.specjalizacje1.length === 0) {
            try {

                await getSpecjalizacjaList(source).then((res) => {
                    if (res) {
                        console.log(res.data)
                        this.setState({
                            isLoaded: true,
                            specjalizacje1: res.data
                        });
                    }
                })
            } catch (error) {
                console.log(error)
            }
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
            data['IdSpecjalizacja'] = ''
            this.setState({
                data1: data,
            })

            const errors = {...this.state.errors1}
            errors['IdSpecjalizacja'] = ''
            this.setState({
                errors1: errors,
            })
        }

    }

    deleteSpec = async (idSpec) => {

        const {navigate} = this.props;
        try {
            await deleteWeterynarzSpecjalizacja(idSpec, this.state.idWeterynarz, source)
            await navigate(0, {replace: true});
        } catch (error) {
            console.log(error)
        }
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
    validateForm = () => {
        const data = this.state.data1
        const errors = this.state.errors1

        for (const fieldName in data) {
            const fieldValue = data[fieldName]
            errors[fieldName] = this.validateField(fieldName, fieldValue)
        }

        this.setState({
            errors1: errors
        })
        return !this.hasErrors();
    }

    hasErrors = () => {
        const errors = this.state.errors1
        console.log(errors)
        for (const errorField in this.state.errors1) {
            if (errors[errorField].length > 0) {
                return true
            }
        }
        return false
    }

    addSpec = async () => {
        const {navigate} = this.props;
        const isValid = this.validateForm()

        if (isValid) {

            try {
                await addWeterynarzSpecjalizacja(this.state.data1.IdSpecjalizacja, this.state.idWeterynarz,source)
                await navigate(0, {replace: true});
            } catch (error) {
                console.log(error)
            }

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
        const {data, idWeterynarz, specjalizacje, specjalizacje1, data1, errors1} = this.state

        return (
            <div class="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3 mb-3">
                <div className="w-full lg:w-1/6 xs:px-6 text-xl text-gray-800 leading-normal">
                    <SzczegolyVetMenu idVet={idWeterynarz}/>
                </div>
                <div
                    className="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                    <div class="flex flex-wrap -mx-3 mb-6 border-b">
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" form="grid-city">
                                {t('weterynarz.fields.firstName')}
                            </label>
                            <input
                                class="shadow-xl form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                disabled name="Imie" id="Imie" type="text" value={data.Imie} placeholder=""/>
                        </div>
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 md:ml-8">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" form="grid-city">
                                {t('weterynarz.fields.lastName')}
                            </label>
                            <input
                                class="shadow-xl appearance-none form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-6 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name="Nazwisko" id="Nazwisko" type="text" value={data.Nazwisko}
                                disabled placeholder=""/>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6 border-b">
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" form="grid-city">
                                {t('weterynarz.fields.phoneNumber')}
                            </label>
                            <input
                                class="shadow-xl form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name="NumerTelefonu" id="NumerTelefonu" type="text"
                                disabled value={data.NumerTelefonu} placeholder=""/>
                        </div>
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 md:ml-8">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" form="grid-city">
                                {t('weterynarz.fields.email')}
                            </label>
                            <input
                                class="shadow-xl appearance-none form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-6 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                disabled name="Email" id="Email" type="text" value={data.Email} placeholder=""/>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6 border-b">
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" form="grid-city">
                                {t('weterynarz.fields.birthDate')}
                            </label>
                            <input
                                class="shadow-xl form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name="DataUrodzenia" id="DataUrodzenia" type="text"
                                disabled value={getFormattedDate(data.DataUrodzenia)} placeholder=""/>

                        </div>
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 md:ml-8">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" form="grid-city">
                                {t('weterynarz.fields.salary')}
                            </label>
                            <input
                                class="shadow-xl appearance-none form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-6 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                disabled name="Pensja" id="Pensja" type="number" value={data.Pensja} placeholder=""/>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6  ">
                        <div class="w-full md:w-1/3 px-3 mb-6  md:mb-0">
                            <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" form="grid-city">
                                {t('weterynarz.fields.employmentDate')}
                            </label>
                            <input
                                class="shadow-xl appearance-none form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name="DataZatrudnienia" id="DataZatrudnienia" type="text"
                                disabled value={getFormattedDate(data.DataZatrudnienia)} placeholder=""/>
                        </div>
                    </div>

                    <div className="flex justify-between mt-14">
                        <h2 className=" w-1/3 my-2 mb-6 text-2xl font-black leading-tight text-gray-800">
                            {t('specjalizacja.title')}</h2>
                        <div className="relative  w-1/3 ">
                            <button id="menu-toggle" onClick={() => {
                                this.showSelect()
                            }}
                                    className="shadow-xl absolute top-0 right-0 h-12 w-46 shadow bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                <span className="text-2xl font-bold ">+</span>
                            </button>
                        </div>
                    </div>
                    {(specjalizacje.length !== 0) &&
                        <div className="relative overflow-x-auto shadow-xl sm:rounded-lg ">
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
                    <div className="flex flex-wrap mb-6 mt-4  ">
                        <div class="w-full">
                            <select name="IdSpecjalizacja" id="spec-content" onChange={this.handleChange}
                                    className="form-select hidden block w-full focus:bg-white">
                                <option value="" >{t('specjalizacja.selectSpecialization')}</option>
                                {
                                    specjalizacje1.map(spec => (
                                        <option
                                            className={this.checkIfExist(specjalizacje, spec.IdSpecjalizacja) === true ? "text-gray-300" : ""}
                                            selected={data1.IdSpecjalizacja === spec.IdSpecjalizacja}
                                            value={spec.IdSpecjalizacja}>{spec.Nazwa} - {spec.Opis}</option>
                                    ))}
                            </select>
                            <span id="errorIdSpecjalizacja"
                                  className="errors-text2 mt-4">{errors1.IdSpecjalizacja}</span>
                            <div className="relative  w-full ">
                                <button id="spec-content1" onClick={() => {
                                    this.addSpec()
                                }}
                                        className="absolute hidden top-0 right-0  h-12 w-46 mt-2 shadow-xl bg-white hover:bg-gray-300  hover:text-blue-400 focus:shadow-outline focus:outline-none text-blue-400 font-bold py-2 px-4 rounded">
                                    <span className="text-l font-bold ">+ {t('button.add')}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className=" md:flex mb-6 mt-8 ">
                        <div className="flex pb-3">
                            <Link to={`/weterynarze`}>
                                <button
                                    className="shadow-xl bg-red-500 hover:bg-white  hover:text-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                    type="button">
                                    {t("button.back")}
                                </button>
                            </Link>
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