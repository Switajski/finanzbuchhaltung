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
color: ${props => props.theme.emphasize}`

export const Screen = styled.div`
height: 90vh;
display: block;
max-width: 1000px;
margin-left:auto;
margin-right:auto;
margin-top: 1em;`

export const Content = styled.div`
height: 100%;
overflow:hidden;
border: 1px solid;`

export const Scrollable = styled.div`
overflow:scroll;
padding:0 20px 0 20px;
height:100%`

export const Hr = styled.hr`
margin:0;
border:0.5px solid;`

export const Padding = styled.div`
padding: 5px 20px 5px 20px;`

export function StatusHeader(props) {
    return <Padding>
        <Grid columns={3}>
            <Cell>FIBU 2.1</Cell>
            <Cell ><Emphasize>
                {props.mode}
            </Emphasize></Cell>
            <Cell>laufende Buchung</Cell>
        </Grid>
    </Padding>
}

export function HorSpacer(props) {
    return <>&nbsp; &nbsp;</>
}