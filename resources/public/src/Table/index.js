import React from 'react'
import styled from 'styled-components'

import NumberCell from './NumberCell'

const DateCell = styled.td`white-space: nowrap;`
const TypeAwareCell = props => {
    if (props.number)
        return <NumberCell {...props} />
    if (props.date)
        return <DateCell {...props} />
    return <td {...props} />
}

const Thead = styled.thead`text-align: left;`
const FullWidthTable = styled.table`
width: 100%;`
const TrWithHover = styled.tr`
cursor:pointer;
&:hover {
    background-color: ${props => props.theme.variableBg};
    color: ${props => props.active};
}`
const TrLinkAware = props => props.link ? <TrWithHover {...props} /> : <tr {...props} />

const Th = styled.th`border-bottom: 1px solid;`
const ThRightAligned = styled(Th)`text-align: right;`
const ThNumberAware = props => props.number ? <ThRightAligned {...props} /> : <Th {...props} />

function Table(props) {
    return <FullWidthTable>
        <Thead>
            <tr>{props.attributes.map(att => <ThNumberAware
                number={att.number}
                key={att.name}>{att.name}
            </ThNumberAware>)}
            </tr>
        </Thead>
        <tbody>
            {props.values && props.values.map(r =>
                <TrLinkAware
                    link={props.onRowClick}
                    onClick={() => props.onRowClick && props.onRowClick(r)}
                    key={props.keySelector(r)}
                >
                    {props.attributes.map((att, i) => <TypeAwareCell
                        {...att}
                        key={i}>
                        {att.selector(r)}
                    </TypeAwareCell>)}
                </TrLinkAware>
            )}
        </tbody>
        {(props.accountingSummary && props.values) && <tfoot><tr>
            {props.attributes.map(c => {
                if (c.summarize === 'D')
                    return <NumberCell th suffix='H'>
                        {props.values.reduce((a, r) => a + c.selector(r), 0)}
                    </NumberCell>
                else if (c.summarize === 'C') return <NumberCell th suffix='S'>
                    {props.values.reduce((a, r) => a + c.selector(r), 0)}
                </NumberCell>
                else if (c.summarize === 'S') return <NumberCell th creditDebitSuffix>
                    {props.values.reduce((a, r) => a + r.debit - r.credit, 0)}
                </NumberCell>
                else if (c.customFooter)
                    return <NumberCell th creditDebitSuffix>{c.customFooter}</NumberCell>
                else return <NumberCell th />
            })}
        </tr></tfoot>
        }
        {props.children}
    </FullWidthTable >
}
export default Table