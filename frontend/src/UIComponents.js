import React from 'react'
import styled from 'styled-components'
import CurrencyInput from 'react-currency-input'

export const Pill = styled.span`
background-color: ${props => props.theme.variableBg};
color: ${props => props.theme.header};`

export const Input = styled.input`
color: ${props => props.theme.variable};
background-color: ${props => props.theme.variableBg};
border:none;
margin-left: 10px;
&:focus {
    color: ${props => props.theme.active};
    background-color: ${props => props.theme.activeBg};
    border:none;
}`

const MoneyInputO = styled(CurrencyInput)`
color: ${props => props.theme.variable};
background-color: ${props => props.theme.variableBg};
border:none;
margin-left: 10px;
&:focus {
    color: ${props => props.theme.active};
    background-color: ${props => props.theme.activeBg};
    border:none;
}`
export function MoneyInput(props) {
    return <MoneyInputO {...props} decimalSeparator="," thousandSeparator="." />
}

Input.defaultProps = {
    theme: {
        inputBg: "white",
        input: "black"
    }
}
export const Hr = styled.hr`
margin:0;
border:0.5px solid;`