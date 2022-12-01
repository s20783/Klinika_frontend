import React from "react";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {getFormattedDate, getFormattedHour} from "../other/dateFormat";
import {getGodzinyPracyList} from "../../api/GodzinyPracyApiCalls";
import {Link} from "react-router-dom";
import {getUrlopList} from "../../api/UrlopApiCall";
import SzczegolyVetMenu from "../fragments/SzczegolyVetMenu";
import GodzinyPracy from "../godzinyPracy/GodzinyPracy";//?????????????????/


class GodzinyPracyWeterynarz extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.params)
        const paramsIdWeterynarz = this.props.params.IdOsoba
        this.state = {
            godzinyPracy: [],
            idWeterynarz: paramsIdWeterynarz,
            error: '',
            isLoaded: false,
            notice: '',
            urlopy: [],
            data:'',
            dataError:''
        }
    }

    componentDidMount() {

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

        getUrlopList(this.state.idWeterynarz)
            .then(res => {
                console.log(res.status)
                return res.json()
            })
            .then(
                (data) => {
                    console.log(data)
                    this.setState({
                        isLoaded: true,
                        urlopy: data
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
        const { idWeterynarz, godzinyPracy, urlopy } = this.state

        return (
            <div class="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3">
                <div className="w-full lg:w-1/6 lg:px-6 text-xl text-gray-800 leading-normal">
                    <SzczegolyVetMenu idVet={idWeterynarz}/>
                </div>
                <div
                    className="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">

                    <div className="flex justify-between mt-5">
                        <h2 className=" w-1/3 my-2 mb-6 text-2xl font-black leading-tight text-gray-800">
                            {t('godzinyPracy.title')}</h2>
                        <div className="relative  w-1/3 ">
                            <div className="absolute top-0 right-0">
                                <Link to={`/godzinyPracy/${idWeterynarz}`}>
                                    <button
                                        className=" h-12 w-46 shadow bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                        <span className="text-2xl font-bold">+</span>
                                        {(godzinyPracy.length !== 0) ?
                                            <span className="text-l font-bold"> Zmień</span>
                                            : <span className="text-l font-bold"> Dodaj</span>}
                                    </button>
                                </Link>

                            </div>
                        </div>
                    </div>
                    {(godzinyPracy.length !== 0) &&
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
                    }
                    <div className="flex justify-between mt-14">
                        <h2 className=" w-1/3 my-2 mb-6 text-2xl font-black leading-tight text-gray-800">
                            {t('urlop.title')}</h2>
                        <div className="relative  w-1/3 ">
                            <Link to={`/urlop/${idWeterynarz}`}>
                            <button id="menu-toggle"
                                    className="absolute top-0 right-0 h-12 w-46 shadow bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                <span className="text-2xl font-bold ">+</span>
                            </button>
                            </Link>
                        </div>
                    </div>
                    {(urlopy.length !== 0) &&
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                            <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
                                <thead
                                    className="text-s text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                </thead>
                                <tbody>
                                {urlopy.map(x => (
                                    <tr className="relative bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600"
                                        key={x.IdUrlop}>
                                        <td className=" px-6 py-2">• {getFormattedDate(x.Dzien)}</td>
                                        <td className=" list-actions ">
                                            <div className="relative h-6 w-4/6">
                                                <Link to={`/urlop/${idWeterynarz}/${x.IdUrlop}`}
                                                      className=" absolute inset-y-1 right-8  flex-1">
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
                                                <Link to={`/urlop/delete/${x.IdUrlop}`}>
                                                    <button className=" absolute inset-y-1 right-1 list-actions-button-details flex-1">
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
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    }

                    <div className=" md:flex mb-6 mt-8 ">
                        <div className="flex pb-3">
                            <Link to={`/weterynarze`}>
                                <button
                                    className="shadow bg-red-500 hover:bg-white  hover:text-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
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

export default withTranslation()(withNavigate(withRouter(GodzinyPracyWeterynarz)));