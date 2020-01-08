import React from 'react'
import styled from 'styled-components'
import packageJson from './package.alias'

export const Pill = styled.span`
background-color: ${props => props.theme.variableBg};
color: ${props => props.theme.header};`

// TODO: is there a nicer way to copy style from Pill?
export const Button = styled.button`
background-color: ${props => props.theme.variableBg};
color: ${props => props.active ? props.theme.header : props.theme.brightGrey};
border: 0;
:hover {
    color: ${props => props.theme.emphasize}
}
:active {
    color: ${props => props.theme.active}
}`

export const Emphasize = styled.span`
@media not print {
    color: ${props => props.theme.emphasize}
}`

const Hidden = styled.span`visibility:hidden;`
export const Space = ({size}) => <Hidden>
    {Array.from(new Array(size), () => 'x').map(() => 'x')}
    </Hidden>

export const Minorize = styled.span`
color: ${props => props.theme.minor}`

export const UpperCase = styled.p`
text-transform: uppercase`

export const Screen = styled.div`
@media not print {
    height: 95vh;
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

export const NoWrap = styled.span`white-space:nowrap;`

export const Flex = styled.div`
display:flex;
justify-content: space-between;`

export const AutoFlex = styled.div`flex: 1 1 auto;`

export const FlexCenter = styled.div`align-self:center; text-align:center;`

export function StatusHeader(props) {
    return <>
        <Flex>
            <FlexCenter >FIBU {packageJson.version}</FlexCenter>
            {props.right && <AutoFlex />}
            <div {...props}>{props.children}</div>
            {!props.right && <div />}
        </Flex>
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