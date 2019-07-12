import React, { forwardRef } from 'react'
import { InputWithValidation } from './UIComponents'
import useSelectAllOnFocus from './useSelectAllOnFocus';

function Select(props, ref) {
    const inputRef = useSelectAllOnFocus(ref, props.value)

    return <label>{props.name}
        <InputWithValidation size={7} {...props}
            list={props.name}
            ref={inputRef}
        />
        <datalist id={props.name}>
            {props.options.map(o => <option key={o.value} value={o.value}>{o.value} - {o.name}</option>)}
        </datalist>
        {props.validationMsg && '\u26A0'}
    </label>
}

export default forwardRef(Select)