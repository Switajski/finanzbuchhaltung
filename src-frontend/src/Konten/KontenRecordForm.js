import React from 'react'

import { Padding } from '../UIComponents'
import { EditFormKeyboardControls } from '../KeyboardControls'

function KontenRecordForm(props) {
    return <>
        <Padding><form onSubmit={props.onSubmit}>editing...</form></Padding>
        <EditFormKeyboardControls cancel={props.cancel} />
    </>
}

export default KontenRecordForm