import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
color: ${props => props.theme.variable};
background-color: ${props => props.theme.variableBg};
border:none;
margin-left: 10px;
&:focus {
    color: ${props => props.theme.active};
    background-color: ${props => props.theme.activeBg};
    border:none;
}`

function CurrencyInput(props, ref) {
    const inputRef = useRef();
    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        }
    }));
    return <StyledInput ref={inputRef} {...props} />;
}
export default forwardRef(CurrencyInput);