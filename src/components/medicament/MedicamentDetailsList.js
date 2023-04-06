import React from "react";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {getChorobaList} from "../../axios/DiseaseApiCalls";
import {addChorobaLek, deleteChorobaLek} from "../../axios/DiseaseMedicamentApiCalls";
import {Link} from "react-router-dom";
import {getFormattedDate} from "../../helpers/dateFormat";
import {getLekDetails} from "../../axios/MedicamentApiCalls";
import axios from "axios";

let CancelToken
let source

class MedicamentDetailsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            IdLek: this.props.params.IdLek,
            error: '',
            isLoaded: false,
            lek: '',
            leki: [],
            chorobyLek: [],
            choroby: [],
            data1: {
                IdChoroba: '',
            },
            errors: {
                IdChoroba: '',
            },
        }
    }

    async componentDidMount() {
        CancelToken = axios.CancelToken;
        source = CancelToken.source();
        try {
            await getLekDetails(this.state.IdLek, source)
                .then((res) => {
                    if (res) {
                        console.log(res.data)
                        this.setState({
                            isLoaded: true,
                            lek: res.data,
                            leki: res.data.LekList,
                            chorobyLek: res.data.Choroby
                        });
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }

    componentWillUnmount() {
        if (source) {
            source.cancel('Operation canceled by the user.');
        }
    }

    async showSelect() {
        if (this.state.choroby.length === 0) {
            try {
                await getChorobaList("", 1, source).then((res) => {
                    if (res) {
                        this.setState({
                            isLoaded: true,
                            choroby: res.data.Items
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

            const data = {...this.state.data1}
            data['IdChoroba'] = null
            this.setState({
                data1: data,
            })
            const errors = {...this.state.errors}
            errors['IdChoroba'] = ''
            this.setState({
                errors: errors,
            })
        }
    }


    deleteChoroba = async (idChoroba) => {
        const {navigate} = this.props;
        try {
            await deleteChorobaLek(idChoroba, this.state.IdLek, source)
            await navigate(0, {replace: true});
        } catch (error) {
            console.log(error)
        }
    }

    addChoroba = async () => {
        const {navigate} = this.props;
        if (this.state.data1.IdChoroba !== '') {
            try {
                await addChorobaLek(this.state.data1.IdChoroba, this.state.IdLek, source)
                await navigate(0, {replace: true});
            } catch (error) {
                console.log(error)
            }
        }
    }

    checkIfExist = (chorobaArray, chorobaID) => {
        for (let i = 0; i < chorobaArray.length; i++) {
            if (chorobaArray[i].IdChoroba === chorobaID) {
                return true
            }
        }
        return false
    }

    handleChange = (event) => {
        const {name, value} = event.target
        const data = {...this.state.data1}
        data[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = {...this.state.errors}
        errors[name] = errorMessage

        this.setState({
            data1: data,
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
        return errorMessage;
    }

    render() {
        const {IdLek, leki, lek, choroby, chorobyLek, errors, data1} = this.state
        const {t} = this.props;
        const {navigate} = this.props;

        return (
            <main>
                <section className="bg-gray-100  ">
                    <div className="container w-full max-w-6xl  mx-auto px-2 py-8">
                        <div id='recipients' className="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
                            <h2 className="mt-6 w-full my-2 mb-6 text-5xl font-black leading-tight text-center text-gray-800">
                                {t('lek.infoMedicine')}</h2>
                            <div className="relative overflow-x-auto sm:rounded-lg ">
                                <div className="flex justify-between mt-14">
                                    <h2 className=" w-1/3 my-2 mb-6 text-xl font-black leading-tight text-gray-600">
                                        {lek.Nazwa} ({lek.JednostkaMiary})</h2>
                                    <div className="relative w-1/3 ">
                                        <Link to={`/leki/magazyn/dodajLek/${IdLek}`}
                                              className="absolute top-0 right-0  h-12 w-12 md:w-auto  shadow-lg bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                            <span className="text-xl">+ </span>
                                            <span className="invisible md:visible ">
                                                {t('lek.button.addMedicineInWarehouse')}</span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="shadow-xl">
                                    <table className="w-full text-sm text-left text-gray-700  mb-12">
                                        <thead
                                            className="text-s text-gray-700 uppercase bg-gray-100 ">
                                        <tr>
                                            <th scope="col"
                                                className="text-center px-6 py-3">{t('lek.fields.quantity')}</th>
                                            <th scope="col"
                                                className="text-center px-6 py-3">{t('lek.fields.expirationDate')}</th>
                                            <th scope="col" className="text-center px-6 py-3"/>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {leki.map(lek => (
                                            <tr key={lek.IdStanLeku}
                                                className="bg-white border-b ">
                                                <td className="text-center px-6 py-2">{lek.Ilosc}</td>
                                                <td
                                                    className="text-center px-6 py-2">{lek.DataWaznosci ? getFormattedDate(lek.DataWaznosci) : "-"}
                                                </td>
                                                <td className=" text-center  py-1">
                                                    <div className="flex">
                                                        <Link to={`/leki/magazyn/edit/${lek.IdStanLeku}`}
                                                              className="mr-3">
                                                            <svg className="flex-1"
                                                                 xmlns="http://www.w3.org/2000/svg"
                                                                 width="20" height="20" fill="#000000"
                                                                 viewBox="0 0 256 256">
                                                                <rect className="details-icon-color" width="256"
                                                                      height="256"
                                                                      fill="none"/>
                                                                <path className="details-icon-color"
                                                                      d="M96,216H48a8,8,0,0,1-8-8V163.31371a8,8,0,0,1,2.34315-5.65686l120-120a8,8,0,0,1,11.3137,0l44.6863,44.6863a8,8,0,0,1,0,11.3137Z"
                                                                      fill="none" stroke="#000000"
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round" strokeWidth="16"></path>
                                                                <line className="details-icon-color" x1="136" y1="64"
                                                                      x2="192" y2="120"
                                                                      fill="none" stroke="#000000"
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round" strokeWidth="16"></line>
                                                                <polyline className="details-icon-color"
                                                                          points="216 216 96 216 40.509 160.509"
                                                                          fill="none"
                                                                          stroke="#000000" strokeLinecap="round"
                                                                          strokeLinejoin="round"
                                                                          strokeWidth="16"></polyline>
                                                            </svg>
                                                        </Link>
                                                        <Link to={`/leki/magazyn/delete/${lek.IdStanLeku}`}
                                                              className="flex-1">
                                                            <svg className="flex-1"
                                                                 xmlns="http://www.w3.org/2000/svg" width="20"
                                                                 height="20"
                                                                 fill="#000000" viewBox="0 0 256 256">

                                                                <rect width="256" height="256" fill="none"/>
                                                                <line className="details-icon-color" x1="215.99609"
                                                                      y1="56"
                                                                      x2="39.99609" y2="56.00005" fill="none"
                                                                      stroke="#000000"
                                                                      strokeLinecap="round" strokeLinejoin="round"
                                                                      strokeWidth="16"></line>
                                                                <line className="details-icon-color" x1="104" y1="104"
                                                                      x2="104" y2="168"
                                                                      fill="none" stroke="#000000"
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round" strokeWidth="16"></line>
                                                                <line className="details-icon-color" x1="152" y1="104"
                                                                      x2="152" y2="168"
                                                                      fill="none" stroke="#000000"
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round" strokeWidth="16"></line>
                                                                <path className="details-icon-color"
                                                                      d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56"
                                                                      fill="none"
                                                                      stroke="#000000" strokeLinecap="round"
                                                                      strokeLinejoin="round" strokeWidth="16"></path>
                                                                <path className="details-icon-color"
                                                                      d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56"
                                                                      fill="none" stroke="#000000"
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round" strokeWidth="16"></path>
                                                            </svg>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="flex justify-between mt-12">
                                <h2 className=" w-1/3 my-2 mb-6 text-l font-black leading-tight text-gray-600">
                                    {t('choroba.title')}</h2>
                                <div className="relative  w-1/3 ">
                                    <button id="menu-toggle" onClick={() => {
                                        this.showSelect()
                                    }}
                                            className="shadow-xl absolute  top-0 right-0  h-12 w-46  bg-blue-400 hover:bg-white  hover:text-blue-400  focus:outline-none text-white font-bold py-2 px-4 rounded">
                                        <span className="text-2xl font-bold ">+</span>
                                    </button>
                                </div>
                            </div>
                            <div className="relative overflow-x-auto shadow-xl sm:rounded-lg ">
                                <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
                                    <thead
                                        className="text-s text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {chorobyLek.map(x => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600"
                                            key={x.IdChoroba}>
                                            <td className=" px-8 py-2 ">• {x.Nazwa}</td>
                                            <div className="text-center py-2">
                                                <div className=" flex">
                                                    <button onClick={() => {
                                                        this.deleteChoroba(x.IdChoroba)
                                                    }} className=" flex-1">
                                                        <svg className=" flex-1"
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
                            <div className=" md:flex mb-6 mt-4 hidden">
                                <div className="md:w-full">
                                    <select name="IdChoroba" id="spec-content" onChange={this.handleChange}
                                            className="form-select hidden block w-full focus:bg-white">
                                        <option value="">{t('choroba.selectDisease')}</option>
                                        {
                                            choroby.map(choroba => (
                                                <option selected={choroba.ID_Choroba === data1.IdChoroba}
                                                        className={this.checkIfExist(chorobyLek, choroba.ID_Choroba) === true ? "text-gray-300" : ""}
                                                        value={choroba.ID_Choroba}> {choroba.Nazwa}</option>
                                            ))}
                                    </select>
                                    <span id="errorIdChoroba"
                                          className="errors-text2 mt-4">{errors.IdChoroba}</span>
                                    <div className="relative w-full">
                                        <button id="spec-content1" onClick={() => {
                                            this.addChoroba()
                                        }}
                                                className="absolute hidden top-0 right-0  h-12 w-46 mt-2 shadow-xl bg-white hover:bg-gray-300  hover:text-blue-400  focus:outline-none text-blue-400 font-bold py-2 px-4 rounded">
                                            <span className="text-l font-bold ">+ {t('button.add')}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className=" md:flex mb-6 mt-8 ">
                                <button onClick={() => navigate(-1)}
                                        className="shadow-lg bg-red-500 hover:bg-white  hover:text-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                        type="button">
                                    {t("button.back")}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
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


export default withTranslation()(withNavigate(withRouter(MedicamentDetailsList)));