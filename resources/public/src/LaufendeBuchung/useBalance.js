import { useEffect, useState } from 'react'

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
const fetchBalance = async (debitAccount) => {
    return await failureAwareFetch('/balance?accountNo=' + debitAccount)
}

const useBalance = ({ accountPlan, debitAccount, creditAccount }) => {
    const [balanceErrored, setError] = useState(false)
    const [debitBalance, setDebitBalance] = useState()
    const [creditBalance, setCreditBalance] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (accountPlan.has(debitAccount)) {
                    const r = await fetchBalance(debitAccount)
                    setDebitBalance(r.sum)
                } else setDebitBalance(undefined)
                if (accountPlan.has(creditAccount)) {
                    const r = await fetchBalance(creditAccount)
                    setCreditBalance(r.sum)
                } else setCreditBalance(undefined)
            } catch (error) {
                setError(true)
            }
        }
        fetchData()

    }, [accountPlan, debitAccount, creditAccount])

    return [{ creditBalance, debitBalance }, balanceErrored]
}

export default useBalance