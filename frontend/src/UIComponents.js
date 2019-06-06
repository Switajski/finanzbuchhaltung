import styled from 'styled-components'

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

Input.defaultProps = {
    theme: {
        inputBg: "white",
        input: "black"
    }
}