import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
color: ${props => props.theme.variable};
background-color: ${props => props.theme.variableBg};
border:none;
text-align:right;
margin-left: 10px;
&:focus {
    color: ${props => props.theme.active};
    background-color: ${props => props.theme.activeBg};
    border:none;
}`

function CurrencyInput(props, ref) {

    return <StyledInput
        {...props}
        type='number'
        step='any' />;
}
export default CurrencyInput;