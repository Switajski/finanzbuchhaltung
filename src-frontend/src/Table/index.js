import React from 'react'
import styled from 'styled-components'

import NumberCell from './NumberCell'

const DateCell = styled.td`white-space: nowrap;`
const TypeAwareCell = props => {
    const { selector, ...rest } = props
    if (props.number)
        return <NumberCell {...rest} />
    if (props.date)
        return <DateCell {...rest} />
    return <td {...rest} />
}

const TableStyle = styled.table`
  width: 100%;
  border-collapse:collapse;
  @media print {
      td {
        border-bottom: 1px dotted;
      }
  }
  th, td {
    margin: 0;
    padding: 3px 5px 3px 3px;
  }
  tr:nth-child(even) {
      background-color: #06025e;
  }
  thead th {
    border-bottom: 1px solid;
  }
  tfoot th {
    border-top: 1px solid;
  }`
const TrLinkable = styled.tr`
${props => props.link && `
cursor:pointer;
&:hover {
    background-color:`+ props.theme.variableBg + ` !important;
    color:`+ props.theme.active + `;
}
`}`

const ThAlignable = styled.th`
    text-align:${({ alignRight }) => alignRight ? 'right' : 'left'};`

function Table(props) {
    return <TableStyle cellspacing="0" cellpadding="0">
        <thead>
            <tr>
                {props.attributes.map(att => <ThAlignable
                    alignRight={att.number}
                    number={att.number}
                    key={att.name}>{att.name}
                </ThAlignable>)}
            </tr>
        </thead>
        <tbody>
            {props.values && props.values.map(r =>
                <TrLinkable
                    link={props.onRowClick}
                    onClick={() => props.onRowClick && props.onRowClick(r)}
                    key={props.keySelector(r)}
                >
                    {props.attributes.map((att, i) => <TypeAwareCell
                        {...att}
                        key={i}>
                        {att.selector(r)}
                    </TypeAwareCell>)}
                </TrLinkable>
            )}
        </tbody>
        {(props.accountingSummary && props.values) && <tfoot><tr>
            {props.attributes.map(c => {
                const key = c.name
                if (c.customFooter)
                    return <NumberCell th creditDebitSuffix key={key}>
                        {c.customFooter}
                    </NumberCell>
                if (c.summarize)
                    return <NumberCell th suffix={c.summarize} key={key}>
                        {props.values.reduce((a, r) => a + c.selector(r), 0)}
                    </NumberCell>
                if (c.expressive)
                    return <NumberCell th creditDebitSuffix>
                        {props.values.reduce((a, r) => a + r.debit - r.credit, 0)}
                    </NumberCell>
                return <NumberCell th key={key} />
            })}
        </tr></tfoot>
        }
        {props.children}
    </TableStyle >
}
export default Table