import React from 'react'
import styled from 'styled-components'

const FullWidthTable = styled.table`
width: 100%;`
const TrWithHover = styled.tr`
cursor:pointer;
&:hover {
    background-color: ${props => props.theme.variableBg};
    color: ${props => props.active};
}`
const Thead = styled.thead`text-align: left;`
const Th = styled.th`border-bottom: 1px solid;`
const ThFooter = styled.th`border-top: 1px solid;text-align:right;`
const NumberTh = styled(Th)`text-align: right;`

const evenOn1stDecimal = v => (((v * 10) % 1) === 0 && v % 1 !== 0)
const NumberFormatStyle = styled.td`
text-align:right;`
const FractionAwarePadding = styled.span`${props => ((props.value % 1) === 0) && 'padding-right: 1.85em;'}`
export const NumberCell = props => {
    const str = props.value && props.value.toLocaleString()
    return <NumberFormatStyle>
        {props.value && <><FractionAwarePadding {...props}>
            {evenOn1stDecimal(props.value) ? str + '0' : str}
        </FractionAwarePadding> &#8364;</>}
    </NumberFormatStyle>
}

function getLang() { return (navigator.language || navigator.languages[0]); }
export const formatCurrency = n => new Intl.NumberFormat(getLang(), { style: 'currency', currency: 'EUR' }).format(n)


function Table(props) {
    let saldo = ''
    if (props.accountingSummary && props.values) {
        let s = props.values.reduce((a, r) => a + r.debit - r.credit, 0)

        saldo = formatCurrency((s > 0) ? s : -s) + ' ' + (s > 0 ? 'H' : 'S')
    }

    return <FullWidthTable>
        <Thead>
            <tr>{props.attributes.map(att => att.number ? <NumberTh key={att.name}>{att.name}</NumberTh>
                : <Th key={att.name}>{att.name}</Th>)}</tr>
        </Thead>
        <tbody>
            {props.values && props.values.map(r =>
                <TrWithHover onClick={() => props.onRowClick && props.onRowClick(r)}
                    key={props.keySelector(r)}>
                    {props.attributes.map((att, i) => att.number
                        ? <NumberCell value={att.selector(r)} key={i} />
                        : <td key={i}>{att.selector(r)}</td>
                    )}
                </TrWithHover>
            )}
        </tbody>
        {(props.accountingSummary && props.values) && <tfoot><tr>
            {props.attributes.map(c => c.summarize).map(conf => {
                if (conf === 'D') return <ThFooter>{formatCurrency(props.values.reduce((a, r) => a + r.debit, 0))}</ThFooter>
                if (conf === 'C') return <ThFooter>{formatCurrency(props.values.reduce((a, r) => a + r.credit, 0))}</ThFooter>
                if (conf === 'S') return <ThFooter>Saldo: {saldo}</ThFooter>
                else return <ThFooter />
            })}
        </tr></tfoot>}
        {props.children}
    </FullWidthTable>
}
export default Table