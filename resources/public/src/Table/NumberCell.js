import React from 'react'
import styled from 'styled-components'

const ThFooter = styled.th`border-top: 1px solid;text-align:right;`

const amount = v => v < 0 ? -v : v
export const formatCurrency = n => new Intl.NumberFormat().format(round(n))

const isZero = v => round(v) === round(0)
const round = raw => raw && parseFloat(Math.round(raw * 100) / 100).toFixed(2);
const evenOn1stDecimal = v => (((v * 10) % 1) === 0 && v % 1 !== 0)

const TdRightAlign = styled.td`
text-align:right;`
const TdOrThRightAlign = props => props.th ?
    <ThFooter {...props} />
    : <TdRightAlign {...props} />

const Suffix = ({ children }) => <>&nbsp;{children}</>

const FractionAwarePadding = styled.span`${({ value }) => ((value % 1) === 0) && 'padding-right: 1.85em;'}`

export const OldNumberCell = ({ children, th, creditDebitSuffix, suffix }) => {
    const value = children
    if (value === undefined)
        return <TdOrThRightAlign th={th} />
    if (isZero(value))
        return <TdOrThRightAlign th={th}>0</TdOrThRightAlign>

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

// const NumberCell = props => <TdOrThRightAlign th={props.th}>
//     {props.children && (isZero(props.children) ? 0 : formatCurrency(props.children))}
//     {props.creditDebit && (props.children >= 0 ? ' H' : ' S')}
// </TdOrThRightAlign>

export default OldNumberCell