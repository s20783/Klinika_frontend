import React from "react";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {addVisitDisease, deleteVisitDisease, getVisitDiseaseList} from "../../../axios/VisitDiseaseApiCalls";
import {getAllDiseases} from "../../../axios/DiseaseApiCalls";
import VisitFormMenu from "../VisitFormMenu";
import { getOnlyMedicamentList} from "../../../axios/MedicamentApiCalls";
import {addVisitMedicament, deleteVisitMedicament, getVisitMedicamentList} from "../../../axios/VisitMedicamentApiCalls";
import {checkNumberRange} from "../../../helpers/CheckNRange";
import axios from "axios";
let CancelToken
let source

class VisitMedicamentDiseaseList extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdWizyta = this.props.params.IdWizyta
        this.state = {
            idWizyta: paramsIdWizyta,
            choroby: [],
            chorobyWizyta: [],
            leki: [],
            lekiWizyta: [],
            data: {
                IdChoroba: '',
                IdLek: '',
                Ilosc: ''
            },
            errors: {
                IdChoroba: '',
                IdLek: '',
                Ilosc: ''
            }
        }
    }

    fetchDiseases = async () => {
        try {
            await getVisitDiseaseList(this.state.idWizyta, source).then((res) => {
                if (res) {
                    this.setState({
                        isLoaded: true,
                        chorobyWizyta: res.data
                    });
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    fetchMedicaments = async () => {
        try {
            await getVisitMedicamentList(this.state.idWizyta, source).then((res) => {
                if (res) {
                    this.setState({
                        isLoaded: true,
                        lekiWizyta: res.data
                    });
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        CancelToken = axios.CancelToken;
        source = CancelToken.source();
        this.fetchDiseases()
        this.fetchMedicaments()
    }

    componentWillUnmount() {
        if (source) {
            source.cancel('Operation canceled by the user.');
        }
    }

    async showSelect(x) {
        var helpDiv, helpDiv1, helpDiv2
        var name, name1
        if (x === 1) {
            if (this.state.choroby.length === 0) {
                try {
                    await getAllDiseases(source).then((res) => {
                        if (res) {
                            this.setState({
                                isLoaded: true,
                                choroby: res.data
                            });
                        }
                    })
                } catch (error) {
                    console.log(error)
                }
            }

            helpDiv = document.getElementById("spec-content");
            helpDiv1 = document.getElementById("spec-content1");
            name = 'IdChoroba'
        } else {
            if (this.state.leki.length === 0) {
                try {
                    await getOnlyMedicamentList(source).then((res) => {
                        if (res) {
                            this.setState({
                                isLoaded: true,
                                leki: res.data
                            });
                        }
                    })
                } catch (error) {
                    console.log(error)
                }
            }

            helpDiv = document.getElementById("spec-content2");
            helpDiv1 = document.getElementById("spec-content3");
            helpDiv2 = document.getElementById("spec-content4");
            name = 'IdLek'
            name1 = 'Ilosc'
        }

        if (helpDiv.classList.contains("hidden")) {
            helpDiv.classList.remove("hidden");
            helpDiv1.classList.remove("hidden");
            helpDiv2.classList.remove("hidden");
        } else {
            helpDiv.classList.add("hidden");
            helpDiv1.classList.add("hidden");
            helpDiv2.classList.add("hidden");

            const data = {...this.state.data}
            data[name] = ''
            data[name1] = ''
            this.setState({
                data: data,
            })
            const errors = {...this.state.errors}
            errors[name] = ''
            errors[name1] = ''
            this.setState({
                errors: errors,
            })
        }
    }

    deleteDisease = async (idChoroba) => {
        const {navigate} = this.props;
        try {
            await deleteVisitDisease(this.state.idWizyta, idChoroba, source)
            navigate(0, {replace: true});
        } catch (error) {
            console.log(error)
        }
    }

    addDisease = async () => {
        const {navigate} = this.props;
        if (this.state.data.IdChoroba !== '') {
            try {
                await addVisitDisease(this.state.idWizyta, this.state.data.IdChoroba, source)
                navigate(0, {replace: true});
            } catch (error) {
                console.log(error)
            }
        }
    }

    deleteMedicament = async (idLek) => {
        const {navigate} = this.props;
        try {
            await deleteVisitMedicament(this.state.idWizyta, idLek, source)
            navigate(0, {replace: true});
        } catch (error) {
            console.log(error)
        }
    }

    addMedicament = async () => {
        const {t} = this.props;
        const {navigate} = this.props;
        const errors = {...this.state.errors}

        if (this.state.data.IdLek === '') {
            errors['IdLek'] = t('validation.required')
        }
        if (this.state.data.Ilosc === '') {
            errors['Ilosc'] = t('validation.required')
        }
        this.setState({
            errors: errors,
        })
        if (!this.hasErrors()) {
            try {
                await addVisitMedicament(this.state.idWizyta, this.state.data.IdLek, this.state.data.Ilosc, source)
                navigate(0, {replace: true});
            } catch (error) {
                console.log(error)
            }
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
        if (fieldName === 'IdChoroba') {
            if (!fieldValue) {
                errorMessage = `${t('validation.required')}`
            }
        }
        if (fieldName === 'IdLek') {
            if (!fieldValue) {
                errorMessage = `${t('validation.required')}`
            }
        }
        if (fieldName === 'Ilosc') {
            if (!checkNumberRange(fieldValue,0,999)) {
                errorMessage =  t('validation.quantity')
            }
            if (!fieldValue) {
                errorMessage = `${t('validation.required')}`
            }
        }
        return errorMessage;
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

    checkIfExistChoroba = (chorobaArray, chorobaID) => {
        for (let i = 0; i < chorobaArray.length; i++) {
            if (chorobaArray[i].ID_Choroba === chorobaID) {
                return true
            }
        }
        return false
    }

    checkIfExistLek = (lekArray, lekID) => {
        for (let i = 0; i < lekArray.length; i++) {
            if (lekArray[i].IdLek === lekID) {
                return true
            }
        }
        return false
    }

    render() {
        const {leki, lekiWizyta, choroby, chorobyWizyta, idWizyta, data, errors} = this.state
        const {t} = this.props;

        return (
            <div className="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3 mb-3">
                <div className="w-full lg:w-1/6 lg:px-6 text-gray-800 leading-normal">
                    <VisitFormMenu idWizyta={idWizyta}/>
                </div>
                <div
                    className="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 rounded">
                    <div className="flex justify-between mt-6">
                        <h2 className=" w-1/3 my-2  mb-6 text-xl font-black leading-tight text-gray-600">
                            {t('choroba.title')}</h2>
                        <div className="relative  w-1/3 ">
                            <button id="menu-toggle" onClick={() => {
                                this.showSelect(1)
                            }}
                                    className="absolute  top-0 right-0  h-12 w-46  shadow-xl bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                <span className="text-2xl font-bold ">+</span>
                            </button>
                        </div>
                    </div>
                    {(chorobyWizyta.length !== 0) &&
                        <div className="overflow-x-auto shadow-lg sm:rounded-lg">
                            <table
                                className="w-full text-xs sm:text-sm md:text-base text-left text-gray-700 dark:text-gray-400">
                                <thead
                                    className="text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col"
                                        className="text-center px-1 md:px-6 py-3">{t('choroba.fields.name')}</th>
                                    <th scope="col"
                                        className="text-center px-1 md:px-6 py-3">{t('choroba.fields.description')}</th>
                                    <th scope="col" className="text-center px-1 md:px-6 py-3"/>
                                </tr>
                                </thead>
                                <tbody>
                                {chorobyWizyta.map(x => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600 text-center"
                                        key={x.ID_Choroba}>
                                        <td className="px-1 md:px-6 py-2">{x.Nazwa}</td>
                                        <td className="px-1 md:px-6 py-2">{x.Opis}</td>
                                        <td className="px-1 md:px-6 py-2">
                                            <div className="flex justify-center">
                                                <button onClick={() => {
                                                    this.deleteDisease(x.ID_Choroba)
                                                }} className="flex-1">
                                                    <svg className="flex-1"
                                                         xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                         fill="#000000" viewBox="0 0 256 256">
                                                        <rect width="256" height="256" fill="none"></rect>
                                                        <line className="details-icon-color" x1="215.99609" y1="56"
                                                              x2="39.99609" y2="56.00005" fill="none"
                                                              stroke="#000000"
                                                              strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth="16"></line>
                                                        <line className="details-icon-color" x1="104" y1="104"
                                                              x2="104"
                                                              y2="168"
                                                              fill="none" stroke="#000000" strokeLinecap="round"
                                                              strokeLinejoin="round" strokeWidth="16"></line>
                                                        <line className="details-icon-color" x1="152" y1="104"
                                                              x2="152"
                                                              y2="168"
                                                              fill="none" stroke="#000000" strokeLinecap="round"
                                                              strokeLinejoin="round" strokeWidth="16"></line>
                                                        <path className="details-icon-color"
                                                              d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56"
                                                              fill="none"
                                                              stroke="#000000" strokeLinecap="round"
                                                              strokeLinejoin="round" strokeWidth="16"></path>
                                                        <path className="details-icon-color"
                                                              d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56"
                                                              fill="none" stroke="#000000" strokeLinecap="round"
                                                              strokeLinejoin="round" strokeWidth="16"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    }
                    <div className=" md:flex mb-6 mt-4 hidden ">
                        <div className="md:w-full">
                            <select name="IdChoroba" id="spec-content" onChange={this.handleChange}
                                    className="form-select hidden block w-full focus:bg-white">
                                <option value="">{t('choroba.selectDisease')}</option>
                                {
                                    choroby.map(choroba => (
                                        <option selected={choroba.ID_Choroba === data.IdChoroba}
                                                className={this.checkIfExistChoroba(chorobyWizyta, choroba.ID_Choroba) === true ? "text-gray-300" : ""}
                                                value={choroba.ID_Choroba}> {choroba.Nazwa}</option>
                                    ))}
                            </select>
                            <span id="errorIdChoroba"
                                  className="errors-text2 mt-4">{errors.IdChoroba}</span>
                            <div className="relative  w-full pb-4 ">
                                <button id="spec-content1" onClick={() => {
                                    this.addDisease()
                                }}
                                        className=" absolute hidden top-0 right-0  h-12 w-46  shadow-lg bg-white hover:bg-gray-300  hover:text-blue-400 focus:shadow-outline focus:outline-none text-blue-400 font-bold py-2 px-4 rounded">
                                    <span className="text-l font-bold ">+ {t('button.add')}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between mt-12">
                        <h2 className=" w-1/3 my-2  mb-6 text-xl font-black leading-tight text-gray-600">
                            {t('lek.title')}</h2>
                        <div className="relative  w-1/3 ">
                            <button id="menu-toggle" onClick={() => {
                                this.showSelect(2)
                            }}
                                    className="absolute  top-0 right-0  h-12 w-46  shadow-xl bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                <span className="text-2xl font-bold ">+</span>
                            </button>
                        </div>
                    </div>
                    {(lekiWizyta.length !== 0) &&
                        <div className="overflow-x-auto shadow-lg sm:rounded-lg">
                            <table className="w-full text-xs sm:text-sm md:text-base text-left text-gray-700 dark:text-gray-400">
                                <thead className="text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className=" text-center px-6 uppercase py-3">{t('lek.fields.name')}</th>
                                    <th className=" text-center px-6 uppercase py-3">{t('lek.fields.quantity')}</th>
                                    <th className=" text-center px-6 uppercase py-3">{t('lek.fields.unitOfMeasure')}</th>
                                    <th className=" text-center px-6 uppercase py-3"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {lekiWizyta.map(x => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600"
                                        key={x.IdLek}>
                                        <td className=" px-8 py-2 text-center">{x.Nazwa} </td>
                                        <td className=" px-8 py-2 text-center">{x.Ilosc}</td>
                                        <td className=" px-8 py-2 text-center">{x.JednostkaMiary}</td>
                                        <div className="text-center py-2">
                                            <div className=" flex">
                                                <button onClick={() => {
                                                    this.deleteMedicament(x.IdLek)
                                                }} className="flex-1">
                                                    <svg className="flex-1"
                                                         xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                         fill="#000000" viewBox="0 0 256 256">
                                                        <rect width="256" height="256" fill="none"></rect>
                                                        <line className="details-icon-color" x1="215.99609" y1="56"
                                                              x2="39.99609" y2="56.00005" fill="none"
                                                              stroke="#000000"
                                                              strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth="16"></line>
                                                        <line className="details-icon-color" x1="104" y1="104"
                                                              x2="104"
                                                              y2="168"
                                                              fill="none" stroke="#000000" strokeLinecap="round"
                                                              strokeLinejoin="round" strokeWidth="16"></line>
                                                        <line className="details-icon-color" x1="152" y1="104"
                                                              x2="152"
                                                              y2="168"
                                                              fill="none" stroke="#000000" strokeLinecap="round"
                                                              strokeLinejoin="round" strokeWidth="16"></line>
                                                        <path className="details-icon-color"
                                                              d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56"
                                                              fill="none"
                                                              stroke="#000000" strokeLinecap="round"
                                                              strokeLinejoin="round" strokeWidth="16"></path>
                                                        <path className="details-icon-color"
                                                              d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56"
                                                              fill="none" stroke="#000000" strokeLinecap="round"
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
                    <div className="flex flex-wrap -mx-3 mb-6 mt-6 ">
                        <div className="w-full md:w-4/6 px-3 mb-6 md:mb-0">
                            <select name="IdLek" id="spec-content2" onChange={this.handleChange}
                                    className="shadow-xl form-select hidden w-full focus:bg-white">
                                <option value="">{t('lek.selectMedicine')}</option>
                                {
                                    leki.map(lek => (
                                        <option selected={data.IdLek === lek.IdLek}
                                                className= {this.checkIfExistLek(lekiWizyta, lek.IdLek) === true ? "text-gray-300" : ""}
                                                value={lek.IdLek}>{lek.Nazwa} ({lek.JednostkaMiary})</option>
                                    ))}
                            </select>
                            <span id="errorGatunek" className="errors-text2  ">{errors.IdLek}</span>
                        </div>

                        <div className="w-full md:w-1/6 px-3   ml-10">
                            <input
                                className="shadow-xl form-textarea hidden appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:border-blue-600 "
                                name="Ilosc" id="spec-content3" type="number" value={data.Ilosc} placeholder="Ilość"
                                onChange={this.handleChange}/>
                            <span id="errorIlosc" className=" errors-text2 text-sm  ">{errors.Ilosc}</span>

                        </div>
                    </div>

                    <div className="relative w-full pb-4 ">
                        <button id="spec-content4" onClick={() => {
                            this.addMedicament()
                        }}
                                className=" absolute hidden bottom-12 right-2  h-12 w-46  shadow-lg bg-white hover:bg-gray-300  hover:text-blue-400 focus:shadow-outline focus:outline-none text-blue-400 font-bold py-2 px-4 rounded">
                            <span className="text-l font-bold ">+ {t('button.add')}</span>
                        </button>
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


export default withTranslation()(withNavigate(withRouter(VisitMedicamentDiseaseList)));