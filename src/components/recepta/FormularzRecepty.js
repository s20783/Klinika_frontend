import React from "react";
import formMode from "../helpers/FormMode";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {getOnlyLekList} from "../../axios/LekAxiosCalls";
import {
    addRecepta,
    addReceptaLek, deleteReceptaLek,
    getReceptaDetails,
    getReceptaLeki, updateRecepta,
} from "../../axios/ReceptaAxiosCalls";
import {Link} from "react-router-dom";
import {checkNumberRange} from "../helpers/CheckNRange";

class FormularzRecepty extends React.Component {
    constructor(props) {
        super(props);

        const paramsIdRecepta = this.props.params.IdRecepta
        const paramsTyp = this.props.params.typ
        const currentFormMode = paramsTyp === 'edit' ? formMode.EDIT : formMode.NEW
        const currentReceptaForm = paramsTyp !== 'add'

        console.log(currentFormMode)

        this.state = {
            data: {
                Lek: null,
                Ilosc: null,
                Zalecenia: ''

            },
            errors: {
                Lek: '',
                Ilosc: '',
                Zalecenia: ''
            },
            errorListaLek:'',
            idRecepta: paramsIdRecepta,
            lekiRecepta: [],
            leki: [],
            error: '',
            isLoaded: false,
            notice: '',
            formMode: currentFormMode,
            czyDodana: currentReceptaForm
        }
    }


    async componentDidMount() {

        try {
            if (this.state.formMode === formMode.EDIT) {

                var res = await getReceptaDetails(this.state.idRecepta)
                var data = await res.data

                const data1 = {...this.state.data}
                console.log(data)
                data1['Zalecenia'] = data.Zalecenia
                this.setState({
                    data: data1,
                    isLoaded: true,
                })
            }
            res = await getReceptaLeki(this.state.idRecepta)
            data = await res.data

            console.log(data)
            this.setState({
                lekiRecepta: data
            });

        } catch (error) {
            console.log(error)
        }


    }


    validateForm = () => {
        const data = this.state.data
        const errors = this.state.errors

        for (const fieldName in data) {
            const fieldValue = data[fieldName]
            errors[fieldName] = this.validateField(fieldName, fieldValue)
        }

        this.setState({
            errors: errors
        })
        return !this.hasErrors();
    }


    addLek = async () => {
        const {navigate} = this.props;
        const dane = {...this.state}
        const isValid = this.validateForm()

        if (isValid) {
            if (dane.czyDodana === false) {
                try {
                    await addRecepta(dane.idRecepta, dane.data.Zalecenia)
                    this.setState({
                        czyDodana: true
                    });
                } catch (error) {
                    console.log(error)
                }
            }
            try {
                await addReceptaLek(dane.idRecepta, dane.data.Lek, dane.data.Ilosc)
                navigate(0, {replace: true});
            } catch (error) {
                console.log(error)
            }
            this.setState({
                errorListaLek: ''
            });
        }
    }

    deleteReceptaLek = async (id) => {
        const {navigate} = this.props;
        const dane = {...this.state}

        try {
            await deleteReceptaLek(dane.idRecepta, id)
            navigate(0, {replace: true});
        } catch (error) {
            console.log(error)
        }
    }


