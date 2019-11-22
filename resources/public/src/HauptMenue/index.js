import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import useKey from 'use-key-hook'

import { StatusHeader, Hr, Grid, Emphasize, Padding, Minorize } from '../UIComponents'
import { Cell } from 'styled-css-grid'

function MenuEntry(props) {
    return <li>{props.index && `[${props.index}] `}
        {props.to ? <Link {...props} /> : <Minorize>{props.children}</Minorize>}
    </li>
}
function MenuBlock(props) {
    return <>
        <Emphasize>{props.name}</Emphasize>
        <ul>
            {props.children}
        </ul>
    </>
}

function HauptMenue() {
    const [redirect, setRedirect] = useState()
    useKey(() => setRedirect('/kontenabfrage'), { detectKeys: ['6'] })
    useKey(() => setRedirect('/laufende-buchung'), { detectKeys: ['9'] })
    return redirect ? <Redirect to={redirect} /> : <>
        <StatusHeader right='Hauptmenue' />
        <Hr />
        <Padding>
            <Grid columns={6}>
                <Cell />
                <Cell width={2} >
                    <MenuBlock name='Stammdaten'>
                        <MenuEntry index={1} >Steuerschluessel</MenuEntry>
                        <MenuEntry index={2} >Konto</MenuEntry>
                        <MenuEntry index={3} >Reorganisation</MenuEntry>
                        <MenuEntry index={4} >Kontenbelegung</MenuEntry>
                    </MenuBlock>
                    <MenuBlock name='Ausdruck'>
                        <MenuEntry index={5}>Journal</MenuEntry>
                        <MenuEntry index={6} to='/kontenabfrage'>Kontenabfrage</MenuEntry>
                        <MenuEntry index={7} to='/konten-saldo'>Konten - Saldo</MenuEntry>
                        <MenuEntry index={8}>Konten - Plan</MenuEntry>
                    </MenuBlock>
                </Cell>
                <Cell width={2}>
                    <MenuBlock name='Laufende Verarbeitung'>
                        <MenuEntry index={9} to="/laufende-buchung">Laufende Buchung</MenuEntry>
                    </MenuBlock>
                    <MenuBlock name='Offene-Posten-Auswertungen'>
                        <MenuEntry index={10}>Kunde</MenuEntry>
                        <MenuEntry index={11}>Lieferant</MenuEntry>
                    </MenuBlock>
                    <MenuBlock name='Abschluss, Auswertungen'>
                        <MenuEntry index={12}>Gewinn und Verlust</MenuEntry>
                        <MenuEntry index={13}>Kontrollfunktion</MenuEntry>
                        <MenuEntry index={14}>Monatsabschluss</MenuEntry>
                    </MenuBlock>
                </Cell>
                <Cell />
            </Grid>
        </Padding>
    </>
}

export default HauptMenue