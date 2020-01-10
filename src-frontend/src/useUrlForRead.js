import { useEffect, useState } from 'react'

function useUrlForRead(url) {
    const [result, setResult] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    useEffect(() => {
        setLoading(true)
        const fetchUrl = async () => {
            try {
                const response = await fetch(url)
                    .then(r => {
                        if (!r.ok) {
                            throw new Error(r.statusText + ' at ' + r.url)
                        }
                        return r.json()
                    })
                setLoading(false)
                setResult(response)
            } catch (error) {
                setLoading(false)
                setError(error)
            }
        }
        fetchUrl()
    }, [url])
    return { result, error, loading }
}

export const useAccountPlanAttributes = () => useUrlForRead('/account-plan-atts')
export const useAccountPlan = () => useUrlForRead('/account-plan')

export default useUrlForRead