import React from "react";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {getUslugaList, getUslugaWizytaList} from "../../../axios/UslugaAxiosCalls";
import FormularzWizytaMenu from "../../fragments/FormularzWizytaMenu";
import {addUslugaWizyta, deleteUslugaWizyta} from "../../../axios/WizytaUslugaAxionCalls";
import axios from "axios";
import {getWizytaDetails} from "../../../axios/WizytaAxiosCalls";

let CancelToken
let source

class Uslugi extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdWizyta = this.props.params.IdWizyta
        this.state = {
            idWizyta: paramsIdWizyta,
            message: '',
            uslugi: [],
            uslugiWizyta: [],
            data: {
                IdUsluga: '',
            },
            errors: {
                IdUsluga: '',
            },
            czyZaakceptowanaCena: ''
        }
    }

    fetchUslugi = async () => {
        try {
            await getUslugaWizytaList(this.state.idWizyta, source).then((res) => {
                if (res) {
                    this.setState({
                        isLoaded: true,
                        uslugiWizyta: res.data
                    });
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    fetchWizyta = async () => {
        await getWizytaDetails(this.state.idWizyta, source).then((res) => {
            if (res) {
                this.setState({
                    isLoaded: true,
                    czyZaakceptowanaCena: res.data.CzyZaakceptowanaCena
                });
            }
        })
    }

    componentDidMount() {
        CancelToken = axios.CancelToken;
        source = CancelToken.source();
        this.fetchUslugi()
        this.fetchWizyta()
    }

    async showSelect() {
        if (this.state.uslugi.length === 0) {
            try {
                await getUslugaList(source).then((res) => {
                    if (res) {
                        this.setState({
                            isLoaded: true,
                            uslugi: res.data
                        });
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }

        var helpDiv = document.getElementById("spec-content");
        var helpDiv1 = document.getElementById("spec-content1");

        if (helpDiv.classList.contains("hidden")) {
            helpDiv.classList.remove("hidden");
            helpDiv1.classList.remove("hidden");

        } else {
            helpDiv.classList.add("hidden");
            helpDiv1.classList.add("hidden");

            const data = {...this.state.data}
            data['IdUsluga'] = null
            this.setState({
                data: data,
            })
            const errors = {...this.state.errors}
            errors['IdUsluga'] = ''
            this.setState({
                errors: errors,
            })
        }
    }

    componentWillUnmount() {
        if (source) {
            source.cancel('Operation canceled by the user.');
        }
    }

    deleteUsluga = async (idUsluga) => {
        const {navigate} = this.props;
        try {
            await deleteUslugaWizyta(this.state.idWizyta, idUsluga, source)
            await navigate(0, {replace: true});
        } catch (error) {
            console.log(error)
        }
    }

    addUsluga = async () => {
        const {navigate} = this.props;
        if (this.state.data.IdUsluga !== '') {
            try {
                await addUslugaWizyta(this.state.idWizyta, this.state.data.IdUsluga, source)
                await navigate(0, {replace: true});
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
        if (fieldName === 'IdUsluga') {
            if (!fieldValue) {
                errorMessage = `${t('validation.required')}`
            }
        }
        return errorMessage;
    }

    checkIfExist = (uslugaArray, uslugaID) => {
        for (let i = 0; i < uslugaArray.length; i++) {
            if (uslugaArray[i].ID_Usluga === uslugaID) {
                return true
            }
        }
        return false
    }

    render() {
        const {uslugi, uslugiWizyta, idWizyta, data, errors, czyZaakceptowanaCena} = this.state
        const {t} = this.props;

        return (
            <div className="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3 mb-3">
                <div className="w-full lg:w-1/6 lg:px-6 text-gray-800 leading-normal">
                    <FormularzWizytaMenu idWizyta={idWizyta}/>
                </div>
                <div
                    className="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                    <div>
                        <div className="flex justify-between mt-6">
                            <h2 className=" w-1/3 my-2 mb-6 text-2xl  font-black leading-tight text-gray-800">
                                {t('usluga.title')}</h2>
                            {!czyZaakceptowanaCena &&
                                <div className="relative  w-1/3 ">
                                    <button id="menu-toggle" onClick={() => {
                                        this.showSelect()
                                    }}
                                            className="absolute  top-0 right-0  h-12 w-46  shadow-xl bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                        <span className="text-2xl font-bold ">+</span>
                                    </button>
                                </div>
                            }
                        </div>
                        {(uslugiWizyta.length !== 0) &&
                            <div className="relative overflow-x-auto shadow-xl sm:rounded-lg ">
                                <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
                                    <thead
                                        className="text-s text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 uppercase py-3 text-center">
                                            {t("usluga.fields.name")}</th>
                                        <th scope="col" className="px-6 uppercase py-3 text-center">
                                            {t("usluga.fields.narcosis")}</th>
                                        <th scope="col" className="px-6 uppercase py-3 text-center">
                                            {t("usluga.fields.price")}</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {uslugiWizyta.map(x => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600"
                                            key={x.ID_Usluga}>
                                            <td className="px-6 py-2 text-center">{x.NazwaUslugi} </td>
                                            <td className="px-6 py-2 text-center">{x.Narkoza === false ? t("other.no") : t("other.yes")} </td>
                                            <td className="px-6 py-2 text-center">{x.Cena}</td>
                                            <div className="text-center py-2 px-2">
                                                {!czyZaakceptowanaCena && <div className=" flex">
                                                    <button onClick={() => {
                                                        this.deleteUsluga(x.ID_Usluga)
                                                    }} className="flex-1">
                                                        <svg className="list-actions-button-delete flex-1"
                                                             xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                             fill="#000000" viewBox="0 0 256 256">
                                                            <rect width="256" height="256" fill="none"></rect>
                                                            <line className="details-icon-color" x1="215.99609" y1="56"
                                                                  x2="39.99609" y2="56.00005" fill="none"
                                                                  stroke="#000000"
                                                                  stroke-linecap="round" strokeLinejoin="round"
                                                                  strokeWidth="16"></line>
                                                            <line className="details-icon-color" x1="104" y1="104"
                                                                  x2="104"
                                                                  y2="168"
                                                                  fill="none" stroke="#000000" stroke-linecap="round"
                                                                  strokeLinejoin="round" strokeWidth="16"></line>
                                                            <line className="details-icon-color" x1="152" y1="104"
                                                                  x2="152"
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
                                                }
                                            </div>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        }
                        <div className=" md:flex mb-6 mt-4 hidden ">
                            <div className="md:w-full">
                                <select name="IdUsluga" id="spec-content" onChange={this.handleChange}
                                        className="form-select hidden block w-full focus:bg-white">
                                    <option value="">{t('usluga.selectService')}</option>
                                    {
                                        uslugi.map(usluga => (
                                            <option selected={usluga.ID_Usluga === data.IdUsluga}
                                                    className={this.checkIfExist(uslugiWizyta, usluga.ID_Usluga) === true ? "text-gray-300" : ""}
                                                    value={usluga.ID_Usluga}> {usluga.NazwaUslugi}</option>
                                        ))}
                                </select>
                                <span id="errorIdChoroba"
                                      className="errors-text2 mt-4">{errors.IdUsluga}</span>
                                <div className="relative  w-full pb-4 ">
                                    <button id="spec-content1" onClick={() => {
                                        this.addUsluga()
                                    }}
                                            className=" absolute hidden top-0 right-0  h-12 w-46  shadow-lg bg-white hover:bg-gray-300  hover:text-blue-400 focus:shadow-outline focus:outline-none text-blue-400 font-bold py-2 px-4 rounded">
                                        <span className="text-l font-bold ">+ {t('button.add')}</span>
                                    </button>
                                </div>
                            </div>
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


export default withTranslation()(withNavigate(withRouter(Uslugi)));