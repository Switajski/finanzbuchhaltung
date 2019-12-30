import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Cell } from 'styled-css-grid'
import useKey from 'use-key-hook'

import { Padding, Grid } from '../UIComponents'

import LabeledInput from '../Common/LabeledInput'
import KeyboardControls, { KeyButton } from '../KeyboardControls'

function SelectForm(props) {
    const [redirect, setRedirect] = useState(false)
    useKey(() => setRedirect(true), { detectKeys: [27] });
    return redirect ? <Redirect to='/' /> : <form onSubmit={e => {
        e.preventDefault()
        props.onSubmit()
    }} >
        <Padding>
            <Grid columns={3}>
                <Cell><LabeledInput
                    {...props}
                    type='number'
                    style={{ width: '50px' }}
                    min='1'
                    onChange={e => props.onChange(e.target.value)}
                /></Cell>
            </Grid>
        </Padding>
        <KeyboardControls>
            <KeyButton
                active
                text='ESC: Hauptmenue'
                command={() => setRedirect(true)}
            />
            <KeyButton
                active
                text={' : ' + props.newRecordButtonText}
                symbol='&#8617;'
                command={() => props.onSubmit()}
            />
        </KeyboardControls>
    </form>
}

export default SelectForm