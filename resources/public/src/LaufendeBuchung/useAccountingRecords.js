import { useEffect, useState } from 'react'

export const indexSelector = r => parseInt(r.pos)

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

function useAccountingRecords(deps) {
    const [accountingRecords, setAccountingRecords] = useState(new Map())
    const [arMessages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchAccountingRecords = async () => {
            setLoading(true)
            try {
                const response = await failureAwareFetch('/accounting-records')
                const ars = response.slice(1)
                    .sort((a, b) => indexSelector(b) - indexSelector(a))
                    .reduce((a, ar) => {
                        a.set(indexSelector(ar), ar)
                        return a
                    }, new Map())
                setLoading(false)
                setAccountingRecords(ars)
            } catch (error) {
                setLoading(false)
                setMessages([...arMessages, error])
            }
        }
        fetchAccountingRecords()
    }, [...deps, arMessages])

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

    return { accountingRecords, arMessages, saveAccountingRecord, loading }
}

export default useAccountingRecords