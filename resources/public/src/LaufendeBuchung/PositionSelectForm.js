import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Cell } from 'styled-css-grid'
import useKey from 'use-key-hook'

import { Padding, Grid } from '../UIComponents'

import LabeledInput from './LabeledInput'
import KeyboardControls, { KeyButton } from '../KeyboardControls'

function PositionSelectInputForm(props) {
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
            <KeyButton />
            <KeyButton />
            <KeyButton />
            <KeyButton
                active
                text='&#8617; : neue Buchung'
                command={() => props.onSubmit()}
            />
        </KeyboardControls>
    </form>
}

export default PositionSelectInputForm