import { useEffect, useRef } from 'react'

const useKeys = (callback, deps) => {
    const savedCallback = useRef();
    useEffect(() => savedCallback.current = callback)

    useEffect(() => {
        window.addEventListener('keyup', savedCallback.current);
        return () => window.removeEventListener('keyup', savedCallback.current)
    }, deps)
}

export default useKeys