import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react'
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
    const inputRef = useRef();
    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        }
    }));
    const [value, setValue] = useState('')

    const onChange = ({ target }) => {
        const v = target.value.replace(',', '.')
        if (!isNaN(v))
            setValue(target.value)
    }
    return <StyledInput ref={inputRef} {...props} onChange={onChange} value={value} />;
}
export default forwardRef(CurrencyInput);