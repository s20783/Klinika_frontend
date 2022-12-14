import {useTranslation} from "react-i18next";
import dayjs from "dayjs";
import React from "react";
import {getFormattedDate1} from "../other/dateFormat"

function Harmonogram(props) {
    const {t} = useTranslation();
    const harmonogram = props.harmonogram
    const weterynarz = props.weterynarz
    const start = props.start
    const end = props.end
    console.log(harmonogram)

    return (

        <div>
            <h2 className="mt-6 w-full my-2 mb-6  text-2xl font-bold leading-tight text-left text-gray-500">
                {getFormattedDate1(start)}<span className="mx-3  "> - </span>{getFormattedDate1(end)}</h2>
            <table
                className="w-full text-center flex flex-wrap  text-gray-700 dark:text-gray-400">
                <tr></tr>
                <tr className="shadow-xl rounded-lg">
                    <th className="shadow-xl rounded-lg mb-6 mt-2 flex flex-wrap relative h-10 w-48  text-gray-700 uppercase underline dark:bg-gray-700 dark:text-gray-400">
                      <span className="absolute inset-0 text-xl uppercase underline"> {t("harmonogram.weekdays.1")}</span> </th>
                    {harmonogram.map(x => (
                        (x.Dzien === 1) &&
                        <td className="text-center  w-full flex flex-wrap my-2 ">
                            <div className={(x.CzyZajete === false)
                                ? ' border-l-4 border-green-300 mx-2 w-full' :
                                ' border-l-4 border-red-300 mx-2 w-full'
                            }>
                                <div className="w-full">
                                            <span className={(x.Weterynarz === null || weterynarz === null)
                                                ? ' text-s ' :
                                                'text-s font-bold'
                                            }>
                                                {dayjs(x.Data).format("HH:mm")} - {dayjs(x.Data).add(30, "minute").format("HH:mm")}
                                            </span>
                                </div>
                                <span className="w-full text-s">{x.Weterynarz}</span>
                            </div>
                        </td>
                    ))}
                </tr>
                <tr className="shadow-xl rounded-lg">
                    <th className="shadow-xl rounded-lg mb-6 mt-2 flex flex-wrap relative h-10 w-48  text-gray-700 uppercase underline dark:bg-gray-700 dark:text-gray-400">
                        <span className="absolute inset-0 text-xl uppercase underline"> {t("harmonogram.weekdays.2")}</span> </th>
                    {harmonogram.map(x => (
                        (x.Dzien === 2) &&
                        <td className="text-center  w-full flex flex-wrap my-2 ">
                            <div className={(x.CzyZajete === false)
                                ? ' border-l-4 border-green-300 mx-2 w-full' :
                                ' border-l-4 border-red-300 mx-2 w-full'
                            }>
                                <div className="w-full">
                                            <span className={(x.Weterynarz === null || weterynarz === null)
                                                ? ' text-s ' :
                                                'text-s font-bold'
                                            }>
                                                {dayjs(x.Data).format("HH:mm")} - {dayjs(x.Data).add(30, "minute").format("HH:mm")}
                                            </span>
                                </div>
                                <span className="w-full text-s">{x.Weterynarz}</span>
                            </div>
                        </td>
                    ))}
                </tr>
                <tr className="shadow-xl rounded-lg">
                    <th className="shadow-xl rounded-lg mb-6 mt-2 flex flex-wrap relative h-10 w-48  text-gray-700 uppercase underline dark:bg-gray-700 dark:text-gray-400">
                        <span className="absolute inset-0 text-xl uppercase underline"> {t("harmonogram.weekdays.3")}</span> </th>
                    {harmonogram.map(x => (
                        (x.Dzien === 3) &&
                        <td className="text-center  w-full flex flex-wrap my-2 ">
                            <div className={(x.CzyZajete === false)
                                ? ' border-l-4 border-green-300 mx-2 w-full' :
                                ' border-l-4 border-red-300 mx-2 w-full'
                            }>
                                <div className="w-full">
                                            <span className={(x.Weterynarz === null || weterynarz === null)
                                                ? ' text-s ' :
                                                'text-s font-bold'
                                            }>
                                                {dayjs(x.Data).format("HH:mm")} - {dayjs(x.Data).add(30, "minute").format("HH:mm")}
                                            </span>
                                </div>
                                <span className="w-full text-s">{x.Weterynarz}</span>
                            </div>
                        </td>
                    ))}
                </tr>
                <tr className="shadow-xl rounded-lg">
                    <th className="shadow-xl rounded-lg mb-6 mt-2 flex flex-wrap relative h-10 w-48  text-gray-700 uppercase underline dark:bg-gray-700 dark:text-gray-400">
                        <span className="absolute inset-0 text-xl uppercase underline"> {t("harmonogram.weekdays.4")}</span> </th>
                    {harmonogram.map(x => (
                        (x.Dzien === 4) &&
                        <td className="text-center  w-full flex flex-wrap my-2 ">
                            <div className={(x.CzyZajete === false)
                                ? ' border-l-4 border-green-300 mx-2 w-full' :
                                ' border-l-4 border-red-300 mx-2 w-full'
                            }>
                                <div className="w-full">
                                            <span className={(x.Weterynarz === null || weterynarz === null)
                                                ? ' text-s ' :
                                                'text-s font-bold'
                                            }>
                                                {dayjs(x.Data).format("HH:mm")} - {dayjs(x.Data).add(30, "minute").format("HH:mm")}
                                            </span>
                                </div>
                                <span className="w-full text-s">{x.Weterynarz}</span>
                            </div>
                        </td>
                    ))}
                </tr>
                <tr className="shadow-xl rounded-lg">
                    <th className="shadow-xl rounded-lg mb-6 mt-2 flex flex-wrap relative h-10 w-48  text-gray-700 uppercase underline dark:bg-gray-700 dark:text-gray-400">
                        <span className="absolute inset-0 text-xl uppercase underline"> {t("harmonogram.weekdays.5")}</span> </th>
                    {harmonogram.map(x => (
                        (x.Dzien === 5) &&
                        <td className="text-center  w-full flex flex-wrap my-2 ">
                            <div className={(x.CzyZajete === false)
                                ? ' border-l-4 border-green-300 mx-2 w-full' :
                                ' border-l-4 border-red-300 mx-2 w-full'
                            }>
                                <div className="w-full">
                                            <span className={(x.Weterynarz === null || weterynarz === null)
                                                ? ' text-s ' :
                                                'text-s font-bold'
                                            }>
                                                {dayjs(x.Data).format("HH:mm")} - {dayjs(x.Data).add(30, "minute").format("HH:mm")}
                                            </span>
                                </div>
                                <span className="w-full text-s">{x.Weterynarz}</span>
                            </div>
                        </td>
                    ))}
                </tr>
                <tr className="shadow-xl rounded-lg border-r ">
                    <th className="shadow-xl rounded-lg mb-6 mt-2  flex flex-wrap relative h-10 w-48  text-gray-700 uppercase underline dark:bg-gray-700 dark:text-gray-400">
                        <span className="absolute inset-0 text-xl uppercase underline"> {t("harmonogram.weekdays.6")}</span> </th>
                    {harmonogram.map(x => (
                        (x.Dzien === 6) &&
                        <td className="text-center  w-full flex flex-wrap my-2 ">
                            <div className={(x.CzyZajete === false)
                                ? ' border-l-4 border-green-300 mx-2 w-full' :
                                ' border-l-4 border-red-300 mx-2 w-full'
                            }>
                                <div className="w-full">
                                            <span className={(x.Weterynarz === null || weterynarz === null)
                                                ? ' text-s ' :
                                                'text-s font-bold'
                                            }>
                                                {dayjs(x.Data).format("HH:mm")} - {dayjs(x.Data).add(30, "minute").format("HH:mm")}
                                            </span>
                                </div>
                                <span className="w-full text-s">{x.Weterynarz}</span>
                            </div>
                        </td>
                    ))}
                </tr>
            </table>
        </div>
    )
}

export default Harmonogram