import React from 'react'
import { Cell } from 'styled-css-grid'

import { Padding, Grid } from './UIComponents'

import LabeledInput from './LabeledInput'
import KeyboardControls, { KeyButton } from './KeyboardControls'

function PositionSelectInputForm(props) {
    return <form onSubmit={e => {
        e.preventDefault()
        props.onSubmit()
    }} >
        <Padding>
            <Grid columns={3}>
                <Cell><LabeledInput
                    {...props}
                    onChange={e => props.onChange(parseInt(e.target.value))}
                /></Cell>
            </Grid>
        </Padding>
        <KeyboardControls>
            <KeyButton />
            <KeyButton />
            <KeyButton />
            <KeyButton />
            <KeyButton
                active
                text='Enter: neue Buchung'
                command={() => props.onSubmit()}
            />
        </KeyboardControls>
    </form>
}

export default PositionSelectInputForm