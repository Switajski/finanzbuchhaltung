import React, { forwardRef } from 'react'
import useSelectAllOnFocus from './useSelectAllOnFocus';
import { Input } from './UIComponents'

const MASK = '__.__.__'
export const derivationByPlaceholders = (unmasked) => {
    let r = 0
    if (unmasked.length > 2)
        r = r + 1
    if (unmasked.length > 4)
        r = r + 1
    return r
}

export const mask = value => {
    let r = ''
    value.split('').forEach((v, i) => {
        if (i === 2 || i === 4) {
            if (v !== '.')
                r = r + '.'
        }
        r = r + v
    })
    return r
}
export const unmask = value => value
    .replace(/\./g, '')
    .replace(/_/g, '')
// TODO: fix deletion of a char in the middle / cursor position
// OR: just fix dots in date on blur. This auto completion help is too complicated for too little help
function DateInput(props, ref) {
    const inputRef = useSelectAllOnFocus(ref, props.value)

    const onChange = ({ target }) => {
        if (inputRef.current
            && (inputRef.current.selectionStart !== undefined)) {
            const rv = target.value
            const v = unmask(rv)

            if (!isNaN(v) && v.length < 7) {
                props.setValue(mask(v))
            }
        }
    }

    const onFocus = (args) => {
        props.onFocus(args)
    }

    return <Input
        rows={1}
        ref={inputRef}
        {...props}
        placeholder={MASK}
        onChange={onChange}
        value={props.value}
        onFocus={onFocus}
    />
}
export default forwardRef(DateInput);