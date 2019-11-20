import React, { forwardRef } from 'react'
import { ValidationText } from '../LaufendeBuchung/LabeledInput'
import EmphasizableInput from '../LaufendeBuchung/EmphasizableInput'

function DateInput(props, ref) {

    return <><EmphasizableInput
        rows={1}
        {...props}
        emphasize={props.validationMsg}
        ref={ref}
        placeholder='dd.mm.yyyy'
        value={props.value}
        type='date'
    />
        {props.validationMsg && <ValidationText
            text={props.validationMsg.message}
        />}
    </>
}
export default forwardRef(DateInput);