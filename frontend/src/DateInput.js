import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Input } from './UIComponents'

const MASK = '__.__.__'
const M = MASK.split('')
const fb = ((value, fallbackValue) => value ? value : fallbackValue)
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

function DateInput(props, ref) {
    const inputRef = useRef();
    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        }
    }));

    const onChange = ({ target }) => {
        console.log(target)
        if (inputRef.current
            && (inputRef.current.selectionStart !== undefined)) {
            const rv = target.value
            const v = unmask(rv)

            if (!isNaN(v) && v.length < 7) {
                props.setValue(mask(v))
            }
        }
    }
    return <Input
        rows={1}
        ref={inputRef}
        {...props}
        placeholder={MASK}
        onChange={onChange}
        value={props.value}
    />
}
export default forwardRef(DateInput);