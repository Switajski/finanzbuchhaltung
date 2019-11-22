import { useEffect, useState } from 'react'

const failureAwareFetch = (url, opts) => {
    return fetch(url, opts)
        .then(r => {
            if (!r.ok) {
                throw new Error(r.statusText + ' at ' + r.url)
            }
            return r.json()
        })
}

function useUrlForRead(url) {
    const [result, setResult] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    useEffect(() => {
        setLoading(true)
        const fetchUrl = async () => {
            try {
                const response = await failureAwareFetch(url)
                setResult(response)
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }
        fetchUrl()
    }, [url])
    return { result, error, loading }
}

export default useUrlForRead