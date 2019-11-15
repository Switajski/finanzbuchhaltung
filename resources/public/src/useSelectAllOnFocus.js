import { useImperativeHandle, useRef } from 'react'

/**
 * 
 * @param {*} ref  the ref passed next to props as parameter into the functional Component
 * @param {*} value input value that has to be selected
 * 
 * returns a ref that has to be set in the input component
 * the using component has to export it via forwardRef
 */
const useSelectAllOnFocus = (ref, value) => {
    const inputRef = useRef(null)
    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
            inputRef.current.selectionStart = 0
            if (value && value.length)
                inputRef.current.selectionEnd = value.length
        }
    }));
    return inputRef
}

export default useSelectAllOnFocus