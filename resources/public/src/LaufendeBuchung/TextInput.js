import React, { forwardRef } from 'react'
import { ValidationText } from './LabeledInput'
import EmphasizableInput from './EmphasizableInput'

function TextInput(props, ref) {
    return <>
        <EmphasizableInput {...props}
            ref={ref} emphasize={props.validationMsg} />
        {props.validationMsg && <ValidationText
            text={props.validationMsg.message}
        />}
    </>
}

export default forwardRef(TextInput)
