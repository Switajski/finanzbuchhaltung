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

const evenOn1stDecimal = v => (((v * 10) % 1) === 0 && v % 1 !== 0)
const NumberFormatStyle = styled.td`
text-align:right;`
const FractionAwarePadding = styled.span`${props => ((props.value % 1) === 0) && 'padding-right: 1.85em;'}`
export const NumberCell = props => {
    const str = props.value.toLocaleString()
    return <NumberFormatStyle>
        <FractionAwarePadding {...props}>
            {evenOn1stDecimal(props.value) ? str + '0' : str}
        </FractionAwarePadding>&#8364;
    </NumberFormatStyle>
}

function Table(props) {
    return <FullWidthTable>
        <Thead>
            <tr>{props.attributes.map(att => <Th key={att.name}>{att.name}</Th>)}</tr>
        </Thead>
        <tbody>
            {props.values && Array.from(props.values, ([k, v]) => v).map(r =>
                <TrWithHover onClick={() => props.onRowClick(r)}
                    key={props.keySelector(r)}>
                    {props.attributes.map((att, i) => att.number
                        ? <NumberCell value={att.selector(r)} key={i} />
                        : <td key={i}>{att.selector(r)}</td>
                    )}
                </TrWithHover>
            )}
        </tbody>
    </FullWidthTable>
}

export default Table