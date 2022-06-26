import Times from './Times.js'

import React from 'react'

function Time(props) {

    return (
        <div>
            {props.showTime ? <Times harmonogram={props.harmonogram} timeChange={props.timeChange} /> : null}
        </div>
    )
}

export default Time;