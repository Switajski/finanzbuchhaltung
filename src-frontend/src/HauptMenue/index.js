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
      {props.to ? <Link {...props} /> : <Minorize>{props.children}</Minorize>}
    </li>
  )
}
function MenuBlock({name, children, start = 1}) {
  return (
    <>
      <Emphasize>{name}</Emphasize>
      <ol start={start}>{children}</ol>
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
      <StatusHeader>Hauptmenue</StatusHeader>
      <Flex>
        <div>
          <MenuBlock name="Stammdaten">
            <MenuEntry>Steuerschluessel</MenuEntry>
            <MenuEntry to={siteIndex[2]}>
              Konten
            </MenuEntry>
            <MenuEntry>Reorganisation</MenuEntry>
            <MenuEntry>Kontenbelegung</MenuEntry>
          </MenuBlock>
          <MenuBlock name="Ausdruck" start={5}>
            <MenuEntry>Journal</MenuEntry>
            <MenuEntry to={siteIndex[6]}>
              Kontenabfrage
            </MenuEntry>
            <MenuEntry to={siteIndex[7]}>
              Konten - Saldo
            </MenuEntry>
            <MenuEntry>Konten - Plan</MenuEntry>
          </MenuBlock>
        </div>
        <div>
          <MenuBlock name="Laufende Verarbeitung" start={9}>
            <MenuEntry to={siteIndex[9]}>
              Laufende Buchung
            </MenuEntry>
          </MenuBlock>
          <MenuBlock name="Offene-Posten-Auswertungen"
          start={10}>
            <MenuEntry>Kunde</MenuEntry>
            <MenuEntry>Lieferant</MenuEntry>
          </MenuBlock>
          <MenuBlock name="Abschluss, Auswertungen" start={12}>
            <MenuEntry to={siteIndex[12]}>
              Gewinn und Verlust
            </MenuEntry>
            <MenuEntry>Kontrollfunktion</MenuEntry>
            <MenuEntry>Monatsabschluss</MenuEntry>
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
