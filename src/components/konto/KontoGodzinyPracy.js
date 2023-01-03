import React from "react";
import KontoMenu from "../fragments/KontoMenu";
import {withTranslation} from "react-i18next";
import {getKontoGodzinyPracyList} from "../../axios/GodzinyPracyAxiosCalls";
import {getFormattedDate, getFormattedHour} from "../other/dateFormat";
import {getKontoUrlopList} from "../../axios/UrlopAxiosCalls";
import axios from "axios";

let CancelToken
let source

class KontoGodzinyPracy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: '',
            message: '',
            user: '',
            godzinyPracy: [],
            urlopy: []
        }
    }

    async componentDidMount() {
        CancelToken = axios.CancelToken;
        source = CancelToken.source();
        const {navigate} = this.props;
        try {

            await getKontoGodzinyPracyList(source)
                .then((res) => {
                    if (res) {
                        console.log(res.data)
                        this.setState({
                            godzinyPracy: res.data
                        });
                    }
                })
            await getKontoUrlopList(source)
                .then((res) => {
                    if (res) {
                        console.log(res.data)
                        this.setState({
                            isLoaded: true,
                            urlopy: res.data
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
    render() {
        const {error, urlopy, godzinyPracy} = this.state
        const {t} = this.props;

        return (
            <div class="container w-full flex flex-wrap mx-auto px-2  lg:pt-3 mt-3">
                <KontoMenu/>
                <div
                    class="w-full  lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">

                    <div className="flex justify-between mt-8">
                        <h2 className=" w-1/3 my-2 mb-6 text-2xl font-black leading-tight text-gray-800">
                            {t('godzinyPracy.title')}</h2>
                    </div>
                    <div className="shadow-xl">
                        <table
                            className="w-full text-center flex flex-wrap mb-12 text-gray-700 dark:text-gray-400">
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
                    </div>
                    <div className="flex justify-between 6">
                        <h2 className=" w-1/3 my-2 mb-6 text-2xl font-black leading-tight text-gray-800">
                            {t('urlop.title')}</h2>
                    </div>
                    {(urlopy.length !== 0) &&
                        <div className="relative overflow-x-auto shadow-xl sm:rounded-lg ">
                            <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
                                <thead
                                    className="text-s text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                </thead>
                                <tbody>
                                {urlopy.map(x => (
                                    <tr className="relative bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600"
                                        key={x.IdUrlop}>
                                        <td className=" px-6 py-2">• {getFormattedDate(x.Dzien)}</td>

                                    </tr>
                                ))}
                                </tbody>
                            </table>

                        </div>
                    }
                </div>
            </div>
        )
    }
}

// const withRouter = WrappedComponent => props => {
//     const params = useParams();
//     return (
//         <WrappedComponent
//             {...props}
//             params={params}
//         />
//     );
// };

export default withTranslation()(KontoGodzinyPracy);