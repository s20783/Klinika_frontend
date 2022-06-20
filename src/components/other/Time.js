import Calendar from 'react-calendar';
import Times from './Times.js'

import React from 'react'

function Time(props) {

    return (
        <div>
            {props.showTime ? <Times date={props.date} timeChange={props.timeChange} /> : null}
        </div>
    )
}

export default Time;