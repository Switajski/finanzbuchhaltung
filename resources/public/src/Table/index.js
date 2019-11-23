import React from 'react'
import styled from 'styled-components'

import NumberCell from './NumberCell'

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
const ThRightAligned = styled(Th)`text-align: right;`

function Table(props) {
    return <FullWidthTable>
        <Thead>
            <tr>{props.attributes.map(att => att.number ? <ThRightAligned key={att.name}>{att.name}</ThRightAligned>
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
                if (conf === 'D') return <NumberCell th
                    value={props.values.reduce((a, r) => a + r.debit, 0)} />
                if (conf === 'C') return <NumberCell th
                    value={props.values.reduce((a, r) => a + r.credit, 0)} />
                if (conf === 'S') return <NumberCell th creditDebit
                    value={props.values.reduce((a, r) => a + r.debit - r.credit, 0)} />
                else return <NumberCell th />
            })}
        </tr></tfoot>}
        {props.children}
    </FullWidthTable>
}
export default Table