import React from 'react'
import { Grid, Cell } from 'styled-css-grid'
import { Pill } from './UIComponents'

function Header() {
    return (<Grid columns={2}>
        <Cell>
            <Pill>
                &nbsp;{new Date().toLocaleDateString()}&nbsp;
          </Pill>
        </Cell>
        <Cell>
            <Pill>Georg Switajski&nbsp;&nbsp;&nbsp;</Pill>
        </Cell>
    </Grid>)
}

export default Header