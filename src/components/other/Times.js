import React from 'react';

function Times(props) {

    function getHour(date) {
        const hour = date.toString().split('T');
        return hour[1].replace(':00', '');
    }

    return (
        <div className="md:px-2 mt-3 mb-3">
            <div className="grid grid-cols-4 md:grid-cols-5 gap-1 md:gap-3 md:mx-10">
                {props.harmonogram.map(time => (
                    <div key={time.IdHarmonogram}>
                        <button className="bg-purple-400 hover:bg-green-400 text-white py-1 rounded w-full h-full"
                               onClick={() => props.timeChange(time)}>
                            <span className="font-bold">{getHour(time.Data)} </span>{time.Weterynarz}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Times;