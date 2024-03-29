import React from "react";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {getFormattedHour} from "../../helpers/dateFormat";
import {
    addWorkingHours,
    editWorkingHours,
    addDefaultWorkingHours
} from "../../axios/WorkingHoursApiCalls";
import {ValidateTime} from "../../helpers/ValidateTime";
import {Link} from "react-router-dom";
import {getWorkingHoursList} from "../../axios/WorkingHoursApiCalls";
import axios from "axios";

let CancelToken
let source

class WorkingHours extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdWeterynarz = this.props.params.IdOsoba
        this.state = {
            pon: {
                DzienTygodnia: null, GodzinaRozpoczecia: '', GodzinaZakonczenia: ''
            },
            wt: {
                DzienTygodnia: null, GodzinaRozpoczecia: '', GodzinaZakonczenia: ''
            },
            sr: {
                DzienTygodnia: null, GodzinaRozpoczecia: '', GodzinaZakonczenia: ''
            },
            czw: {
                DzienTygodnia: null, GodzinaRozpoczecia: '', GodzinaZakonczenia: ''
            },
            pt: {
                DzienTygodnia: null, GodzinaRozpoczecia: '', GodzinaZakonczenia: ''
            },
            sob: {
                DzienTygodnia: null, GodzinaRozpoczecia: '', GodzinaZakonczenia: ''
            },
            data: {
                DzienTygodnia: '',
                GodzinaRozpoczecia: null,
                GodzinaZakonczenia: null
            },
            errors: {
                GodzinaRozpoczecia: '',
                GodzinaZakonczenia: ''
            },
            godzinyPracy: [],
            idWeterynarz: paramsIdWeterynarz,
            error: '',
            isLoaded: false,
            czyEdycja: false
        }
    }

    async componentDidMount() {
        CancelToken = axios.CancelToken;
        source = CancelToken.source();

        try {
            await getWorkingHoursList(this.state.idWeterynarz, source).then((res) => {
                if (res) {
                    if (res.data.DzienTygodnia === 1) {
                        this.setState({
                            pon: res.data
                        });
                    } else if (res.data.DzienTygodnia === 2) {
                        this.setState({
                            wt: res.data
                        });
                    } else if (res.data.DzienTygodnia === 3) {
                        this.setState({
                            sr: res.data
                        });
                    } else if (res.data.DzienTygodnia === 4) {
                        this.setState({
                            czw: res.data
                        });
                    } else if (res.data.DzienTygodnia === 5) {
                        this.setState({
                            pt: res.data
                        });
                    } else if (res.data.DzienTygodnia === 6) {
                        this.setState({
                            sob: res.data
                        });
                    }
                }
                this.setState({
                    isLoaded: true,
                    godzinyPracy: res.data
                });
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

    showInputs(dzien, godzinaRozpoczecia, godzinaZakonczenia) {
        const helpDiv = document.getElementById("spec-content2");
        const helpDiv1 = document.getElementById("spec-content3");
        const helpDiv2 = document.getElementById("spec-content4");
        const helpDiv3 = document.getElementById("spec-content5");
        const helpDiv4 = document.getElementById("spec-content6");

        if (helpDiv.classList.contains("hidden")) {
            helpDiv.classList.remove("hidden");
            helpDiv1.classList.remove("hidden");
            helpDiv2.classList.remove("hidden");
            helpDiv3.classList.remove("hidden");
            helpDiv4.classList.remove("hidden");
        } else {
            helpDiv.classList.add("hidden");
            helpDiv1.classList.add("hidden");
            helpDiv2.classList.add("hidden");
            helpDiv3.classList.add("hidden");
            helpDiv4.classList.add("hidden");
        }

        if (godzinaRozpoczecia === '') {
            this.setState({
                czyEdycja: false
            });
        } else {
            this.setState({
                czyEdycja: true
            });
        }

        const data = {...this.state.data}
        data['DzienTygodnia'] = dzien
        data['GodzinaRozpoczecia'] = godzinaRozpoczecia
        data['GodzinaZakonczenia'] = godzinaZakonczenia
        this.setState({
            data: data,
        })
        const errors = {...this.state.errors}
        errors['GodzinaRozpoczecia'] = ''
        errors['GodzinaZakonczenia'] = ''
        this.setState({
            errors: errors,
        })
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
        if (fieldName === 'GodzinaRozpoczecia') {
            if (!ValidateTime(fieldValue)) {
                errorMessage = t('godzinyPracy.wrongTimeFormat')
            }
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        if (fieldName === 'GodzinaZakonczenia') {
            if (!ValidateTime(fieldValue)) {
                errorMessage = t('godzinyPracy.wrongTimeFormat')
            }
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        return errorMessage;
    }

    addDefault = async () => {
        const {navigate} = this.props;
        if (this.state.idWeterynarz !== null) {
            try {
                await addDefaultWorkingHours(this.state.idWeterynarz, source)
                navigate(0, {replace: true});
            } catch (error) {
                console.log(error)
            }
        }
    }

    changeWorkingHours = async () => {
        const {navigate} = this.props;
        const dane = {...this.state}
        const isValid = this.validateForm()

        if (isValid) {
            if (this.state.czyEdycja) {
                try {
                    await editWorkingHours(this.state.idWeterynarz, dane.data, source)
                    navigate(-1, {replace: true});
                } catch (error) {
                    console.log(error)
                }
            } else {
                try {
                    await addWorkingHours(this.state.idWeterynarz, dane.data, source)
                    navigate(-1, {replace: true});
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }

    render() {
        const {t} = this.props;
        // const {navigate} = this.props
        const {data, godzinyPracy, errors, idWeterynarz, czyEdycja, pon, wt, sr, czw, pt, sob} = this.state

        return (
            <div className="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3">
                <div className="w-full lg:w-1/6 lg:px-6 text-gray-800 leading-normal">
                    <p className="text-base font-bold py- text-xl lg:pb-6 text-gray-700">{t('godzinyPracy.changingWorkingHour')} </p>
                </div>
                <div
                    className="w-full lg:w-5/6 p-8 mt-10 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                    <div className="flex justify-between mt-5">
                        <h2 className=" w-1/3 my-2 mb-6 text-2xl font-black leading-tight text-gray-800">
                            {t('godzinyPracy.title')}</h2>
                        <div className="relative  w-1/3 ">
                            {(godzinyPracy.length === 0) &&
                                <button onClick={() => {
                                    this.addDefault()
                                }}
                                        className="absolute top-0 right-0 h-12 w-46 shadow bg-gray-200 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-blue-300 font-bold py-2 px-4 rounded">
                                    <span className="text-2xl font-bold ">+
                                        <span
                                            className="text-base font-bold "> {t('godzinyPracy.button.addDefault')}</span>
                                    </span>
                                </button>}
                        </div>
                    </div>

                    <table
                        className="w-full text-center mt-6 flex flex-wrap text-gray-700 dark:text-gray-400">
                        <tr></tr>
                        <tr>
                            <th className=" mb-6  flex flex-wrap relative h-10 w-48  text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                <span
                                    className="absolute inset-0 uppercase underline">{t("harmonogram.weekdays.1")}</span>
                                {(pon.DzienTygodnia !== null) &&
                                    <Link to={`/godzinyPracy/delete/${idWeterynarz}/${pon.DzienTygodnia}`}>
                                        <button
                                            className=" absolute inset-y-1 left-1 h-6 w-6 shadow bg-red-200 hover:bg-white  hover:text-red-300 focus:shadow-outline focus:outline-none text-white font-bold rounded"
                                            id="menu-toggle"> -
                                        </button>
                                    </Link>
                                }
                                <button
                                    className=" absolute inset-y-1 right-1 h-6 w-6 shadow bg-white text-blue-400 hover:bg-blue-300  hover:text-white focus:shadow-outline focus:outline-none font-bold rounded"
                                    id="menu-toggle" onClick={() => {
                                    this.showInputs(1, pon.GodzinaRozpoczecia, pon.GodzinaZakonczenia)
                                }}> +
                                </button>
                            </th>
                            <td className="text-center w-full flex flex-wrap my-2 mb-10">
                                <div className="w-full">
                                    <span className='text-s'>
                                        {getFormattedHour(pon.GodzinaRozpoczecia)} - {getFormattedHour(pon.GodzinaZakonczenia)}
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr className="border-b-2 border-t-2">
                            <th className=" mb-6  flex flex-wrap relative h-10 w-48  text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                <span
                                    className="absolute inset-0 uppercase underline">{t("harmonogram.weekdays.2")}</span>
                                {(wt.DzienTygodnia !== null) &&
                                    <Link to={`/godzinyPracy/delete/${idWeterynarz}/${wt.DzienTygodnia}`}>
                                        <button
                                            className=" absolute inset-y-1 left-1 h-6 w-6 shadow bg-red-200 hover:bg-white  hover:text-red-300 focus:shadow-outline focus:outline-none text-white font-bold rounded"
                                            id="menu-toggle"> -
                                        </button>
                                    </Link>
                                }
                                <button
                                    className=" absolute inset-y-1 right-1 h-6 w-6 shadow bg-blue-300 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold rounded"
                                    id="menu-toggle" onClick={() => {
                                    this.showInputs(2, wt.GodzinaRozpoczecia, wt.GodzinaZakonczenia)
                                }}> +
                                </button>
                            </th>
                            <td className="text-center w-full flex flex-wrap my-2 mb-10">
                                <div className="w-full">
                                    <span className=' text-s '>
                                        {getFormattedHour(wt.GodzinaRozpoczecia)} - {getFormattedHour(wt.GodzinaZakonczenia)}
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th className=" mb-6  flex flex-wrap relative h-10 w-48  text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                <span
                                    className="absolute inset-0 uppercase underline">{t("harmonogram.weekdays.3")}</span>
                                {(sr.DzienTygodnia !== null) &&
                                    <Link to={`/godzinyPracy/delete/${idWeterynarz}/${sr.DzienTygodnia}`}>
                                        <button
                                            className=" absolute inset-y-1 left-1 h-6 w-6 shadow bg-red-200 hover:bg-white  hover:text-red-300 focus:shadow-outline focus:outline-none text-white font-bold rounded"
                                            id="menu-toggle"> -
                                        </button>
                                    </Link>
                                }
                                <button
                                    className=" absolute inset-y-1 right-1 h-6 w-6 shadow bg-white text-blue-400 hover:bg-blue-300  hover:text-white focus:shadow-outline focus:outline-none font-bold rounded"
                                    id="menu-toggle" onClick={() => {
                                    this.showInputs(3, sr.GodzinaRozpoczecia, sr.GodzinaZakonczenia)
                                }}> +
                                </button>
                            </th>
                            <td className="text-center w-full flex flex-wrap my-2 mb-10">
                                <div className="w-full">
                                    <span className=' text-s '>
                                        {getFormattedHour(sr.GodzinaRozpoczecia)} - {getFormattedHour(sr.GodzinaZakonczenia)}
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr className="border-b-2 border-t-2">
                            <th className=" mb-6  flex flex-wrap relative h-10 w-48  text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                <span
                                    className="absolute inset-0 uppercase underline">{t("harmonogram.weekdays.4")}</span>
                                {(czw.DzienTygodnia !== null) &&
                                    <Link to={`/godzinyPracy/delete/${idWeterynarz}/${czw.DzienTygodnia}`}>
                                        <button
                                            className=" absolute inset-y-1 left-1 h-6 w-6 shadow bg-red-200 hover:bg-white  hover:text-red-300 focus:shadow-outline focus:outline-none text-white font-bold rounded"
                                            id="menu-toggle"> -
                                        </button>
                                    </Link>
                                }
                                <button
                                    className=" absolute inset-y-1 right-1 h-6 w-6 shadow bg-blue-300 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold rounded"
                                    id="menu-toggle" onClick={() => {
                                    this.showInputs(4, czw.GodzinaRozpoczecia, czw.GodzinaZakonczenia)
                                }}> +
                                </button>
                            </th>
                            <td className="text-center w-full flex flex-wrap my-2 mb-10">
                                <div className="w-full">
                                    <span className=' text-s '>
                                        {getFormattedHour(czw.GodzinaRozpoczecia)} - {getFormattedHour(czw.GodzinaZakonczenia)}
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th className=" mb-6  flex flex-wrap relative h-10 w-48  text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                <span
                                    className="absolute inset-0 uppercase underline">{t("harmonogram.weekdays.5")}</span>
                                {(pt.DzienTygodnia !== null) &&
                                    <Link to={`/godzinyPracy/delete/${idWeterynarz}/${pt.DzienTygodnia}`}>
                                        <button
                                            className=" absolute inset-y-1 left-1 h-6 w-6 shadow bg-red-200 hover:bg-white  hover:text-red-300 focus:shadow-outline focus:outline-none text-white font-bold rounded"
                                            id="menu-toggle"> -
                                        </button>
                                    </Link>
                                }
                                <button
                                    className=" absolute inset-y-1 right-1 h-6 w-6 shadow bg-white text-blue-400 hover:bg-blue-300  hover:text-white focus:shadow-outline focus:outline-none  font-bold rounded"
                                    id="menu-toggle" onClick={() => {
                                    this.showInputs(5, pt.GodzinaRozpoczecia, pt.GodzinaZakonczenia)
                                }}> +
                                </button>
                            </th>
                            <td className="text-center w-full flex flex-wrap my-2 mb-10">
                                <div className="w-full">
                                    <span className=' text-s '>
                                        {getFormattedHour(pt.GodzinaRozpoczecia)} - {getFormattedHour(pt.GodzinaZakonczenia)}
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr className="border-2">
                            <th className=" mb-6  flex flex-wrap relative h-10 w-48  text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                <span
                                    className="absolute inset-0 uppercase underline">{t("harmonogram.weekdays.6")}</span>
                                {(sob.DzienTygodnia !== null) &&
                                    <Link to={`/godzinyPracy/delete/${idWeterynarz}/${sob.DzienTygodnia}`}>
                                        <button
                                            className=" absolute inset-y-1 left-1 h-6 w-6 shadow bg-red-200 hover:bg-white  hover:text-red-300 focus:shadow-outline focus:outline-none text-white font-bold rounded"
                                            id="menu-toggle"> -
                                        </button>
                                    </Link>
                                }
                                <button
                                    className=" absolute inset-y-1 right-1 h-6 w-6 shadow bg-blue-300 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold rounded"
                                    id="menu-toggle" onClick={() => {
                                    this.showInputs(6, sob.GodzinaRozpoczecia, sob.GodzinaZakonczenia)
                                }}> +
                                </button>
                            </th>
                            <td className="text-center w-full flex flex-wrap my-2 mb-10">
                                <div className="w-full">
                                    <span className=' text-s '>
                                        {getFormattedHour(sob.GodzinaRozpoczecia)} - {getFormattedHour(sob.GodzinaZakonczenia)}
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div className=" md:flex mb-6 mt-4">
                        <div className="md:w-full ">
                            <div className="flex flex-wrap -mx-3 mb-6 mt-4">
                                <span id="spec-content5"
                                      className="hidden mt-3 ml-6 mr-4 font-bold text-l  uppercase underline">
                                    {t('harmonogram.weekdays.' + data.DzienTygodnia)} </span>
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <input id="spec-content2"
                                           className="hidden form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                           name="GodzinaRozpoczecia" type="time"
                                           value={data.GodzinaRozpoczecia}
                                           onChange={this.handleChange} placeholder="Godzina Rozpoczecia"/>
                                    <span id="errorGodzinaRozpoczecia"
                                          className="errors-text2 mb-4 ">{errors.GodzinaRozpoczecia}</span>
                                </div>
                                <span id="spec-content6" className=" hidden md:visible invisible text-2xl ml-7">-</span>
                                <div className="w-full md:w-1/3 px-3 mb-6 ml-8 md:mb-0">
                                    <input id="spec-content3"
                                           className="hidden mr-5 appearance-none form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                           name="GodzinaZakonczenia" type="time"
                                           value={data.GodzinaZakonczenia}
                                           placeholder="Godzina Zakonczenia"
                                           onChange={this.handleChange}/>
                                    <span id="errorGodzinaZakonczenia"
                                          className="errors-text2 mb-4 ">{errors.GodzinaZakonczenia} </span>
                                </div>
                                <button id="spec-content4" onClick={() => {
                                    this.changeWorkingHours()
                                }}
                                        className=" hidden flex justify-end mr-14 h-10 w-46 shadow bg-white hover:bg-gray-300  hover:text-blue-400 focus:shadow-outline focus:outline-none text-blue-400 font-bold py-2 px-4 rounded">
                                    {!(czyEdycja) ?
                                        <span className="text-l font-bold "> + {t('button.add')}</span>
                                        : <span className="text-l font-bold ">+ Edytuj</span>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className=" md:flex mb-6 mt-8 ">
                        <div className="flex pb-3">
                            <Link to={`/godzinyPracyWeterynarz/${idWeterynarz}`}>
                                <button
                                    className="shadow-lg bg-red-500 hover:bg-white  hover:text-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
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

export default withTranslation()(withNavigate(withRouter(WorkingHours)))