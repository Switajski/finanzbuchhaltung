import React, { useState } from 'react'
import styled from 'styled-components'
import { Input } from './UIComponents'

const Dropdown = styled.div`
${props => !props.showDropdown && 'display:none;'}
position:absolute; 
max-height: 50vh;
overflow:scroll;
color: ${props => props.theme.active};
background-color: ${props => props.theme.activeBg};
`;

const Ul = styled.ul`padding: 0 5px 0 5px;`
const Li = styled.li`
${props => props.selected && ('color: ' + props.theme.emphasize + ';' + 'background-color:' + props.theme.emphasizeBg + ';')}
&:hover {
    background-color:${props => props.theme.emphasizeBg};
    color:${props => props.theme.emphasize};
}`

function AccountNumberInput(props) {
    const [showDropdown, setDropdown] = useState(false)
    const [selected, setSelected] = useState(0)

    const upHandler = ({ key }) => {
        if (key === "ArrowDown") {
            setSelected(selected => selected + 1)
        } else if (key === "ArrowUp") {
            setSelected(selected => selected - 1)
        } else if (key === "Enter") {
            const selectedValue = props.options[selected]
            selectedValue && props.setValue(selectedValue)
        }
    }

    const onFocus = () => {
        setDropdown(true)
    }
    const onBlur = () => {
        setDropdown(false)
    }

    return <label>{props.name}
        <Dropdown showDropdown={showDropdown}>
            <Ul>{props.options
                .filter(o => {
                    if (props.value === "") return true;
                    const se = props.value + ""
                    return (o.value.indexOf(se) > -1)
                })
                .map((o, i) => <Li key={o.value} selected={i === selected}>{o.value} - {o.name}</Li>)}</Ul>
        </Dropdown>
        <Input size={7} {...props}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyUp={upHandler}
        />
    </label>
}

export default AccountNumberInput