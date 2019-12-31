import React from 'react'
import styled from 'styled-components'
import { Pill } from './UIComponents'

const Flex = styled.div`
  display: flex;
  justify-items: flex-end;
  justify-content: space-between;
  margin-bottom: 1px;
`
function Header() {
  return (
    <Flex>
      <div>
        <Pill>
          &nbsp;{new Date().toLocaleDateString()}&nbsp;
        </Pill>
      </div>
      <div>
        <Pill>&nbsp;Georg Switajski&nbsp;&nbsp;&nbsp;</Pill>
      </div>
    </Flex>
  )
}

export default Header
