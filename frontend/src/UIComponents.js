import React from 'react'
import styled from 'styled-components'
import { Grid, Cell } from 'styled-css-grid'

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
max-width:900px;
margin-left:auto;
margin-right:auto;
margin-top: 1em;`

export const Content = styled.div`
height: 100%;
overflow:hidden;
border: 1px solid;`

export const Table = styled.table`
width: 100%;`
export const TrWithHover = styled.tr`
cursor:pointer;
&:hover {
    background-color: ${props => props.theme.variableBg};
    color: ${props => props.active};
}`
export const Thead = styled.thead`text-align: left;`
export const Th = styled.th`border-bottom: 1px solid;`

export const Scrollable = styled.div`
overflow:scroll;
padding:0 20px 0 20px;
height:100%`

export const Input = styled.input`
color: ${props => props.theme.variable};
background-color: ${props => props.theme.variableBg};
border:none;
margin-left: 10px;
&:focus {
    color: ${props => props.theme.active};
    background-color: ${props => props.theme.activeBg};
    border:none;
}`

Input.defaultProps = {
    theme: {
        inputBg: "white",
        input: "black"
    }
}

export const Hr = styled.hr`
margin:0;
border:0.5px solid;`

export function Exceptions(props) {
    return (props.exceptions && props.exceptions.length > 0) ? <div>
        <h3>Exception occured</h3>
        {props.exceptions.map(e => <>
            <h4>{e.message}</h4>
            {JSON.stringify(e)}
        </>)}
    </div>
        : <></>
}

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