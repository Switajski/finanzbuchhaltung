import React from 'react'
import styled from 'styled-components'

const ThFooter = styled.th`border-top: 1px solid;text-align:right;`

function getLang() { return (navigator.language || navigator.languages[0]); }
export const formatCurrency = n => new Intl.NumberFormat(getLang(), { style: 'currency', currency: 'EUR' }).format(round(n))

const round = raw => parseFloat(Math.round(raw * 100) / 100).toFixed(2);
const evenOn1stDecimal = v => (((v * 10) % 1) === 0 && v % 1 !== 0)
const TdRightAlign = styled.td`
text-align:right;`
const TdOrTdRightAlign = props => props.th ?
    <ThFooter {...props} />
    : <TdRightAlign {...props} />

const isZero = v => round(v) === round(0)

const FractionAwarePadding = styled.span`${props => ((props.value % 1) === 0) && 'padding-right: 1.85em;'}`

export const OldNumberCell = props => {
    const str = props.value && props.value.toLocaleString()
    return <TdOrTdRightAlign th={props.th}>
        {props.value && <><FractionAwarePadding {...props}>
            {evenOn1stDecimal(props.value) ? str + '0' : str}
        </FractionAwarePadding> &#8364;</>}
    </TdOrTdRightAlign>
}

const NumberCell = props => <TdOrTdRightAlign th={props.th}>
    {props.value && (isZero(props.value) ? 0 : formatCurrency(props.value))}
    {props.creditDebit && (props.value >= 0 ? ' H' : ' S')}
</TdOrTdRightAlign>

export default NumberCell