import React from 'react'

function AvailableVisitDates(props) {
    function getHour(date) {
        const hour = date.toString().split('T');
        return hour[1].replace(':00', '');
    }

    const content =
        <div className="mt-3 mb-3">
            <div className="grid grid-cols-4 md:grid-cols-5 gap-1 md:gap-3">
                {props.harmonogram.map(time => (
                    <div key={time.IdHarmonogram}>
                        <button className="bg-purple-500 hover:bg-green-400 text-white py-1 md:px-1 rounded w-full h-full"
                                onClick={() => props.timeChange(time)}>
                            <span className="font-bold">{getHour(time.Data)} </span>{time.Weterynarz}
                        </button>
                    </div>
                ))}
            </div>
        </div>

    return (
        <>
            {props.showTime ? content : null}
        </>
    )
}

export default AvailableVisitDates;