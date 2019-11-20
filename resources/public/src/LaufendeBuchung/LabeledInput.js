import React, { forwardRef } from 'react'
import styled from 'styled-components'

import { Emphasize } from '../UIComponents'

const Small = styled.span`font-size:smaller`

export const Input = styled.input`
color: ${props => props.theme.variable};
background-color: ${props => props.theme.variableBg};
border: none;
margin-left: 10px;
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

export const ValidationText = props => <Emphasize>
    {'\u26A0 '}<Small>{props.text}</Small>
</Emphasize>

function LabeledInput(props, ref) {
    return <label>{props.label}<Input {...props} ref={ref} />
    </label>
}
export default forwardRef(LabeledInput)

