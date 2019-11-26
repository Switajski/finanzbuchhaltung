import React from 'react'
import styled from 'styled-components'

const ThRightAlign = styled.th`text-align:right;`

const amount = v => v < 0 ? -v : v
export const formatCurrency = n => new Intl.NumberFormat().format(round(n))

const isZero = v => round(v) === round(0)
const round = raw => raw && parseFloat(Math.round(raw * 100) / 100).toFixed(2);
const evenOn1stDecimal = v => (((v * 10) % 1) === 0 && v % 1 !== 0)

const TdRightAlign = styled.td`text-align:right;`
const TdOrThRightAlign = props => props.th ?
    <ThRightAlign {...props} />
    : <TdRightAlign {...props} />

const Suffix = ({ children }) => <>&nbsp;{children}</>

const FractionAwarePadding = styled.span`${({ value }) => ((value % 1) === 0) && 'padding-right: 1.85em;'}`

export const NumberCell = ({ children, th, creditDebitSuffix, suffix }) => {
    const value = children
    if (value === undefined)
        return <TdOrThRightAlign th={th} />
    if (isZero(value))
        return <TdOrThRightAlign th={th}>0{(creditDebitSuffix || suffix) && <>&nbsp;&nbsp;</>}</TdOrThRightAlign>

    const minus = (value < 0)
    const str = (creditDebitSuffix ? amount(value) : value).toLocaleString()
    return <TdOrThRightAlign th={th}>
        {value && <><FractionAwarePadding value={value}>
            {evenOn1stDecimal(value) ? str + '0' : str}
        </FractionAwarePadding>
            {suffix && <Suffix>{suffix}</Suffix>}
            {creditDebitSuffix && <Suffix>{minus ? 'S' : 'H'}</Suffix>}
        </>}
    </TdOrThRightAlign>
}

export default NumberCell