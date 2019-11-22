import React from 'react'
import styled from 'styled-components'
import { Grid, Cell } from 'styled-css-grid'
import { Button as RootButton } from './UIComponents'

const Button = styled(RootButton)`width:100%; 
font-size:1em;`
const SGrid = styled(Grid)`margin: 0 1px 0 1px;
@media print {
    display: none;
}`

export default function KeyboardControls(props) {
    return <SGrid columns={5}>
        {props.children}
    </SGrid>
}

export function KeyButton(props) {
    return <Cell>{props.active && <Button type='button' {...props} onClick={props.command}>
        {props.text}
    </Button>}</Cell>
}
