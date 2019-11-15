import React, { forwardRef } from 'react'
import { ValidationText } from './LabeledInput'
import EmphasizableInput from './EmphasizableInput'

function Select(props, ref) {

    return <>
        <EmphasizableInput size={7}
            {...props}
            emphasize={props.validationMsg}
            ref={ref}
            list={props.name}
        />
        <datalist id={props.name}>
            {props.options.map(o => <option
                key={o.value}
                value={o.value} >
                {o.value} - {o.name}
            </option>)}
        </datalist>
        {props.validationMsg && <ValidationText
            text={props.validationMsg.message}
        />}
    </>
}

export default forwardRef(Select)