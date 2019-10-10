import React from 'react'
import { ValidationText } from './LabeledInput'
import EmphasizableInput from './EmphasizableInput'

function TextInput(props) {
    return <>
        <EmphasizableInput {...props} emphasize={props.validationMsg} />
        {props.validationMsg && <ValidationText
            text={props.validationMsg.message}
        />}
    </>
}

export default TextInput
