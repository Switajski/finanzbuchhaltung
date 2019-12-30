import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link, Redirect } from 'react-router-dom'
import { useAlert } from 'react-alert'

import { StatusHeader, Emphasize, Minorize } from '../UIComponents'
import LabeledInput from '../Common/LabeledInput'

const Flex = styled.div`
  margin-top: 15px;
  display: flex;
  height: 100%;
  justify-content: space-evenly;
`

const siteIndex = {
  2: '/accounts',
  6: '/kontenabfrage',
  7: '/konten-saldo',
  9: '/laufende-buchung',
  12: '/guv',
}

function MenuEntry(props) {
  return (
    <li>
      {props.index && `[${props.index}] `}
      {props.to ? <Link {...props} /> : <Minorize>{props.children}</Minorize>}
    </li>
  )
}
function MenuBlock(props) {
  return (
    <>
      <Emphasize>{props.name}</Emphasize>
      <ul>{props.children}</ul>
    </>
  )
}

function HauptMenue() {
  const [redirect, setRedirect] = useState()
  const [site, setSite] = useState('')
  const [error, setError] = useState()

  const alert = useAlert()
  useEffect(() => {
    error && alert.error(error)
  }, [error])

  const onMenuSubmit = e => {
    e.preventDefault()
    if (siteIndex[site]) {
      setRedirect(siteIndex[site])
    } else {
      setSite('')
      setError('ungueltige Menueauswahl')
    }
  }

  return redirect ? (
    <Redirect to={redirect} />
  ) : (
    <>
      <StatusHeader middle>Hauptmenue</StatusHeader>
      <Flex>
        <div>
          <MenuBlock name="Stammdaten">
            <MenuEntry index={1}>Steuerschluessel</MenuEntry>
            <MenuEntry index={2} to={siteIndex[2]}>
              Konten
            </MenuEntry>
            <MenuEntry index={3}>Reorganisation</MenuEntry>
            <MenuEntry index={4}>Kontenbelegung</MenuEntry>
          </MenuBlock>
          <MenuBlock name="Ausdruck">
            <MenuEntry index={5}>Journal</MenuEntry>
            <MenuEntry index={6} to={siteIndex[6]}>
              Kontenabfrage
            </MenuEntry>
            <MenuEntry index={7} to={siteIndex[7]}>
              Konten - Saldo
            </MenuEntry>
            <MenuEntry index={8}>Konten - Plan</MenuEntry>
          </MenuBlock>
        </div>
        <div>
          <MenuBlock name="Laufende Verarbeitung">
            <MenuEntry index={9} to={siteIndex[9]}>
              Laufende Buchung
            </MenuEntry>
          </MenuBlock>
          <MenuBlock name="Offene-Posten-Auswertungen">
            <MenuEntry index={10}>Kunde</MenuEntry>
            <MenuEntry index={11}>Lieferant</MenuEntry>
          </MenuBlock>
          <MenuBlock name="Abschluss, Auswertungen">
            <MenuEntry index={12} to={siteIndex[12]}>
              Gewinn und Verlust
            </MenuEntry>
            <MenuEntry index={13}>Kontrollfunktion</MenuEntry>
            <MenuEntry index={14}>Monatsabschluss</MenuEntry>
          </MenuBlock>
        </div>
      </Flex>
      <Flex>
        <form onSubmit={e => onMenuSubmit(e)}>
          <LabeledInput
            autoFocus
            label="Ihre Auswahl"
            size="2"
            value={site}
            onChange={e => setSite(e.target.value)}
          />
        </form>
      </Flex>
    </>
  )
}

export default HauptMenue
