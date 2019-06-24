import React, { useState, forwardRef } from 'react'
import styled from 'styled-components'
import useSelectAllOnFocus from './useSelectAllOnFocus'
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
${props => props.selected && ('color: ' + props.theme.variable + ';' + 'background-color:' + props.theme.variableBg + ';')}
}`

function Select(props, ref) {
    const [showDropdown, setDropdown] = useState(false)
    const [selected, setSelected] = useState(0)

    const inputRef = useSelectAllOnFocus(ref, props.value)
    const proposedOptions = props.options
        .filter(o => {
            if (props.value === "" || props.value === undefined)
                return true
            const se = props.value + ""
            return (o.value.indexOf(se) > -1)
        })
    if (selected > proposedOptions.length) {
        setSelected(proposedOptions.length - 1)
    }

    const upHandler = ({ key }) => {
        if (key === "ArrowDown" && selected < proposedOptions.length - 1) {
            setSelected(selected => selected + 1)
        } else if (key === "ArrowUp" && selected > 0) {
            setSelected(selected => selected - 1)
        } else if (key === "Enter") {
            const selectedOption = proposedOptions[selected]
            selectedOption && props.setValue(selectedOption.value)
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
            <Ul>{proposedOptions
                .map((o, i) => <Li
                    onMouseEnter={() => setSelected(i)}
                    onMouseDown={() => props.setValue(o.value)}
                    key={o.value}
                    selected={i === selected}
                >
                    {o.value} - {o.name}
                </Li>)}
            </Ul>
        </Dropdown>
        <Input size={7} {...props}
            ref={inputRef}
            onFocus={() => {
                onFocus()
                props.onFocus && props.onFocus()
            }}
            onBlur={onBlur}
            onKeyUp={upHandler}
        />
    </label>
}

export default forwardRef(Select)