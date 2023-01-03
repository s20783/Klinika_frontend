import React from "react";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {getWizytaDetails} from "../../../axios/WizytaAxiosCalls";
import {getReceptaDetails, getReceptaLeki} from "../../../axios/ReceptaAxiosCalls";
import {getUslugaWizytaList} from "../../../axios/UslugaAxiosCalls";
import {addChorobaWizyta, deleteChorobaWizyta, getChorobaWizytaList} from "../../../axios/WizytaChorobaAxiosCalls";
import {getChorobaList} from "../../../axios/ChorobaAxiosCalls";
import FormularzWizytaMenu from "../../fragments/FormularzWizytaMenu";
import axios from "axios";
let CancelToken
let source
class Recepta extends React.Component {
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
            uslugi: [],
            choroby: [],
            chorobyWizyta: [],
            recepta: '',
            lekiRecepta: [],
            data1: {
                IdChoroba: '',
            },
            errors: {
                IdChoroba: '',
            },
        }
    }


    fetchReceptaDetails = async () => {
        try {

            await getReceptaDetails(this.state.idWizyta, source).then((res) => {
                if (res) {
                    console.log(res.data)
                    this.setState({
                        isLoaded: true,
                        recepta: res.data
                    });
                }
            })
            await getReceptaLeki(this.state.idWizyta, source).then((res) => {
                if (res) {
                    console.log(res.data)
                    this.setState({
                        isLoaded: true,
                        lekiRecepta: res.data
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
        this.fetchReceptaDetails()

    }

    componentWillUnmount() {
        if (source) {
            source.cancel('Operation canceled by the user.');
        }
    }

    render() {
        const { recepta, idWizyta, lekiRecepta} = this.state
        const {t} = this.props;


        return (
            <div class="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3 mb-3">
                <div class="w-full lg:w-1/6 lg:px-6 text-gray-800 leading-normal">
                    <FormularzWizytaMenu idWizyta={idWizyta}/>

                </div>
                <div
                    className="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">

                    <div className="flex justify-between mt-6">
                        <h2 className=" w-1/3 my-2 mb-6 text-2xl  font-black leading-tight text-gray-800">
                            {t('recepta.title')}</h2>
                        <div className="relative  w-1/3 ">

                            {recepta !== '' &&
                                <div>
                                    <Link to={`/recepta/edit/${idWizyta}`}>
                                        <button id="menu-toggle"
                                                className="shadow-xl absolute top-16 right-0 h-12 w-46 shadow bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                <span className="text-2xl font-bold ">
                                    <svg className="list-actions-button-edit flex-1"
                                         xmlns="http://www.w3.org/2000/svg"
                                         width="20" height="20" fill="#FFFFFF" viewBox="0 0 256 256">
                                                            <rect className="details-icon-color" width="256"
                                                                  height="256"
                                                                  fill="none"></rect>
                                                            <path className="details-icon-color"
                                                                  d="M96,216H48a8,8,0,0,1-8-8V163.31371a8,8,0,0,1,2.34315-5.65686l120-120a8,8,0,0,1,11.3137,0l44.6863,44.6863a8,8,0,0,1,0,11.3137Z"
                                                                  fill="none" stroke="#FFFFFF" strokeLinecap="round"
                                                                  strokeLinejoin="round" strokeWidth="20"></path>
                                                            <line className="details-icon-color" x1="136" y1="64"
                                                                  x2="192" y2="120"
                                                                  fill="none" stroke="#FFFFFF" strokeLinecap="round"
                                                                  strokeLinejoin="round" strokeWidth="20"></line>
                                                            <polyline className="details-icon-color"
                                                                      points="216 216 96 216 40.509 160.509" fill="none"
                                                                      stroke="#FFFFFF" strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      strokeWidth="20"></polyline>
                                            </svg>
                                </span>
                                        </button>
                                    </Link>
                                    <Link to={`/recepta/delete/${idWizyta}`}>
                                        <button id="menu-toggle"
                                                className="shadow-xl absolute top-32 right-0 h-12 w-46 shadow bg-red-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                           <span className="text-2xl font-bold ">
                                            <svg className="list-actions-button-delete flex-1"
                                                 xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                 fill="#FFFFFF" viewBox="0 0 256 256">
                                                <rect width="256" height="256" fill="none"></rect>
                                                <line className="details-icon-color" x1="215.99609" y1="56"
                                                      x2="39.99609" y2="56.00005" fill="none" stroke="#FFFFFF"
                                                      stroke-linecap="round" strokeLinejoin="round"
                                                      strokeWidth="16"></line>
                                                <line className="details-icon-color" x1="104" y1="104" x2="104" y2="168"
                                                      fill="none" stroke="#FFFFFF" stroke-linecap="round"
                                                      strokeLinejoin="round" strokeWidth="16"></line>
                                                <line className="details-icon-color" x1="152" y1="104" x2="152" y2="168"
                                                      fill="none" stroke="#FFFFFF" stroke-linecap="round"
                                                      strokeLinejoin="round" strokeWidth="16"></line>
                                                <path className="details-icon-color"
                                                      d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56" fill="none"
                                                      stroke="#FFFFFF" stroke-linecap="round"
                                                      strokeLinejoin="round" strokeWidth="16"></path>
                                                <path className="details-icon-color"
                                                      d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56"
                                                      fill="none" stroke="#FFFFFF" stroke-linecap="round"
                                                      strokeLinejoin="round" strokeWidth="16"></path>
                                            </svg>
                                            </span>
                                        </button>
                                    </Link>
                                </div>
                            }
                            {recepta === '' &&
                                <Link to={`/recepta/add/${idWizyta}`}>

                                    <button id="menu-toggle"
                                            className="shadow-xl absolute top-0 right-0 h-12 w-46 shadow bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                        <span className="text-2xl font-bold ">+</span>
                                    </button>
                                </Link>
                            }
                        </div>
                    </div>
                    {recepta !== '' &&
                        <div className="border-4 border-blue-200  h-fit ml-3 shadow-xl rounded-md mx-20">

                            <h2 className=" w-1/3 my-8 mb-5 ml-4 text-lg font-bold leading-tight  text-gray-600">
                                {t('recepta.fields.medicines')}</h2>
                            <div className="overflow-x-auto shadow-xl">
                                <table className="w-full    text-sm text-left text-gray-700 dark:text-gray-400">
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
                                            key={x.ID_lek}>
                                            <td className="px-6 py-2 text-center">{x.Nazwa}</td>
                                            <td className="px-6 py-2 text-center">{x.Ilosc} {x.JednostkaMiary}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <h2 className=" w-1/3 my-8 mb-5 ml-4 text-lg font-bold leading-tight  text-gray-600">
                                {t('recepta.fields.recommendations')}</h2>
                            <textarea className="shadow-xl form-textarea block w-4/5 focus:bg-white mb-4 px-2 ml-4" id="Notatka"
                                      name="Notatka"
                                      value={recepta.Zalecenia } rows="6"
                                      disabled/>
                        </div>
                    }
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


export default withTranslation()(withNavigate(withRouter(Recepta)));