import React from 'react';

function Times(props) {

    function getHour(date) {
        const hour = date.toString().split('T');
        return hour[1].replace(':00', '');
    }

    return (
        <div class="px-2 mt-3 mb-3">
            <div class="grid grid-cols-5 gap-3 mx-10">
                {props.date.map(times => (
                    <div key={times.Id_Harmonogram}>
                        <label className="bg-purple-400 hover:bg-green-400 text-white py-1 px-3 rounded"
                            onClick={() => props.timeChange(times.IdHarmonogram, times.Data)}>
                            {getHour(times.Data)} {times.Weterynarz}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Times;