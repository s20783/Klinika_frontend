import React from "react";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {addChorobaWizyta, deleteChorobaWizyta, getChorobaWizytaList} from "../../../axios/WizytaChorobaAxiosCalls";
import {getChorobaList} from "../../../axios/ChorobaAxiosCalls";
import FormularzWizytaMenu from "../../fragments/FormularzWizytaMenu";
import { getOnlyLekList} from "../../../axios/LekAxiosCalls";
import {addLekWizyta, deleteLekWizyta, getLekWizytaList} from "../../../axios/WizytaLekAxiosCalls";
import {checkNumberRange} from "../../helpers/CheckNRange";

class LekiChoroby extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdWizyta = this.props.params.IdWizyta
        this.state = {
            idWizyta: paramsIdWizyta,
            message: '',
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


    fetchChoroby = async () => {
        try {
            const res = await getChorobaWizytaList(this.state.idWizyta)
            var data = await res.data

            console.log(data)
            this.setState({
                isLoaded: true,
                chorobyWizyta: data
            });
        } catch (error) {
            console.log(error)
        }
    }

    fetchLeki = async () => {
        try {
            const res = await getLekWizytaList(this.state.idWizyta)
            var data = await res.data

            console.log(data)
            this.setState({
                isLoaded: true,
                lekiWizyta: data
            });
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.fetchChoroby()
        this.fetchLeki()


    }

    async showSelect(x) {
        var helpDiv, helpDiv1, helpDiv2
        var name, name1
        if (x === 1) {
            if (this.state.choroby.length === 0) {
                try {
                    const res = await getChorobaList()
                    const data = await res.data
                    console.log(data)
                    this.setState({
                        isLoaded: true,
                        choroby: data
                    });
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
                    const res = await getOnlyLekList()
                    const data = await res.data
                    console.log(data)
                    this.setState({
                        isLoaded: true,
                        leki: data
                    });
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

    deleteChoroba = async (idChoroba) => {

        const {navigate} = this.props;
        try {
            await deleteChorobaWizyta(this.state.idWizyta, idChoroba)
            await navigate(0, {replace: true});
        } catch (error) {
            console.log(error)
        }
    }

    addChoroba = async () => {
        const {navigate} = this.props;
        if (this.state.data.IdChoroba !== '') {

            try {
                await addChorobaWizyta(this.state.idWizyta, this.state.data.IdChoroba)
                await navigate(0, {replace: true});
            } catch (error) {
                console.log(error)
            }

        }
    }
    deleteLek = async (idLek) => {

        const {navigate} = this.props;
        try {
            await deleteLekWizyta(this.state.idWizyta, idLek)
            await navigate(0, {replace: true});
        } catch (error) {
            console.log(error)
        }
    }

    addLek = async () => {
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
                await addLekWizyta(this.state.idWizyta, this.state.data.IdLek, this.state.data.Ilosc)
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
            console.log(this.state.data.Ilosc +" "+checkNumberRange(this.state.data.Ilosc,1,99))
            if (!checkNumberRange(this.state.data.Ilosc,1,99) ) {
                errorMessage =  `Pole powinno być liczbą z przedziału od 0 do 1000.`
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
            <div class="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3 mb-3">
                <div class="w-full lg:w-1/6 lg:px-6 text-gray-800 leading-normal">
                    <FormularzWizytaMenu idWizyta={idWizyta}/>

                </div>
                <div
                    className="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">

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
                    <div className="relative overflow-x-auto  shadow-xl sm:rounded-lg ">
                        <table className="w-full shadow-xl text-sm text-left text-gray-700 dark:text-gray-400">
                            <thead
                                className="text-s text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {chorobyWizyta.map(x => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600"
                                    key={x.ID_Choroba}>
                                    <td className=" px-8 py-2 ">• {x.Nazwa}</td>
                                    <div className="text-center list-actions py-2">
                                        <div className=" flex">
                                            <button onClick={() => {
                                                this.deleteChoroba(x.ID_Choroba)
                                            }} className="list-actions-button-details flex-1">
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
                                    </div>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
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
                                    this.addChoroba()
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
                        <div className="relative overflow-x-auto  shadow-xl sm:rounded-lg ">
                            <table className="w-full shadow-xl text-sm text-left text-gray-700 dark:text-gray-400">
                                <thead
                                    className="text-s text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className=" text-center px-6 uppercase py-3">{t('lek.fields.name')}</th>
                                    <th className=" text-center px-6 uppercase py-3">{t('lek.fields.quantity')}</th>
                                    <th className=" text-center px-6 uppercase py-3"></th>

                                </tr>
                                </thead>
                                <tbody>
                                {lekiWizyta.map(x => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600"
                                        key={x.IdLek}>
                                        <td className=" px-8 py-2 text-center">{x.Nazwa} </td>
                                        <td className=" px-8 py-2 text-center">{x.Ilosc}</td>
                                        <div className="text-center list-actions py-2">
                                            <div className=" flex">
                                                <button onClick={() => {
                                                    this.deleteLek(x.IdLek)
                                                }} className="list-actions-button-details flex-1">
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
                                                value={lek.IdLek}>{lek.Nazwa} </option>
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
                            this.addLek()
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


export default withTranslation()(withNavigate(withRouter(LekiChoroby)));