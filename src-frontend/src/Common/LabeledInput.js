import React, { forwardRef } from 'react'
import styled from 'styled-components'

import { Emphasize } from '../UIComponents'

const Style = styled.span`
font-size:smaller;`
const NoWrap = styled.span`
white-space: nowrap;`

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

export const ValidationText = props => <NoWrap><Emphasize>
    {'\u26A0 '}<Style>{props.text}</Style>
</Emphasize></NoWrap>

function LabeledInput(props, ref) {
    return <><Label><NoWrap>{props.label}</NoWrap>
    </Label><Input {...props} ref={ref} /></>
}
export default forwardRef(LabeledInput)

