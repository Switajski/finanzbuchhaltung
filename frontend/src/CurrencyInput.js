import React, { forwardRef } from 'react'
import styled from 'styled-components'
import EmphasizableInput from './EmphasizableInput'

const InputAlignedRight = styled(EmphasizableInput)`
text-align:right;`

function CurrencyInput(props, ref) {

    return <InputAlignedRight
        {...props}
        emphasize={props.validationMsg}
        ref={ref}
        type='number'
        step='any' />
}
export default forwardRef(CurrencyInput);