    async showSelect() {
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

        const helpDiv = document.getElementById("spec-content");
        const helpDiv1 = document.getElementById("spec-content1");
        const helpDiv2 = document.getElementById("spec-content2");

        if (helpDiv.classList.contains("hidden")) {
            helpDiv.classList.remove("hidden");
            helpDiv1.classList.remove("hidden");
            helpDiv2.classList.remove("hidden");


        } else {
            helpDiv.classList.add("hidden");
            helpDiv1.classList.add("hidden");
            helpDiv2.classList.add("hidden");

            const data = {...this.state.data}
            console.log(data)
            data['Lek'] = ''
            data['Ilosc'] = ''
            this.setState({
                data: data
            })

            const errors = {...this.state.errors}
            console.log(errors)
            errors['Lek'] = ''
            errors['Ilosc'] = ''
            this.setState({
                errors: errors
            })
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
        if (fieldName === 'Ilosc') {
            if (!checkNumberRange(fieldValue, 0, 99)) {
                errorMessage = t('validation.max50')
            }
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        if (fieldName === 'Lek') {
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        if (fieldName === 'Zalecenia') {
            if (fieldValue !== null) {
                if (fieldValue.length > 300) {
                    errorMessage = `${t('validation.max300nullable')}`
                }
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

    confirmRecepta = async () => {
        const dane = this.state
        const {navigate} = this.props;

        if (dane.errors.Zalecenia === '' && dane.lekiRecepta.length !== 0) {
            try {
                await updateRecepta(dane.idRecepta, dane.data.Zalecenia)
                navigate(-1, {replace: true});
            } catch (error) {
                console.log(error)
            }

        }
        else {
            this.setState({
                errorListaLek: 'Lista leków nie może być pusta'
            });
        }
    }

    checkIfExist = (receptaArray, receptaID) => {
        for (let i = 0; i < receptaArray.length; i++) {
            if (receptaArray[i].ID_Lek === receptaID) {
                return true
            }
        }
        return false
    }


    render() {
        const {lekiRecepta, leki, data, errors, errorListaLek} = this.state
        const {t} = this.props;
        const {navigate} = this.props

        return (
            <div class="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3">
                <div class="w-full lg:w-1/6 lg:px-6 text-gray-800 leading-normal">
                    <p class="text-base font-bold py-2 text-xl lg:pb-6 text-gray-700">{t('recepta.writingPrescription')}</p>
                </div>
                <div
                    className=" lg:w-5/6 w-full p-8 mt-6 mb-8 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">

                    <div className="flex justify-between mt-2">
                        <h2 className=" w-1/3 my-2 mb-6 text-2xl font-black leading-tight text-gray-800">
                            {t('recepta.title')}</h2>
                    </div>

                    <div
                        className="border-4 border-blue-200 h-fit ml-3 shadow-2xl rounded-md md:mr-20 mb-12">

                        <div className="w-full relative ">
                            <h2 className=" w-full  my-12 mb-5 md:ml-4 text-lg font-bold leading-tight   text-gray-600">
                                {t('recepta.fields.medicines')}</h2>
                            <button id="menu-toggle" onClick={() => {
                                this.showSelect()
                            }}
                                    className="absolute inset-y-0 right-0 mr-2  h-10 w-10 shadow bg-blue-300 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                <span className="text-gl font-bold ">+</span>
                            </button>
                            <span id="errorLista" className="errors-text2 mb-3 mt-3">{errorListaLek} </span>

                        </div>
                        {lekiRecepta.length !== 0 &&
                            <div className="overflow-x-auto shadow-xl">
                                <table className="w-full  text-sm text-left text-gray-700 dark:text-gray-400">
                                    <thead
                                        className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 uppercase py-3 text-center">
                                            {t("lek.fields.name")}</th>
                                        <th scope="col" className="px-6 uppercase py-3 text-center">
                                            {t("lek.fields.quantity")}</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {lekiRecepta.map(x => (
                                        <tr className="bg-white  dark:bg-gray-800  dark:hover:bg-gray-600"
                                            key={x.ID_Lek}>
                                            <td className="px-6 py-2 text-center">{x.Nazwa} {x.ID_Lek}</td>
                                            <td className="px-6 py-2 text-center">{x.Ilosc} {x.JednostkaMiary}</td>
                                            <td className="px-6 py-2 text-center">
                                                <button onClick={() => {
                                                    this.deleteReceptaLek(x.ID_Lek)
                                                }}
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
                                            </td>

                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        }


                        <div className="flex flex-wrap -mx-3 mb-6 ">
                            <div className="w-full md:w-4/6 px-3 mb-6 mt-6 md:mb-0">

                                <select name="Lek" id="spec-content" onChange={this.handleChange}
                                        className="shadow-xl form-select ml-3 md:w-full w-2/3 focus:bg-white hidden">
                                    <option value="">Wybierz lek</option>
                                    {
                                        leki.map(lek => (
                                            <option
                                                className={this.checkIfExist(lekiRecepta, lek.IdLek) === true ? "text-gray-300" : ""}
                                                selected={data.Lek === lek.IdLek}
                                                value={lek.IdLek}>{lek.Nazwa} ({lek.JednostkaMiary})</option>
                                        ))}
                                </select>
                                <span id="errorGatunek" className="errors-text2 mb-4 ">{errors.Lek}</span>
                            </div>

                            <div className="w-1/3 md:w-1/6 px-3 mb-6 mt-6 md:mb-0 ml-12">

                                <input
                                    className="shadow-xl hidden form-textarea appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:border-blue-600 "
                                    name="Ilosc" id="spec-content1" type="number" value={data.Ilosc} placeholder="Ilosc"
                                    onChange={this.handleChange}/>
                                <span id="errorDawka" className="errors-text2 mb-4 ">{errors.Ilosc}</span>
                            </div>

                            <div className="relative  w-full mb-12 ">
                                <button id="spec-content2" onClick={() => {
                                    this.addLek()
                                }}
                                        className="shadow-xl absolute hidden md:top-0 bottom-0 right-6  h-12 w-46 mt-2 shadow bg-white hover:bg-gray-300  hover:text-blue-400 focus:shadow-outline focus:outline-none text-blue-400 font-bold py-2 px-4 rounded">
                                    <span className="text-l font-bold ">+ {t('button.add')}</span>
                                </button>
                                <Link to={`/dodajLek`}>
                                    <button id="spec-content2"
                                            className="shadow-xl absolute  top-0  left-6  h-12 w-46 mt-2 shadow bg-gray-200 hover:bg-gray-300  hover:text-blue-400 focus:shadow-outline focus:outline-none text-blue-400 font-bold py-2 px-4 rounded">
                                        <span className="text-l font-bold ">{t('button.addToDataBase')} </span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <h2 className=" w-1/3 mt-14 mb-6  ml-4 text-lg font-bold leading-tight  text-gray-600">
                            {t('recepta.fields.recommendations')}</h2>
                        <textarea className="shadow-xl form-textarea block w-4/5 focus:bg-white mb-8 px-2 ml-4" id="Notatka"
                                  name="Zalecenia" onChange={this.handleChange}
                                  value={data.Zalecenia} rows="6"
                        />
                        <span id="errorZalecenia" className="errors-text2 mb-4 ">{errors.Zalecenia}</span>

                    </div>
                    <div className=" md:flex mb-6 mt-8 ">
                        <div className="flex pb-3">
                            <button onClick={() => navigate(-1)}
                                    className="shadow-xl bg-red-500 hover:bg-white  hover:text-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                    type="button">
                                {t("button.back")}
                            </button>
                            <button onClick={() => {
                                this.confirmRecepta()
                            }}
                                    className=" ml-4 shadow-xl bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                {t("button.confirm")}
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

export default withTranslation()(withNavigate(withRouter(FormularzRecepty)));