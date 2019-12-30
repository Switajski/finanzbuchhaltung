import React from 'react'
import styled from 'styled-components'
import { Button as RootButton } from './UIComponents'

const Button = styled(RootButton)`
  width: 100%;
  font-size: 1em;
`
const SGrid = styled.div`
  display: flex;
  align-content: flex-end;
  justify-content: space-between;
  @media print {
    display: none;
  }
`

export default function KeyboardControls(props) {
  return <SGrid columns={5}>{props.children}</SGrid>
}

export function KeyButton(props) {
  return (
    <div>
      {props.active && (
        <Button
          type={props.submit ? 'submit' : 'button'}
          {...props}
          onClick={props.command}
        >
          {props.symbol && props.symbol}
          {props.text}
        </Button>
      )}
    </div>
  )
}

export function EditFormKeyboardControls(props) {
  return (
    <KeyboardControls>
      <KeyButton
        active
        type="reset"
        command={props.cancel}
        key="ESC"
        text="ESC: Abbrechen"
      />
      <KeyButton active text="&#8633; : naechstes Feld" />
      <KeyButton active text="&#8617; : speichern" type="submit" />
    </KeyboardControls>
  )
}
