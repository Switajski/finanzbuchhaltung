import { useState, useEffect } from 'react';

const failureAwareFetch = (url, opts) => {
    return fetch(url, opts)
        .then(r => {
            if (!r.ok) {
                throw new Error({
                    ...r,
                    name: r.status,
                    status: r.status,
                    message: r.statusText,
                    url: r.url
                })
            }
            return r.json()
        })
}

const useAccountPlan = () => {
    const [accountPlan, setAPlan] = useState(new Map())
    const [taxes, setTaxes] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            setIsError(false)

            try {
                const accountPlanR = await failureAwareFetch("/account-plan")
                const accountPlan = accountPlanR.slice(1)
                    .reduce((a, account) => {
                        a.set(account.konto_nr, account.name_kont)
                        return a
                    }, new Map())

                setAPlan(accountPlan)
                const taxes = await failureAwareFetch("/taxes")
                setTaxes(taxes)
            } catch (error) {
                setIsError(true)
            }
            setIsLoading(false)
        }
        fetchData();
    }, [])

    return [{ accountPlan, taxes, isLoading, isError }]
}

export default useAccountPlan