import React, { forwardRef } from 'react'
import styled from 'styled-components'

import { Emphasize } from '../UIComponents'

const Small = styled.span`font-size:smaller`

export const Input = styled.input`
color: ${props => props.theme.variable};
background-color: ${props => props.theme.variableBg};
border: none;
&:focus {
    color: ${props => props.theme.active};
    background-color: ${props => props.theme.activeBg};
    border:none;
}`
Input.defaultProps = {
    theme: {
        inputBg: "white",
        input: "black"
    }
}
export const Label = styled.label`
margin-right: 7px;`

export const ValidationText = props => <Emphasize>
    {'\u26A0 '}<Small>{props.text}</Small>
</Emphasize>

function LabeledInput(props, ref) {
    return <><Label>{props.label}
    </Label><Input {...props} ref={ref} /></>
}
export default forwardRef(LabeledInput)

