import React from 'react'
import styled from 'styled-components'
import { Grid as OGrid, Cell } from 'styled-css-grid'

export const Grid = styled(OGrid)`grid-gap:0;`

export const Pill = styled.span`
background-color: ${props => props.theme.variableBg};
color: ${props => props.theme.header};`

// TODO: is there a nicer way to copy style from Pill?
export const Button = styled.button`
background-color: ${props => props.theme.variableBg};
color: ${props => props.active ? props.theme.header : props.theme.brightGrey};
border: 0;`

export const Emphasize = styled.span`
@media not print {
    color: ${props => props.theme.emphasize}
}`

export const Minorize = styled.span`
color: ${props => props.theme.minor}`

export const UpperCase = styled.p`
text-transform: uppercase`

export const Screen = styled.div`
@media not print {
    height: 90vh;
}
display: block;
max-width: 1000px;
margin-left:auto;
margin-right:auto;
margin-top: 1em;`

export const Content = styled.div`
height: 100%;
display: flex;
flex-flow: column;
overflow:hidden;
@media not print {border: 1px solid;}`

export const Scrollable = styled.div`
overflow:scroll;
padding:0 20px 0 20px;
flex-grow : 1;`

export const Hr = styled.hr`
margin:0;
border:0.5px solid;`

export const Padding = styled.div`
padding: 5px 20px 5px 20px;`

export function StatusHeader(props) {
    return <>
        <Grid columns={6}>
            <Cell middle center>FIBU 2.1</Cell>
            <Cell {...props} width={props.join ? 5 : 3}>{props.children}</Cell>
            {!props.join && <Cell width={2} middle>{props.right}</Cell>}
        </Grid>
        <Hr />
    </>
}

export function HorSpacer() {
    return <>&nbsp; &nbsp;</>
}

export const Centered = styled.div`height: 100%;
display: flex;
align-items: center;
justify-content: center;`

export function Loading() {
    return <Centered><Emphasize>laedt...</Emphasize></Centered>
}

export function Failed() {
    return <Centered><Emphasize>Konnte Daten aufgrund eines Serverfehlers nicht laden</Emphasize></Centered>
}