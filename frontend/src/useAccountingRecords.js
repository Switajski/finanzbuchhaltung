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
function createSuccessMsgObj(msg) {
    return { title: 'success', message: msg }
}

function useAccountingRecords(indexSelector, dirty) {
    const [accountingRecords, setAccountingRecords] = useState(new Map())
    const [arMessages, setMessages] = useState([])
    useEffect(() => {
        const fetchAccountingRecords = async () => {
            try {
                const response = await failureAwareFetch('/accounting-records')
                const ars = response.slice(1)
                    .sort((a, b) => indexSelector(b) - indexSelector(a))
                    .reduce((a, ar) => {
                        a.set(indexSelector(ar), ar)
                        return a
                    }, new Map())
                setAccountingRecords(ars)
            } catch (error) {
                setMessages([...arMessages, error])
            }
        }
        fetchAccountingRecords()
    }, [indexSelector, dirty])

    function saveAccountingRecord(accountingRecord) {
        const createAr = async () => {
            try {
                const url = accountingRecords.has(indexSelector(accountingRecord)) ? '/update-record' : '/create-record'
                await failureAwareFetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...accountingRecord })
                })
                setMessages([...arMessages, createSuccessMsgObj('Buchung erfolgreich gespeichert')])
            } catch (error) {
                setMessages([...arMessages, error])
            }
        }
        createAr()
    }

    return { accountingRecords, arMessages, saveAccountingRecord }
}

export default useAccountingRecords