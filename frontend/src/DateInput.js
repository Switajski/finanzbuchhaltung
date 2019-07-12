import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { InputWithValidation, Emphasize } from './UIComponents'

function DateInput(props, ref) {
    const inputRef = useRef(null)
    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        }
    }));

    const onFocus = (args) => {
        props.onFocus(args)
    }

    return <><InputWithValidation
        rows={1}
        ref={inputRef}
        {...props}
        placeholder='dd.mm.yyyy'
        value={props.value}
        onFocus={onFocus}
        type='date'
    />
        <Emphasize>{props.validationMsg && '\u26A0'}</Emphasize>
    </>
}
export default forwardRef(DateInput);